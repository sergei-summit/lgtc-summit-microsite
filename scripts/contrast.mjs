// Prints WCAG contrast ratios for every text/background pair the page uses,
// and exits non-zero if any falls below AA (4.5:1 normal text, 3:1 for large
// text and UI graphics). Run: node scripts/contrast.mjs
const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const pairs = [
  ['headings: green-700 on cream', '#3C4A45', '#F7F4EF', 4.5],
  ['headings: green-700 on paper', '#3C4A45', '#FFFFFF', 4.5],
  ['body: ink on cream', '#2E2E2E', '#F7F4EF', 4.5],
  ['small print: ink-muted on cream', '#4E4E4B', '#F7F4EF', 4.5],
  ['small print: ink-muted on paper', '#4E4E4B', '#FFFFFF', 4.5],
  ['eyebrow/alias: accent-700 on cream', '#475F4F', '#F7F4EF', 4.5],
  ['eyebrow/alias: accent-700 on paper', '#475F4F', '#FFFFFF', 4.5],
  ['lead: green-800 on paper', '#313D39', '#FFFFFF', 4.5],
  ['primary button: white on accent-600', '#FFFFFF', '#587562', 4.5],
  ['primary hover: white on accent-700', '#FFFFFF', '#475F4F', 4.5],
  ['secondary button: green-700 on paper', '#3C4A45', '#FFFFFF', 4.5],
  ['tags: green-800 on accent-100', '#313D39', '#E1EAE3', 4.5],
  ['dark band: sand on green-800', '#E3D8C9', '#313D39', 4.5],
  ['dark band: white on green-800', '#FFFFFF', '#313D39', 4.5],
  ['dark button: green-900 on sand', '#262F2C', '#E3D8C9', 4.5],
  ['level number: white on green-700', '#FFFFFF', '#3C4A45', 4.5],
  ['stars: gold on cream (graphic)', '#946B00', '#F7F4EF', 3],
  ['focus ring: accent-700 on cream (graphic)', '#475F4F', '#F7F4EF', 3],
  ['brand sage #86A28E behind white text (not used)', '#FFFFFF', '#86A28E', null],
];
let bad = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const pass = min == null ? 'info' : r >= min ? 'ok  ' : 'FAIL';
  if (pass === 'FAIL') bad++;
  console.log(`${pass} ${r.toFixed(2).padStart(5)}:1  ${name}`);
}
process.exit(bad ? 1 : 0);
