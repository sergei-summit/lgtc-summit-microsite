'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { page } from '@/content/page';

/**
 * Summit sub-bar under LGTC's own site header: logo, two in-page links and the
 * Get started button. Sticky. The only script here adds a shadow once the page
 * has scrolled, so the bar reads as separate from the content beneath it.
 */
export default function SubBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { subBar } = page;
  return (
    <nav
      aria-label={subBar.navLabel}
      className={`sticky top-0 z-40 border-b border-se-line bg-se-cream/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-se-card' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-se-content items-center justify-between gap-3 px-4 sm:px-6">
        <Logo label={subBar.logoLabel} className="h-10 w-auto shrink-0 md:h-12" />
        <ul className="flex items-center gap-5 text-sm font-semibold text-se-green-700">
          {subBar.links.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <a href={link.href} className="rounded no-underline hover:underline">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={subBar.cta.href}
              className="inline-flex min-h-11 items-center rounded-full bg-se-accent-600 px-5 text-sm font-semibold text-white no-underline hover:bg-se-accent-700"
            >
              {subBar.cta.label}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
