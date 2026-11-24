import FillPhoto from './FillPhoto';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import { CallbackButton, PhoneIcon } from './Actions';

/**
 * Hero: the H1 across the full width, then the intro and the feature points on
 * the left and the San Jose Outpatient Center photo on the right (md screens
 * and up; stacked below them on phones), with the centre's name and insurance
 * badge on its top right and a floating call card on its bottom left (sm
 * screens and up). No button: the call to admissions sits in the sub-bar (and
 * the mobile bar), and the registration link appears only in the closing
 * section.
 */
export default function Hero() {
  const { hero } = page;
  return (
    <section aria-labelledby="hero-title" className="bg-se-cream">
      <div className="mx-auto grid max-w-se-content items-center gap-x-12 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-y-6 md:py-10 lg:py-12">
        {/* The headline runs across the top; under it, the description and
            points sit left and the photo right from md up (Sergei, Nov 17
            2026). Stacked on phones: headline, description, photo. */}
        {/* The box carries the headline size so the container query in
            summit-estate.css can compare its width with the longest word. */}
        <div className="se-hero-title-box text-[2.3rem] sm:text-[2.9rem] md:col-span-2 lg:text-[3.5rem] xl:text-[3.1rem]">
          <h1
            id="hero-title"
            className="font-semibold leading-[1.08] text-se-green-700"
          >
            {hero.titleLead && <span className="mb-[0.42em] block">{hero.titleLead}</span>}{keepTogether(hero.title)} <span className="text-se-accent-700">{hero.titleAccent}</span>
          </h1>
        </div>

        <div>
          <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-se-ink lg:text-base lg:leading-relaxed min-[1152px]:text-lg min-[1152px]:leading-relaxed">{hero.text}</p>
          <ul className={hero.features.length > 1 ? 'mt-6 grid list-disc grid-cols-[repeat(auto-fit,minmax(min(100%,max(11rem,calc((100%-2rem)/2))),1fr))] gap-x-8 gap-y-2.5 pl-5 marker:text-se-green-700' : 'mt-7 grid max-w-3xl'}>
            {hero.features.map((feature) => (
              <li key={feature.title} className={`pl-1 ${feature.phone ? ['', 'max-sm:order-1', 'max-sm:order-2', 'max-sm:order-3'][feature.phone] : 'max-sm:hidden'}`}>
                {/* A bulleted list in two columns, smaller type (Sergei, Nov 17 2026:
                    "no emoji", then "use bullets and go back to two columns"). */}
                <span className="text-sm font-semibold leading-snug text-se-ink">
                  {feature.phoneTitle ? (
                    <>
                      <span className="sm:hidden">{feature.phoneTitle}</span>
                      <span className="max-sm:hidden">{keepTogether(feature.title)}</span>
                    </>
                  ) : (
                    keepTogether(feature.title)
                  )}
                </span>
                {feature.proof ? (
                  <span className="mt-0.5 block text-sm leading-snug text-se-ink-muted">{feature.proof}</span>
                ) : null}
              </li>
            ))}
          </ul>
          {/* The way to the form from the first screen (Sergei, Nov 23 2026). */}
          <p className="mt-7">
            {/* data-hero-callback: once this button has scrolled away, the top bar offers the same action. */}
            <span data-hero-callback className="inline-block">
              <CallbackButton />
            </span>
          </p>
        </div>
        {/* Call card at the photo's lower right corner (Sergei, Nov 23 2026; top right before). */}
        <div className="relative">
          <div className="relative h-[16rem] w-full overflow-hidden rounded-[2rem] shadow-se-card sm:h-[22rem] md:h-[19rem] lg:h-[20rem]">
            <FillPhoto photo={hero.photo} sizes="(min-width: 768px) 560px, 100vw" priority />
          </div>
          <a
            href={settings.phoneHref}
            className="absolute bottom-4 right-4 hidden max-w-[21rem] rounded-2xl bg-se-paper p-5 no-underline shadow-se-card sm:bottom-6 sm:right-6 sm:block"
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
 * "San" / "Jose". The `se-keep` class lets them wrap after all when a large
 * text size makes the headline box narrower than its longest word (see
 * summit-estate.css; Modern Web Guidance, respect-os-text-scale).
 */
function keepTogether(text: string) {
  return text.split(/(San Jose|\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="se-keep whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
