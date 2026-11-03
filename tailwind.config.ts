import type { Config } from 'tailwindcss';

/**
 * Summit Estate brand, taken from the Summit-Landing-Pages source
 * (go.summitestate.com): slate green, sage accent, sand and cream.
 *
 * Every colour sits under one `se` key (`bg-se-cream`, `text-se-green-700`)
 * so the page's classes cannot collide with LGTC's own Tailwind theme when
 * this config is added to LGTC's app as a preset (see README).
 *
 * Contrast (WCAG AA, checked by `node scripts/contrast.mjs`):
 *   se-green-700 #3C4A45 on cream #F7F4EF ........ 8.5:1  headings
 *   se-ink #2E2E2E on cream .......................... 12.4:1 body
 *   se-ink-muted #4E4E4B on cream .................... 7.6:1  small print
 *   se-accent-700 #475F4F on cream ................... 6.3:1  eyebrows, aliases
 *   white on se-accent-600 #587562 ................... 5.1:1  primary buttons
 *   se-sand #E3D8C9 on se-green-800 #313D39 .......... 8.0:1  dark band
 * The canonical brand sage #86A28E is never used behind text (white on it is
 * 2.8:1); it appears only as a decorative tint.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        se: {
          green: {
            50: '#F1F4F2',
            100: '#DDE4E0',
            600: '#485852',
            700: '#3C4A45',
            800: '#313D39',
            900: '#262F2C',
          },
          accent: {
            100: '#E1EAE3',
            400: '#86A28E',
            600: '#587562',
            700: '#475F4F',
          },
          sand: { DEFAULT: '#E3D8C9', light: '#F1EBE2' },
          cream: '#F7F4EF',
          paper: '#FFFFFF',
          line: '#E4DED5',
          ink: { DEFAULT: '#2E2E2E', muted: '#4E4E4B' },
        },
      },
      fontFamily: {
        se: ['var(--font-se-montserrat)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { 'se-content': '72rem' },
      boxShadow: {
        'se-card': '0 18px 46px -22px rgb(38 47 44 / 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
