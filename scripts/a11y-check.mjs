// CI check for the exported page (see .github/workflows/ci.yml).
//
// Serves `out/` on a local port, opens the page in Chromium at 390x844 and
// 1366x900, and fails on:
//   - any axe-core violation with impact "serious" or "critical"
//   - anything other than exactly one H1, or an H1 that is not visible
//   - a skipped heading level, or a missing #programs / #verify
//   - a viewport meta that locks zoom
//
// Usage: node scripts/a11y-check.mjs [path ...]
// Paths default to the export's root page ("/", under NEXT_PUBLIC_BASE_PATH
// when set) and "/summit-estate/".
// CHROMIUM_PATH points at a pre-installed Chromium if `npx playwright install`
// was not run.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const ROOT = 'out';
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim().replace(/\/+$/, '');
const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [`${basePath}/`, `${basePath}/summit-estate/`];
const VIEWPORTS = [
  { width: 390, height: 844, name: 'phone 390x844' },
  { width: 1366, height: 900, name: 'desktop 1366x900' },
];
const ANCHORS = ['programs', 'verify'];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
};

// The export's files sit at the root of out/ for a plain build, or under the
// base path once scripts/prepare-staging.mjs has nested them.
async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const candidates = [clean];
  if (basePath && clean.startsWith(basePath)) candidates.push(clean.slice(basePath.length) || '/');
  for (const c of candidates) {
    for (const p of [join(ROOT, c), join(ROOT, c, 'index.html')]) {
      try {
        if ((await stat(p)).isFile()) return p;
      } catch {}
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? '/');
  if (!file) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
let failed = false;
const fail = (msg) => {
  failed = true;
  console.log(`  FAIL ${msg}`);
};

for (const path of paths) {
  for (const vp of VIEWPORTS) {
    console.log(`\n${path} @ ${vp.name}`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const missing = [];
    page.on('response', (r) => {
      if (r.status() >= 400) missing.push(`${r.status()} ${r.url()}`);
    });
    const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
    if (!response || response.status() !== 200) {
      fail(`page returned ${response?.status()}`);
      await context.close();
      continue;
    }
    for (const m of missing) fail(`asset failed to load: ${m}`);

    const facts = await page.evaluate((anchors) => {
      const h1s = [...document.querySelectorAll('h1')];
      const r = h1s[0]?.getBoundingClientRect();
      const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
        level: Number(h.tagName[1]),
        text: h.textContent.trim(),
      }));
      return {
        h1Count: h1s.length,
        h1Visible: !!r && r.width > 0 && r.height > 0 && getComputedStyle(h1s[0]).visibility !== 'hidden',
        levels,
        missingAnchors: anchors.filter((id) => !document.getElementById(id)),
        viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? '',
        lang: document.documentElement.lang,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
      };
    }, ANCHORS);

    if (facts.h1Count !== 1) fail(`expected exactly one H1, found ${facts.h1Count}`);
    else if (!facts.h1Visible) fail('the H1 is not visible');
    else console.log(`  ok   one visible H1: "${facts.levels.find((l) => l.level === 1)?.text}"`);

    let prev = 0;
    let skipped = false;
    for (const h of facts.levels) {
      if (h.level > prev + 1) {
        fail(`heading level skipped: H${h.level} "${h.text}" after H${prev}`);
        skipped = true;
      }
      prev = h.level;
    }
    if (!skipped) console.log(`  ok   heading levels in order (${facts.levels.map((l) => 'H' + l.level).join(' ')})`);

    if (facts.missingAnchors.length) fail(`missing anchors: ${facts.missingAnchors.map((a) => '#' + a).join(', ')}`);
    else console.log(`  ok   anchors present: ${ANCHORS.map((a) => '#' + a).join(' ')}`);

    if (/maximum-scale|user-scalable\s*=\s*(no|0)/i.test(facts.viewport)) fail(`viewport locks zoom: ${facts.viewport}`);
    else console.log(`  ok   zoom not locked (viewport "${facts.viewport}")`);
    if (facts.lang !== 'en') fail(`html lang is "${facts.lang}"`);
    console.log(`  info robots meta "${facts.robots}"`);

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    const other = results.violations.filter((v) => !blocking.includes(v));
    for (const v of blocking) {
      fail(`axe ${v.impact}: ${v.id} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'}) ${v.help}`);
      for (const n of v.nodes.slice(0, 5)) console.log(`         ${n.target.join(' ')}: ${n.failureSummary?.split('\n').join(' ')}`);
    }
    for (const v of other) console.log(`  note axe ${v.impact}: ${v.id} (${v.nodes.length}) ${v.help}`);
    console.log(
      `  ${blocking.length ? 'FAIL' : 'ok  '} axe: ${results.passes.length} rules passed, ${blocking.length} serious/critical, ${other.length} minor/moderate`,
    );
    await context.close();
  }
}

await browser.close();
server.close();
console.log(failed ? '\nAccessibility check FAILED' : '\nAccessibility check passed');
process.exit(failed ? 1 : 0);
