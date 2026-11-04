# Accessibility review: WCAG 2.1 and 2.2 Level AA

**Result: passes Level AA** on everything that can be tested without a person
using assistive technology. Reviewed 4 November 2026 against the page as it is
in this commit (the version with the "How we treat" section, the icon feature
lines in the hero and the per-program Call and Register links).

CI re-runs the automated part on every pull request and every push to `main`
(see "Accessibility checks (CI)" in the README). The manual part below should
be repeated when the layout changes, not for copy edits.

## Automated

Tool: axe-core (via `@axe-core/playwright`) in Chromium, with the rule tags
`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` and `best-practice`.

| Viewport | Violations | Needs review |
|---|---|---|
| 320 x 568 (reflow width) | 0 | 0 |
| 390 x 844 (phone) | 0 | 0 |
| 1366 x 900 (desktop) | 0 | 0 |

Covers, among others: colour contrast of text and controls, image alt text,
link and button names, `lang`, landmarks, heading structure, viewport zoom,
list and table semantics.

## Manual criteria

| Criterion | Result | Evidence |
|---|---|---|
| 1.3.1 / 2.4.6 Headings | Pass | One H1; H2 per section; H3 inside; no skipped levels (checked by `scripts/a11y-check.mjs`) |
| 1.4.3 Contrast (text) | Pass | Lowest text pair is white on `se-accent-600` at 5.08:1; everything else 6.3:1 or better (`node scripts/contrast.mjs`) |
| 1.4.4 Resize text / 1.4.10 Reflow | Pass | No horizontal scroll at 320 px; nothing clipped |
| 1.4.11 Non-text contrast | Pass | Focus ring 6.3:1 on cream, sand ring on the dark band; button borders use the same colours as their text |
| 2.1.1 Keyboard / 2.1.2 No trap | Pass | Every control is a native `<a>`; Tab reaches all 22 to 24 stops and leaves the page |
| 2.4.1 Bypass blocks | Pass | "Skip to programs" link, visible on focus |
| 2.4.3 Focus order | Pass | Follows the visual order top to bottom |
| 2.4.4 Link purpose | Pass | Repeated "Call" links share one destination; "Call admissions" and "Register online" carry their purpose in the text; the hero call card keeps the number in its accessible name |
| 2.4.7 Focus visible | Pass | A 3 px ring plus a 3 px halo on every focused link, on light and dark sections |
| 2.4.11 Focus not obscured (minimum, 2.2) | Pass | The sticky sub-bar never covers a focused element (`scroll-mt-20`); on phones the bottom call bar can partly, never fully, cover the hero buttons. See "Open items for LGTC's build" in the README for the AAA-level fix |
| 2.5.8 Target size (minimum, 2.2) | Pass | Buttons and bar controls are 48 px tall or more; the program tile links are at least 24 px tall with 4 px spacing; nav and footer links sit inline in text |
| 2.3.3 / 2.2.2 Motion | Pass | Only smooth anchor scrolling, and it switches off under `prefers-reduced-motion`; no autoplay, no animation |
| 3.1.1 Language | Pass | `lang="en"` on `<html>` |
| 3.2.3 / 3.2.4 Consistent navigation and identification | Pass | One sub-bar, one set of button styles |
| 1.4.2, 1.4.13, 2.2.1, 2.5.7, 3.2.6, 3.3.x | Not applicable | No audio or video, no hover or focus pop-ups, no time limits, no dragging, no help mechanism, no forms or inputs |

## Not covered

- A session with a real screen reader (VoiceOver, NVDA, TalkBack). The
  structure they would read is sound (landmarks, headings, named links,
  decorative icons hidden), but nobody has listened to it.
- LGTC's own header and footer, which will wrap this page. Their contrast,
  keyboard order and focus styles are outside this repo.
