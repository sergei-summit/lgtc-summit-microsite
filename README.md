# Summit Estate page for LGTC Group

A short Summit Estate Recovery Centers page, built for LGTC Group to host on its
own site. It is a standalone Next.js app (App Router, TypeScript, Tailwind CSS)
that exports to plain static files.

The page collects no data: no form, no inputs, no API routes, no analytics or
tracking scripts. The only client-side JavaScript is the sub-bar's scroll
shadow and the phone call bar.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000/ (also served at /summit-estate/)
npm run build        # static export to out/
npm run test:a11y    # axe-core + heading checks against out/ (needs a build first)
```

Node 22 or later. `npm run build` writes the finished page to `out/`:
`out/index.html` (the page at the export's root) and
`out/summit-estate/index.html` (the same page as a route), plus `out/_next/`
for scripts, styles, fonts and images.

## What is in the repo

| Path | What it is |
|---|---|
| `app/summit-estate/page.tsx` | The page route, its metadata (title, description, robots) and its CSS import |
| `app/summit-estate/summit-estate.css` | Tailwind utilities plus a reset scoped to `.se-root`. No Tailwind preflight, so it cannot restyle LGTC's header or footer |
| `components/` | `SubBar`, `Hero`, `TrustBadges`, `LevelsOfCare` (Levels of Care: the three outpatient tiles, the Palo Alto photo with the Medical Detox and Residential Treatment tiles, the insurance note, the assessment band), `GettingStarted` (the closing section), `MobileCallBar`, `PageFooterNote`, plus `Actions` (call, assessment-request and secondary-link buttons), `Logo` and `fonts` |
| `content/page.ts` | Every word of visible copy, typed. Components hard-code none |
| `content/settings.ts` | Every setting: phone, registration link, group name, outbound link, base path, robots, title and description |
| `content/images/` | Photos and badges, pre-sized for their display size |
| `app/page.tsx`, `app/layout.tsx` | Only for running this repo on its own. Not needed inside LGTC's app |
| `tailwind.config.ts` | Brand colours, all under one `se` key so they cannot clash with LGTC's theme |
| `scripts/a11y-check.mjs` | The CI accessibility check (see below) |
| `ACCESSIBILITY.md` | The WCAG 2.1 / 2.2 Level AA review: what was tested, the result, and what was not |
| `scripts/contrast.mjs` | Prints the contrast ratio of every colour pair the page uses |
| `wrangler.jsonc`, `scripts/prepare-staging.mjs` | Summit's Cloudflare staging copy only. Ignore for LGTC |

## Mounting it inside LGTC's Next.js app

LGTC's own site header and footer are expected to wrap the page. The page
renders no site header or footer of its own: only the Summit sub-bar, the
content and a short footer note. Privacy, legal notices and general contact
details come from LGTC's layout.

1. Copy `app/summit-estate/` into LGTC's `app/` folder (rename the folder to
   change the URL), and copy `components/` and `content/` next to it. If those
   folder names are already taken, put them under a subfolder and update the
   `@/components/...` and `@/content/...` imports.
2. The imports use the `@/*` path alias (`"paths": { "@/*": ["./*"] }` in
   `tsconfig.json`). Add it, or change the imports to relative paths.
3. Tailwind:
   - If LGTC's app already uses Tailwind 3, add this repo's config as a preset
     and add the copied folders to `content`:
     ```ts
     // LGTC's tailwind.config.ts
     import summit from './summit-estate.tailwind.config'; // this repo's tailwind.config.ts, renamed
     export default {
       presets: [summit],
       content: [/* LGTC's paths */, './app/summit-estate/**/*.tsx', './components/**/*.tsx', './content/**/*.ts'],
     };
     ```
     Then remove the two `@tailwind` lines at the bottom of
     `summit-estate.css` so utilities are not generated twice.
   - If LGTC's app does not use Tailwind, add `tailwindcss@3`, `postcss` and
     `autoprefixer`, and copy `tailwind.config.ts` and `postcss.config.mjs`
     (update `content` to where the folders landed).
4. Montserrat is loaded with `next/font/google` in `components/fonts.ts`
   (weights 400 and 600 only), self-hosted at build time. Nothing to set up.
5. The page's `<title>`, meta description and robots come from
   `content/settings.ts` through the route's `metadata` export.
6. Images are static imports, so Next serves them from `_next/static/media`
   with the right base path. LGTC's image optimiser may resize them further;
   with `images: { unoptimized: true }` they are served as they are.

### Base path

The page itself uses only in-page anchors (`#programs`, `#verify`), so it
works at any URL.

- **Mounted as a route** (for example `lgtcgroup.com/summit-estate`): leave
  `basePath` empty. The folder name under `app/` sets the URL.
