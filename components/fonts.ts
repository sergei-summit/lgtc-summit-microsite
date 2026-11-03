import { Montserrat } from 'next/font/google';

/** Montserrat, self-hosted by next/font at build time. Only the two weights
 * the page uses: 400 (body) and 600 (headings, labels, buttons). */
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-se-montserrat',
});
