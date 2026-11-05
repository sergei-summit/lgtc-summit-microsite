import type { ReactNode } from 'react';
import { page } from '@/content/page';
import { settings } from '@/content/settings';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold no-underline transition-colors';

type ButtonProps = { className?: string; tone?: 'light' | 'dark'; variant?: 'solid' | 'outline' };

function colours(tone: 'light' | 'dark', variant: 'solid' | 'outline') {
  if (tone === 'dark') {
    return variant === 'solid'
      ? 'bg-se-sand text-se-green-900 hover:bg-se-sand-light'
      : 'border-2 border-se-sand text-se-sand hover:bg-se-green-700';
  }
  return variant === 'solid'
    ? 'bg-se-accent-600 text-white hover:bg-se-accent-700'
    : 'border-2 border-se-accent-600 bg-se-paper text-se-green-700 hover:bg-se-accent-100';
}

/** Call: a tel: link whose accessible name includes the number. Solid by
 * default: the call to admissions is the primary action on this page (Nov 5 2026). */
export function CallButton({ className = '', tone = 'light', variant = 'solid' }: ButtonProps) {
  return (
    <a href={settings.phoneHref} className={`${base} ${colours(tone, variant)} ${className}`}>
      <PhoneIcon />
      {page.actions.callPrefix} {settings.phone}
    </a>
  );
}

/**
 * The assessment request: LGTC's EHR registration link. The page collects no
 * data. Outpatient care only (PHP, IOP, OP); detox and
 * residential are call-only, so never place this next to them. Shown as the
 * outline (secondary) button beside the call.
 */
export function RegisterButton({ className = '', tone = 'light', variant = 'solid' }: ButtonProps) {
  return (
    <a href={settings.registrationUrl} className={`${base} ${colours(tone, variant)} ${className}`}>
      {page.actions.register}
    </a>
  );
}

/**
 * Jan's preferred click-through (Nov 5 2026): the full Summit Estate site, as
 * a quiet text link under the button pairs. settings.showFullSiteLink hides it
 * (and the footer link) in one place.
 */
export function SiteLink({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  if (!settings.showFullSiteLink) return null;
  return (
    <p className={`text-sm ${className}`}>
      <a
        href={settings.fullSiteUrl}
        className={`font-semibold underline ${tone === 'dark' ? 'text-se-sand' : 'text-se-green-700'}`}
      >
        {page.actions.siteLink}
      </a>
    </p>
  );
}

/** Outline link for an in-page jump such as "Get started". */
export function SecondaryLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`${base} border-2 border-se-accent-600 bg-se-paper text-se-green-700 hover:bg-se-accent-100 ${className}`}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

export function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5.5A2.5 2.5 0 015.5 3h1.6a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.5 1.2l-1.5.76a11 11 0 005.5 5.5l.76-1.5a1 1 0 011.2-.5l3.6 1.2a1 1 0 01.69.95v1.6A2.5 2.5 0 0118.5 21h-.5C9.7 21 3 14.3 3 6v-.5z"
      />
    </svg>
  );
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true" focusable="false" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
