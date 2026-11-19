import type { Config } from 'tailwindcss';

/**
 * Summit Estate brand, from the Summit Estate Design System
 * (github.com/sergei-summit/Design, exported 13 Nov 2026 from the brand book's
 * Illustrator file; Sergei, Nov 17 2026: "this is Summit Estate brand book to use").
 * Brand book p.12/13 colours: green #445952, beige #E7D8C5, light green #769887,
 * grey #F7F7F7; secondary charcoal #303030, slate #51636F. The green tints and
 * shades (green-95 ... green-20) and the warm hover #DFC8AD are the design
 * system's web additions, not brand book colours.
 *
 * Token names are kept from the earlier palette so no class changes; only the
 * values moved to the brand. Every colour sits under one `se` key so the
 * page's classes cannot collide with LGTC's own Tailwind theme.
 *
 * Contrast (WCAG AA, checked by `node scripts/contrast.mjs`):
 *   green #445952 on grey #F7F7F7 ................ 7.0:1  headings
 *   charcoal #303030 on grey ..................... 12.3:1 body
 *   slate #51636F on grey ........................ 5.8:1  small print
 *   green-40 #5A716A on white .................... 5.2:1  title accent, icons
 *   white on green #445952 ....................... 7.5:1  buttons, dark band
 *   beige #E7D8C5 on green ....................... 5.4:1  dark band text
 * Light green #769887 is 3.2:1 on white, so it is never used for text.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      /** Minimum text size 16px (Sergei, Nov 18 2026): the small sizes render at 16px. */
      fontSize: { xs: ['1rem', '1.5rem'], sm: ['1rem', '1.5rem'] },
      colors: {
        se: {
          green: {
            50: '#F3F5F4', // design system green-95
            100: '#E6EBE9', // green-90
            600: '#5A716A', // green-40
            700: '#445952', // brand book Green (headings)
            800: '#445952', // brand book Green (dark band, info cards)
            900: '#2B3A35', // green-20
          },
          accent: {
            100: '#E6EBE9', // green-90
            400: '#769887', // brand book Light green (decorative only)
            600: '#445952', // brand book Green (filled buttons)
            700: '#5A716A', // green-40 (title accent, icons, focus ring)
          },
          sand: { DEFAULT: '#E7D8C5', light: '#DFC8AD' }, // brand book Beige; warm hover
          cream: '#F7F7F7', // brand book Grey
          paper: '#FFFFFF',
          line: '#E8E8E7', // hairline, rgba(29,29,27,0.10) on white
          ink: { DEFAULT: '#303030', muted: '#51636F' }, // charcoal, slate
        },
      },
      fontFamily: {
        se: ['var(--font-se-montserrat)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { 'se-content': '72rem' },
      boxShadow: {
        'se-card': '0 8px 24px rgba(29, 29, 27, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
