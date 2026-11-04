'use client';

import { useEffect, useState } from 'react';
import { PhoneIcon } from './Actions';

/**
 * Fixed bottom bar on phones with Call and Get started (a jump to the "Call or
 * register" split, where outpatient care can register online; detox and
 * residential are call-only). The only script hides the bar while that
 * section's own buttons are on screen, so the two never stack. Hidden on md
 * screens and up.
 */
export default function MobileCallBar({
  label,
  phone,
  phoneHref,
  callPrefix,
  secondaryLabel,
  secondaryHref,
}: {
  label: string;
  phone: string;
  phoneHref: string;
  callPrefix: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.querySelector('[data-verify-actions]');
    if (!target || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label={label}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-se-line bg-se-paper/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform md:hidden ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={phoneHref}
          aria-label={`${callPrefix} ${phone}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-4 text-base font-semibold text-white no-underline"
        >
          <PhoneIcon />
          {callPrefix}
        </a>
        <a
          href={secondaryHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-se-accent-600 px-4 text-base font-semibold text-se-green-700 no-underline"
        >
          {secondaryLabel}
        </a>
      </div>
    </aside>
  );
}
