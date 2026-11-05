import Image from 'next/image';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import { CallButton, PhoneIcon, RegisterLink, SiteLink } from './Actions';
import { FeatureIcon } from './FeatureIcon';

/**
 * Hero, outpatient-first: intro, schedule line and the four feature lines on
 * the left, a framed photo of the San Jose Outpatient Center on the right with
 * the centre's name and in-network badge on its top right and a floating call
 * card on its bottom left (sm screens and up). The call to admissions is the
 * only button (Sergei: the primary call to action is the phone call, not the
 * assessment); the registration link and the link to the full Summit Estate
 * site are text lines beneath it.
 */
export default function Hero() {
  const { hero } = page;
  return (
    <section aria-labelledby="hero-title" className="bg-se-cream">
      <div className="mx-auto grid max-w-se-content items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div>
          <h1
            id="hero-title"
            className="text-[2.3rem] font-semibold leading-[1.08] text-se-green-700 sm:text-[2.9rem] lg:text-[3rem]"
          >
            {hero.title} <span className="text-se-accent-700">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-se-ink">{hero.text}</p>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-se-ink">{hero.schedule}</p>
          <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
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
          <div className="mt-8">
            <CallButton className="min-h-14 px-8 text-lg" />
          </div>
          <RegisterLink className="mt-5" />
          <SiteLink className="mt-2" />
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-se-card">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -right-2 top-6 max-w-[16rem] rounded-2xl bg-se-green-800 px-4 py-3 shadow-se-card sm:-right-4">
            <p className="text-sm text-se-sand">{hero.insuranceBadge.label}</p>
            <p className="text-lg font-semibold leading-tight text-white">{hero.insuranceBadge.value}</p>
          </div>
          <a
            href={settings.phoneHref}
            className="absolute -bottom-8 -left-3 hidden max-w-[21rem] rounded-2xl bg-se-paper p-5 no-underline shadow-se-card sm:-left-6 sm:block"
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
