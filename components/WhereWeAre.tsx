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
        {/* The "Explore Summit Estate" button above this heading was removed (Sergei, Nov 23 2026). */}
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
              {/* Phones and 1x laptops get the 720px copy (Modern Web Guidance re-check, Nov 23 2026). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photo.src.src}
                srcSet={item.photo.small ? `${item.photo.small.src} ${item.photo.small.width}w, ${item.photo.src.src} ${item.photo.src.width}w` : undefined}
                sizes={item.photo.small ? '(min-width: 768px) 560px, calc(100vw - 2rem)' : undefined}
                alt={item.photo.alt}
                width={item.photo.src.width}
                height={item.photo.src.height}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] h-auto w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold leading-snug text-se-green-700">{item.title}</h3>
                <address className="mt-4 space-y-1 not-italic leading-relaxed text-se-ink">
                  <a href={item.mapHref} target="_blank" rel="noopener" className="block no-underline underline-offset-4 hover:underline">
                    {item.address}
                  </a>
                  {/* The printed number is the call link; no separate Call now button (Sergei, Nov 23 2026). */}
                  <a href={settings.phoneHref} className="flex min-h-11 items-center gap-2 font-semibold text-se-green-700 underline underline-offset-4">
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    <span className="sr-only">{page.actions.callPrefix} </span>
                    {settings.phone}
                  </a>
                </address>
                <div className="mt-5 flex flex-wrap gap-3 pt-1">
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

