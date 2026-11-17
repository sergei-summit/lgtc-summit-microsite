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
  ['headings: green on grey', '#445952', '#F7F7F7', 4.5],
  ['headings: green on paper', '#445952', '#FFFFFF', 4.5],
  ['body: charcoal on grey', '#303030', '#F7F7F7', 4.5],
  ['small print: slate on grey', '#51636F', '#F7F7F7', 4.5],
  ['small print: slate on paper', '#51636F', '#FFFFFF', 4.5],
  ['title accent/icons: green-40 on grey', '#5A716A', '#F7F7F7', 4.5],
  ['title accent/icons: green-40 on paper', '#5A716A', '#FFFFFF', 4.5],
  ['primary button: white on green', '#FFFFFF', '#445952', 4.5],
  ['primary hover: white on green-20', '#FFFFFF', '#2B3A35', 4.5],
  ['secondary button: green on paper', '#445952', '#FFFFFF', 4.5],
  ['tags: green on green-90', '#445952', '#E6EBE9', 4.5],
  ['dark band: beige on green', '#E7D8C5', '#445952', 4.5],
  ['dark band: white on green', '#FFFFFF', '#445952', 4.5],
  ['dark button: green-20 on beige', '#2B3A35', '#E7D8C5', 4.5],
  ['dark button hover: green-20 on warm hover', '#2B3A35', '#DFC8AD', 4.5],
  ['stars: gold on grey (graphic)', '#946B00', '#F7F7F7', 3],
  ['focus ring: green-40 on grey (graphic)', '#5A716A', '#F7F7F7', 3],
  ['brand light green #769887 behind white text (not used)', '#FFFFFF', '#769887', null],
];
let bad = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const pass = min == null ? 'info' : r >= min ? 'ok  ' : 'FAIL';
  if (pass === 'FAIL') bad++;
  console.log(`${pass} ${r.toFixed(2).padStart(5)}:1  ${name}`);
}
process.exit(bad ? 1 : 0);
