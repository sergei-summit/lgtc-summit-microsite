'use client';

import { useEffect, useState } from 'react';
import Logo, { StackedLogo } from './Logo';
import { page } from '@/content/page';
import { CallbackIcon, PhoneIcon } from './Actions';
import { settings } from '@/content/settings';

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

  /* Once the hero's "Request a callback" button has scrolled out of view, the bar
     offers it too; on phones the call button then shrinks to its icon to make
     room (Sergei, Nov 23 2026). Both states are in the markup and data-past
     switches them, so a script-free preview can set the attribute itself. */
  const [past, setPast] = useState(false);
  useEffect(() => {
    const target = document.querySelector('[data-hero-callback]');
    if (!target || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < 80), { rootMargin: '-64px 0px 0px 0px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const { subBar, actions } = page;
  return (
    <nav
      aria-label={subBar.navLabel}
      data-se-bar
      data-past={past}
      className={`group sticky top-0 z-40 border-b border-se-line bg-se-cream/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-se-card' : ''
      }`}
    >
      {/* min-h, not a fixed height, and wrapping: with a large text size the
          call button drops under the logo instead of running off the screen. */}
      <div className="mx-auto flex min-h-16 max-w-se-content flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:px-6">
        {/* The logo shrinks on narrow screens so the call button always fits
            (Sergei, Nov 17 2026); full size from md up. */}
        <div className="min-w-14 flex-1 sm:min-w-[4.5rem]">
          {/* Phones: the stacked lockup, which keeps its size beside the two buttons (Sergei, Nov 23 2026). */}
          <StackedLogo label={subBar.logoLabel} className="block h-12 w-auto sm:hidden" />
          <Logo label={subBar.logoLabel} className="hidden h-auto w-full max-w-[184px] sm:block md:h-12 md:w-auto md:max-w-none" />
        </div>
        <ul className="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-x-2 gap-y-2 text-sm font-semibold text-se-green-700 sm:gap-x-5">
          {subBar.links.map((link) => (
            <li key={link.href} className="hidden sm:block group-data-[past=true]:max-md:hidden">
              <a href={link.href} className="rounded no-underline hover:underline">
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden group-data-[past=true]:block">
            <a
              href={`#${page.gettingStarted.formId}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-3 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-se-green-900 sm:px-5"
            >
              <CallbackIcon />
              <span className="min-[360px]:hidden">{actions.callbackShort}</span>
              <span className="max-[359px]:hidden">{actions.callback}</span>
            </a>
          </li>
          <li>
            {/* Phones: "Call now", shrinking to the icon alone once the callback button joins it. From sm up the number always shows. */}
            <a
              href={settings.phoneHref}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-3.5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-se-green-900 group-data-[past=true]:max-sm:px-0 min-[360px]:px-4 sm:px-5"
            >
              <PhoneIcon />
              <span className="sm:hidden group-data-[past=true]:max-sm:sr-only">
                {actions.callNow}
                <span className="sr-only"> {settings.phone}</span>
              </span>
              <span className="hidden sm:inline">
                {actions.callPrefix} {settings.phone}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
