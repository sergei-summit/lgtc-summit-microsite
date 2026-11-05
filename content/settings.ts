/**
 * Every setting for the Summit Estate page in one place. Copy lives in
 * content/page.ts; components read both and hard-code neither.
 *
 * Items marked TODO are still open and must be settled before launch.
 */

const env = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.trim() !== '' ? value.trim() : undefined;
};

export const settings = {
  /**
   * LGTC's intake phone number. `phoneHref` must be the same number in tel:
   * form. Always LGTC's number on this page, never Summit's own line.
   */
  phone: '(408) 542-0434',
  phoneHref: 'tel:+14085420434',

  /** LGTC's EHR registration link ("Register online, we call you back"). */
  registrationUrl:
    'https://ncrv2.ehryourway.com/?eyJSb3drZXkiOiI1NzBjNjFjOS0wOTU1LTQzNTEtYmQzNy0yMTU1YzFiY2Y2YmUiLCJOQ1JrZXl0eXBlIjoxLCJOQ1JfUGF0aWVudFJlZmVycmVyRG9tYWluSW5mb0lEIjoxMDAxNH0=#!/ClientRegFormat2FromPortal',

  /** TODO (open): the group name used in the footer note's partnership line. */
  groupName: 'LGTC Psychiatric Group',

  /**
   * TODO (open): whether the page links out to Summit's full site. The one
   * outbound link on the page; set showFullSiteLink to false to remove it.
   */
  fullSiteUrl: 'https://summitestate.com/',
  showFullSiteLink: true,

  /**
   * TODO (open): the final URL path. Empty when the page is mounted as a route
   * inside LGTC's app or hosted at a domain root. Summit's staging build sets
   * NEXT_PUBLIC_BASE_PATH=/lgtc-summit-microsite. No trailing slash.
   */
  basePath: env('NEXT_PUBLIC_BASE_PATH') ?? '',

  /**
   * Robots meta. LGTC decides indexing for its own URL. Summit's staging build
   * sets NEXT_PUBLIC_ROBOTS="noindex, nofollow".
   */
  robots: env('NEXT_PUBLIC_ROBOTS') ?? 'index, follow',

  /** Page title and meta description. */
  metaTitle: 'Outpatient Mental Health and Substance Use Treatment in San Jose | Summit Estate Recovery Centers',
  metaDescription:
    'PHP, IOP (in person or hybrid) and Outpatient Therapy for Mental Health and Substance Use in San Jose, in-network with all major plans. Medical Detox and Residential Care in Palo Alto when a higher level of care is needed.',
} as const;

export type Settings = typeof settings;
