// Prepares `out/` for Summit's Cloudflare staging Worker (wrangler.jsonc).
//
// Next writes a basePath export with its files at the root of out/ but its
// URLs under the base path (/lgtc-summit-microsite/_next/...). A Workers
// static-assets binding maps the request path straight onto the directory, so
// this nests the files under the base path to match, then adds a `_headers`
// file so every staging response carries X-Robots-Tag: noindex, nofollow.
//
// Only runs for a staging build (NEXT_PUBLIC_BASE_PATH set). Jan's build never
// calls it.
import { mkdirSync, readdirSync, renameSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim().replace(/\/+$/, '');
if (!basePath.startsWith('/')) {
  console.error('prepare-staging: NEXT_PUBLIC_BASE_PATH must be set, e.g. /lgtc-summit-microsite');
  process.exit(1);
}

const out = 'out';
const nested = join(out, basePath);
if (existsSync(join(nested, 'index.html'))) {
  console.log(`prepare-staging: ${nested} already prepared`);
} else {
  const entries = readdirSync(out);
  mkdirSync(nested, { recursive: true });
  const top = basePath.split('/')[1];
  for (const entry of entries) {
    if (entry === top) continue;
    renameSync(join(out, entry), join(nested, entry));
  }
}

writeFileSync(
  join(out, '_headers'),
  `# Staging only: keep every page and asset out of search indexes.\n/*\n  X-Robots-Tag: noindex, nofollow\n`,
);
console.log(`prepare-staging: files nested under ${basePath}, _headers written`);
