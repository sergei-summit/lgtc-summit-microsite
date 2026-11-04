import Image from 'next/image';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import { CallButton, PhoneIcon, RegisterButton } from './Actions';

/**
 * Outpatient programs first: PHP, IOP (in person or hybrid) and OP as three
 * tiles, each with the assessment request and a call link. The in-network
 * statement is made once, in the lead. Then the San Jose location card, the
 * Palo Alto detox/residential card (the same shape, labelled as a higher
 * level of care, call-only) and the first of the two assessment prompts.
 */
export default function LevelsOfCare() {
  const { levels } = page;
  return (
    <section id={levels.id} aria-labelledby="programs-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="programs-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {levels.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{levels.lead}</p>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {levels.items.map((level) => (
            <li key={level.id} className="flex flex-col rounded-3xl border-2 border-se-accent-600 bg-se-cream p-6">
              <h3 className="text-xl font-semibold text-se-green-700">{level.name}</h3>
              {level.alias && (
                <p className="mt-1 text-sm font-semibold text-se-accent-700">
                  {levels.aliasPrefix} {level.alias}
                </p>
              )}
              <p className="mt-3 leading-relaxed text-se-ink">{level.text}</p>
              <div className="mt-auto pt-4">
                {level.length && <p className="text-sm text-se-ink-muted">{level.length}</p>}
                {/* Each link is at least 24px tall (WCAG 2.2 target size, 2.5.8). */}
                <div className="mt-2 flex flex-col items-start gap-1 text-sm font-semibold">
                  <a
                    href={settings.registrationUrl}
                    className="inline-flex min-h-6 items-center text-se-accent-700 underline underline-offset-2"
                  >
                    {page.actions.register}
                  </a>
                  <a
                    href={settings.phoneHref}
                    className="inline-flex min-h-6 items-center gap-1.5 text-se-green-700 underline underline-offset-2"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    {page.actions.callAdmissions}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <article
          aria-label={levels.locationsLabel}
          className="mt-10 grid overflow-hidden rounded-3xl border border-se-line bg-se-cream md:grid-cols-[1fr_1.2fr]"
        >
          <Image
            src={levels.location.photo.src}
            alt={levels.location.photo.alt}
            width={560}
            height={373}
            sizes="(min-width: 768px) 480px, 100vw"
            className="aspect-[3/2] h-full w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-se-green-700">{levels.location.name}</h3>
            <p className="mt-2 leading-relaxed text-se-ink">{levels.location.text}</p>
          </div>
        </article>

        {/* Detox and residential: the same card shape as San Jose, with a
            dashed outline and a text label, so it reads as a different kind
            of programme without looking disabled. Call-only. */}
        <article
          aria-labelledby="higher-title"
          className="mt-6 grid overflow-hidden rounded-3xl border border-dashed border-se-green-600 bg-se-paper md:grid-cols-[1fr_1.2fr]"
        >
          <Image
            src={levels.higher.photo.src}
            alt={levels.higher.photo.alt}
            width={560}
            height={373}
            sizes="(min-width: 768px) 480px, 100vw"
            className="aspect-[3/2] h-full w-full object-cover"
          />
          <div className="flex flex-col items-start p-6 md:p-8">
            <p className="text-sm font-semibold text-se-ink-muted">{levels.higher.label}</p>
            <h3 id="higher-title" className="mt-1 text-xl font-semibold text-se-green-700">
              {levels.higher.title}
            </h3>
            <p className="mt-2 leading-relaxed text-se-ink">{levels.higher.text}</p>
            <p className="mt-2 text-sm leading-relaxed text-se-ink-muted">{levels.higher.network}</p>
            <CallButton variant="outline" className="mt-5" />
          </div>
        </article>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl bg-se-green-800 p-7 text-se-sand md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold text-white">{levels.notSure.title}</p>
            <p className="mt-2 max-w-2xl leading-relaxed">{levels.notSure.text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <RegisterButton tone="dark" />
            <CallButton tone="dark" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}
