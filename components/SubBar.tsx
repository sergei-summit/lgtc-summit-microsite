'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { page } from '@/content/page';
import { CallButton } from './Actions';

/**
 * Summit sub-bar under LGTC's own site header: logo, the in-page link and the
 * call button (moved here from the hero on Nov 5 2026, Sergei). Sticky. The only script here adds a shadow once the page
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
        {/* The logo shrinks on narrow screens so the call button always fits
            (Sergei, Nov 17 2026); full size from md up. */}
        <div className="min-w-0 flex-1">
          <Logo label={subBar.logoLabel} className="block h-auto w-full max-w-[184px] md:h-12 md:w-auto md:max-w-none" />
        </div>
        <ul className="flex shrink-0 items-center gap-5 text-sm font-semibold text-se-green-700">
          {subBar.links.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <a href={link.href} className="rounded no-underline hover:underline">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <CallButton short className="min-h-11 whitespace-nowrap px-3.5 py-2 text-sm min-[360px]:px-4 sm:px-5" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
