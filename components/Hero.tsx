import Image from 'next/image';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import { PhoneIcon, SiteLink } from './Actions';
import { FeatureIcon } from './FeatureIcon';
import BenefitAndTeam from './BenefitAndTeam';

/**
 * Hero, in Sergei's order of Nov 5 2026: the H1; the care-team and
 * who-can-benefit cards; the San Jose Outpatient Center photo, full width,
 * with the centre's name and in-network badge on its top right and a floating
 * call card on its bottom left (sm screens and up); then the intro, the four
 * feature lines and the text link to the full Summit Estate site. No button:
 * the call to admissions sits in the sub-bar (and the mobile bar), and the
 * registration link appears only in the closing section.
 */
export default function Hero() {
  const { hero } = page;
  return (
    <section aria-labelledby="hero-title" className="bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-12 sm:px-6 md:py-16">
        <h1
          id="hero-title"
          className="max-w-4xl text-[2.3rem] font-semibold leading-[1.08] text-se-green-700 sm:text-[2.9rem] lg:text-[3rem]"
        >
          {hero.title} <span className="text-se-accent-700">{hero.titleAccent}</span>
        </h1>

        <BenefitAndTeam className="mt-10" />

        <div className="relative mt-10">
          <div className="relative h-[16rem] w-full overflow-hidden rounded-[2rem] shadow-se-card sm:h-[22rem] lg:h-[28rem]">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="(min-width: 1184px) 1152px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute right-4 top-4 max-w-[16rem] rounded-2xl bg-se-green-800 px-4 py-3 shadow-se-card sm:right-6 sm:top-6">
            <p className="text-sm text-se-sand">{hero.insuranceBadge.label}</p>
            <p className="text-lg font-semibold leading-tight text-white">{hero.insuranceBadge.value}</p>
          </div>
          <a
            href={settings.phoneHref}
            className="absolute -bottom-8 left-4 hidden max-w-[21rem] rounded-2xl bg-se-paper p-5 no-underline shadow-se-card sm:left-6 sm:block"
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

        <div className="mt-10 sm:mt-16">
          <p className="max-w-3xl text-lg leading-relaxed text-se-ink">{hero.text}</p>
          <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <span className="mt-0.5 block text-sm leading-snug text-se-ink-muted">{feature.proof}</span>
                </span>
              </li>
            ))}
          </ul>
          <SiteLink className="mt-8" />
        </div>
      </div>
    </section>
  );
}
