import Image from 'next/image';
import { page } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';

/**
 * Outpatient programs: the title, then three tiles (PHP, IOP in person or
 * hybrid, OP) in LGTC's format (the San Jose Outpatient Center block that sat
 * here moved into the hero on Nov 5 2026): labelled rows only, no days-and-hours line and
 * no links on the tiles. Then the Palo Alto detox/residential card (labelled
 * as a higher level of care, call-only) and the first of the two assessment
 * prompts.
 */
export default function LevelsOfCare() {
  const { levels } = page;
  return (
    <section id={levels.id} aria-labelledby="programs-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="programs-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {levels.title}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {levels.items.map((level) => (
            <li key={level.id} className="rounded-3xl border-2 border-se-accent-600 bg-se-cream p-6">
              <h3 className="text-xl font-semibold text-se-green-700">{level.name}</h3>
              {level.alias && (
                <p className="mt-1 text-sm font-semibold text-se-accent-700">
                  {levels.aliasPrefix} {level.alias}
                </p>
              )}
              <dl className="mt-4 grid gap-3 leading-relaxed text-se-ink">
                {level.rows.map(([label, text]) => (
                  <div key={label}>
                    <dt className="inline font-semibold text-se-green-800">{label}: </dt>
                    <dd className="ml-0 inline">{text}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        {/* Detox and residential: a photo card with a dashed outline and a
            text label, so it reads as a different kind of programme without
            looking disabled. Call-only. */}
        <article
          aria-labelledby="higher-title"
          className="mt-10 grid overflow-hidden rounded-3xl border border-dashed border-se-green-600 bg-se-paper md:grid-cols-[1fr_1.2fr]"
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
