import { page } from '@/content/page';
import { SecondaryLink } from './Actions';
import { settings } from '@/content/settings';

/**
 * "Where we are": the two location cards from go.summitestate.com/outpatient
 * (Sergei, Nov 5 2026), after Getting started and above the footer note. Each card: icon tile, small label, name, one line of text and chips.
 * The source page's "Virtual IOP anywhere in California" is not repeated:
 * this page names telehealth only as part of Hybrid IOP.
 */
export default function WhereWeAre() {
  const { whereWeAre } = page;
  return (
    <section aria-labelledby="where-title" className="border-t border-se-line bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        {/* "Explore Summit Estate" sits above this section's heading since Nov 18 2026 (Sergei; it was at the very bottom). */}
        {settings.showFullSiteLink && (
          <p className="mb-12 flex justify-center">
            <a
              href={settings.fullSiteUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900"
            >
              {page.footerNote.fullSiteLink}
            </a>
          </p>
        )}
        <hgroup>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-se-green-700">{whereWeAre.eyebrow}</p>
          <h2 id="where-title" className="mt-3 text-3xl font-semibold text-se-green-700 sm:text-4xl">
            {whereWeAre.title}
          </h2>
        </hgroup>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {whereWeAre.items.map((item) => (
            <li key={item.title} className="flex flex-col rounded-3xl border border-se-line bg-se-paper p-7 shadow-se-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-se-accent-100 text-se-green-700">
                <LocationIcon name={item.icon} className="h-5 w-5" />
              </span>
              <hgroup className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-se-green-700">{item.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-snug text-se-green-700">{item.title}</h3>
              </hgroup>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-se-ink-muted">{item.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <li key={point} className="rounded-full border border-se-line bg-se-cream px-3 py-1 text-xs font-semibold text-se-ink">
                    {point}
                  </li>
                ))}
              </ul>
              {/* Map (Sergei, Nov 18 2026): Google's own embed, loaded only when scrolled near. */}
              {item.map && (
                <div className="relative mt-6 h-56 overflow-hidden rounded-2xl bg-se-cream">
                  {/* Shows only where the map cannot load (the preview blocks outside frames); the map covers it. */}
                  <p aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-se-ink-muted">
                    {whereWeAre.mapFallback}
                  </p>
                  <iframe
                    src={item.map.src}
                    title={item.map.title}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="relative h-full w-full border-0"
                  />
                </div>
              )}
              {/* Learn more button (Sergei, Nov 18 2026). */}
              {item.link && (
                <SecondaryLink href={item.link.href} className="mt-6 self-start">
                  {item.link.label}
                  <span className="sr-only">: {item.title}, {item.eyebrow}</span>
                </SecondaryLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type LocationIconName = 'pin' | 'home';

/** Thin-line icons copied from Summit-Landing-Pages (Astro/src/components/ui.tsx, `Icon`). */
function LocationIcon({ name, className = 'h-5 w-5' }: { name: LocationIconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: 'false' as const,
  };
  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}
