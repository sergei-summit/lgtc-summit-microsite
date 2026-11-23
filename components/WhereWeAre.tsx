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
      <div className="mx-auto max-w-se-content px-4 py-10 sm:px-6 md:py-14">
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
        {/* Directory style after lgtcgroup.com/locations (Sergei, Nov 18 2026): same weight for each location. */}
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {whereWeAre.items.map((item) => (
            <li key={item.title} className="flex flex-col overflow-hidden rounded-3xl border border-se-line bg-se-paper">
              <Image src={item.photo.src} alt={item.photo.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[3/2] h-auto w-full object-cover" />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold leading-snug text-se-green-700">{item.title}</h3>
                <address className="mt-4 space-y-1 not-italic leading-relaxed text-se-ink">
                  <a href={item.mapHref} target="_blank" rel="noopener" className="block no-underline underline-offset-4 hover:underline">
                    {item.address}
                  </a>
                  <a href={settings.phoneHref} className="block no-underline underline-offset-4 hover:underline">
                    {settings.phone}
                  </a>
                </address>
                <div className="mt-6 flex flex-wrap gap-3 pt-1">
                  <a href={settings.phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900">
                    <PhoneIcon />
                    {page.actions.callNow}
                    <span className="sr-only"> {settings.phone}</span>
                  </a>
                  <SecondaryLink href={item.link.href}>
                    {item.link.label}
                    <span className="sr-only">: {item.title}</span>
                  </SecondaryLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

