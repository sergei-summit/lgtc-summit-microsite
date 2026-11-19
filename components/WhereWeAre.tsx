import Image from 'next/image';
import { page } from '@/content/page';
import { PhoneIcon, SecondaryLink } from './Actions';
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
              {/* No icon tile above the place name (Sergei, Nov 18 2026). */}
              <hgroup>
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
              {/* Map (Sergei, Nov 18 2026): a picture of the Google map that opens
                  Google Maps, not an embed, so nothing loads from Google (no cookies). */}
              {item.map && (
                <figure className="mt-6">
                  <a href={item.map.href} target="_blank" rel="noopener" className="block overflow-hidden rounded-2xl border border-se-line">
                    <Image src={item.map.image} alt={`${item.map.alt} ${whereWeAre.mapLinkSuffix}`} sizes="(min-width: 768px) 420px, 100vw" className="h-72 w-full object-cover" style={{ objectPosition: item.map.position }} />
                  </a>
                  <figcaption className="mt-1.5 text-right text-xs text-se-ink-muted">{whereWeAre.mapCredit}</figcaption>
                </figure>
              )}
              {/* Call now left of Learn more (Sergei, Nov 18 2026). */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={settings.phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900">
                  <PhoneIcon />
                  {page.actions.callNow}
                  <span className="sr-only"> {settings.phone}</span>
                </a>
                {item.link && (
                  <SecondaryLink href={item.link.href}>
                    {item.link.label}
                    <span className="sr-only">: {item.title}, {item.eyebrow}</span>
                  </SecondaryLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type LocationIconName = 'pin' | 'home';
