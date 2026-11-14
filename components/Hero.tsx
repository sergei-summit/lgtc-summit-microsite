import Image from 'next/image';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import { PhoneIcon } from './Actions';
import { FeatureIcon } from './FeatureIcon';

/**
 * Hero: the H1, the intro and the feature line on the left, and the San Jose
 * Outpatient Center photo on the right (below them on small screens), with the centre's
 * name and in-network badge on its top right and a floating call card on its
 * bottom left (sm screens and up). No button: the call to admissions sits in
 * the sub-bar (and the mobile bar), and the registration link appears only in
 * the closing section.
 */
export default function Hero() {
  const { hero } = page;
  return (
    <section aria-labelledby="hero-title" className="bg-se-cream">
      <div className="mx-auto grid max-w-se-content items-center gap-x-14 gap-y-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Wording left, photo right from lg up (Sergei, Nov 14 2026, after
            go.summitestate.com/outpatient); stacked on smaller screens. */}
        <div>
        <h1
          id="hero-title"
          className="max-w-4xl text-[2.3rem] font-semibold leading-[1.08] text-se-green-700 sm:text-[2.9rem] lg:text-[3rem]"
        >
          {keepTogether(hero.title)} <span className="text-se-accent-700">{hero.titleAccent}</span>
        </h1>


        <div className="mt-6">
          <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-se-ink">{hero.text}</p>
          <ul className={hero.features.length > 1 ? 'mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2' : 'mt-7 grid max-w-3xl'}>
            {hero.features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                {/* One title line tall, so the badge centres on the title's first line. */}
                <span className="flex h-[1.375em] shrink-0 items-center text-[0.95rem] leading-snug">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-se-accent-100 text-se-green-600">
                    <FeatureIcon name={feature.icon} className="h-4 w-4" />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.95rem] font-semibold leading-snug text-se-ink">{feature.title}</span>
                  {feature.proof ? (
                    <span className="mt-0.5 block text-sm leading-snug text-se-ink-muted">{feature.proof}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div className="relative sm:mb-8 lg:mb-0">
          <div className="relative h-[16rem] w-full overflow-hidden rounded-[2rem] shadow-se-card sm:h-[22rem] lg:h-[34rem]">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute right-4 top-4 max-w-[16rem] rounded-2xl bg-se-green-800 px-4 py-3 shadow-se-card sm:right-6 sm:top-6 lg:-right-3 lg:top-6">
            <p className="text-sm text-se-sand">{hero.insuranceBadge.label}</p>
            <p className="text-lg font-semibold leading-tight text-white">{hero.insuranceBadge.value}</p>
          </div>
          <a
            href={settings.phoneHref}
            className="absolute -bottom-8 left-4 hidden max-w-[21rem] rounded-2xl bg-se-paper p-5 no-underline shadow-se-card sm:left-6 sm:block lg:-bottom-6 lg:-left-5"
          >
            <span className="flex items-center gap-2 text-lg font-semibold leading-snug text-se-green-700">
              <PhoneIcon className="h-4 w-4 text-se-accent-700" />
              {hero.callCard.title}
              <span className="sr-only">
                : {page.actions.callPrefix} {settings.phone}
              </span>
            </span>
            <span className="mt-1 block text-sm text-se-ink-muted">{hero.callCard.note}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

/**
 * Keeps hyphenated words ("Dual-Diagnosis", "World-class") and "San Jose" on
 * one line in the headline, so it never breaks as "Dual-" / "Diagnosis" or
 * "San" / "Jose".
 */
function keepTogether(text: string) {
  return text.split(/(San Jose|\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
