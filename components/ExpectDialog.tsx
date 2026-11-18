import type { ReactNode } from 'react';
import { ArrowIcon } from './Actions';

/**
 * "What to expect" as a popup (Sergei, Nov 18 2026): a button on the card
 * opens a panel with the same rows the card used to fold open. Built on the
 * HTML popover attribute, so it needs no script: the browser opens and closes
 * it, and Esc or a click outside closes it too.
 */
export default function ExpectDialog({
  id,
  label,
  title,
  closeLabel,
  children,
}: {
  id: string;
  label: string;
  title: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const panelId = `se-expect-${id}`;
  const titleId = `${panelId}-title`;
  return (
    <>
      <button
        type="button"
        popoverTarget={panelId}
        aria-haspopup="dialog"
        className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent p-0 text-left text-base font-semibold text-se-green-800 [font-family:inherit]"
      >
        {label}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-se-line text-se-green-700">
          <ArrowIcon />
        </span>
      </button>
      <div
        id={panelId}
        popover="auto"
        role="dialog"
        aria-labelledby={titleId}
        className="se-popup m-auto max-h-[calc(100dvh-2rem)] w-[min(36rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-se-line bg-se-paper p-0 text-se-ink shadow-se-card"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-se-ink-muted">{label}</p>
              <p id={titleId} className="mt-1 text-2xl font-semibold leading-snug text-se-green-700">
                {title}
              </p>
            </div>
            <button
              type="button"
              popoverTarget={panelId}
              popoverTargetAction="hide"
              aria-label={closeLabel}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-se-line bg-transparent text-se-green-700 hover:bg-se-accent-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </>
  );
}
