import Image from 'next/image';
import { page, type Level } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';
import CompareLevelCards from './CompareLevelCards';

/**
 * Levels of Care. One title, then two groups, each headed with its place:
 * "Outpatient Programs · San Jose" over three tiles (PHP, IOP in person or
 * hybrid, OP) and "Higher Level of Care · Palo Alto" over the estate photo and
 * two tiles of the same shape (Medical Detox, Residential Treatment), with the
 * insurance note beneath them. Tiles are in LGTC's format: labelled rows, no
 * hours line, no links. Then the first of the two assessment prompts, with the
 * call as the primary action.
 */
function Tile({ level }: { level: Level }) {
  return (
    <li className="rounded-3xl border-2 border-se-accent-600 bg-se-cream p-6">
      <h4 className="text-xl font-semibold text-se-green-700">{level.name}</h4>
      {level.alias && (
        <p className="mt-1 text-sm font-semibold text-se-accent-700">
          {page.levels.aliasPrefix} {level.alias}
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
  );
}

export default function LevelsOfCare() {
  const { levels } = page;
  return (
    <section id={levels.id} aria-labelledby="programs-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="programs-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {levels.title}
        </h2>

        <h3 className="mt-8 text-2xl font-semibold text-se-green-700">{levels.outpatient.title}</h3>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {levels.outpatient.items.map((level) => (
            <Tile key={level.id} level={level} />
          ))}
        </ul>

        <h3 className="mt-12 text-2xl font-semibold text-se-green-700">{levels.higher.title}</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="relative min-h-[16rem] overflow-hidden rounded-3xl shadow-se-card">
            <Image
              src={levels.higher.photo.src}
              alt={levels.higher.photo.alt}
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 md:col-span-2">
            {levels.higher.items.map((level) => (
              <Tile key={level.id} level={level} />
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-se-ink-muted">
          <strong className="font-semibold text-se-green-800">{levels.higher.networkLabel}</strong> {levels.higher.network}
        </p>

        <CompareLevelCards />

        <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-se-green-800 p-7 text-se-sand md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold text-white">{levels.notSure.title}</p>
            <p className="mt-2 max-w-2xl leading-relaxed">{levels.notSure.text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <CallButton tone="dark" />
            <RegisterButton tone="dark" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}