- **Hosting the static files as they are** in a subfolder (for example
  `lgtcgroup.com/summit-estate/`): build with
  `NEXT_PUBLIC_BASE_PATH=/summit-estate npm run build`, which sets Next's
  `basePath`, and upload the contents of `out/` to that folder. `out/index.html`
  is the page.

### Redirect and nav (LGTC's side)

- The old URL `/services/mental-health-and-substance-use-recovery-program`
  should 301 to this page.
- LGTC's nav entry for that page should point here.

### Indexing

LGTC decides indexing for its own URL. Set `settings.robots` (or
`NEXT_PUBLIC_ROBOTS`). It defaults to `index, follow`.

## Settings (`content/settings.ts`)

| Setting | Value | Status |
|---|---|---|
| `phone` / `phoneHref` | `(408) 542-0434` / `tel:+14085420434` | Set: LGTC's intake number. Never Summit's own line. Update both together |
| `registrationUrl` | LGTC's EHR registration link (ehryourway.com) | Set. Used by "Register online, we call you back" |
| `groupName` | `LGTC Psychiatric Group` | **TODO:** confirm. Used in the footer note's partnership line |
| `fullSiteUrl` | `https://summitestate.com/` | **TODO:** confirm whether the page links out at all |
| `showFullSiteLink` | `true` | **TODO:** set to `false` to drop the "Explore the full Summit Estate site" link, the page's one outbound link |
| `basePath` | `''` (from `NEXT_PUBLIC_BASE_PATH`) | **TODO:** final URL or base path. See "Base path" above |
| `robots` | `index, follow` (from `NEXT_PUBLIC_ROBOTS`) | LGTC's call |
| `metaTitle` | `Dual Diagnosis Treatment for Adults \| Summit Estate Recovery Centers` | Set |
| `metaDescription` | One sentence on the full path and insurance | Set |

## Open items for LGTC's build

Known, not blocking. Left for whoever mounts the page in LGTC's app:

- **Phone call bar vs. keyboard focus (WCAG 2.2, 2.4.11).** On phones the
  fixed bottom bar (`components/MobileCallBar.tsx`) can partly cover the hero's
  Call and Get started buttons when they receive keyboard focus. The bar already
  hides itself while the "Call or register" section is on screen; extend the
  same `IntersectionObserver` to the hero's button row (give it a `data-` hook
  and observe it too), or add `scroll-padding-bottom` equal to the bar's height
  on `html` for small screens. Passes AA as it is (the buttons are never fully
  hidden); this closes the AAA version (2.4.12).
- **Call-back form next to the levels of care.** Jan is testing a short
  self-registration form for a call back on lgtcgroup.com's mental health page
  (Nov 5 2026); its scheduling does not work yet. When it does, it could sit
  beside the Levels of Care tiles here in place of, or next to, the
  registration link.

## Accessibility checks (CI)

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`.
It builds the export (both the hand-over build and Summit's staging build),
then `scripts/a11y-check.mjs` opens the page in Chromium at 390x844 and
1366x900 and fails on:

- any axe-core violation with impact serious or critical
- anything other than exactly one visible H1, or a skipped heading level
- a missing `#programs` or `#verify` anchor
- a viewport meta that locks zoom, or a missing `lang="en"`

Run it locally after a build with `npm run test:a11y`. If Playwright's
Chromium is not installed, run `npx playwright install chromium` or set
`CHROMIUM_PATH` to an existing Chromium.

## Summit's staging copy (not for LGTC)

Summit reviews the page at `go.summitestate.com/lgtc-summit-microsite` before
hand-over, on a separate Cloudflare Worker, `lgtc-summit-microsite-staging`.

- `npm run build:staging` builds with base path `/lgtc-summit-microsite` and
  robots `noindex, nofollow`, then `scripts/prepare-staging.mjs` nests the
  files under `out/lgtc-summit-microsite/` (so the Worker's asset paths match
  the URLs) and writes `out/_headers`, which sends
  `X-Robots-Tag: noindex, nofollow` on every response. No sitemap is generated.
- `wrangler.jsonc` defines the static-assets Worker. The route
  `go.summitestate.com/lgtc-summit-microsite*` is attached, so every push to
  `main` updates the live page within a few minutes.
- `.github/workflows/deploy-staging.yml` builds, checks and runs
  `wrangler deploy`. It runs on every push to `main` (docs-only changes skipped)
  and on manual dispatch, and needs the repository
  secret `CLOUDFLARE_API_TOKEN` (and `CLOUDFLARE_ACCOUNT_ID` if the token can
  see more than one account).
- `npm run preview:staging` runs the staging Worker locally with `wrangler dev`
  at `http://localhost:8787/lgtc-summit-microsite/`.
