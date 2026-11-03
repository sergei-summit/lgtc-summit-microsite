import { page } from '@/content/page';
import { CallButton } from './Actions';
import LocationTile from './LocationTile';

export default function LevelsOfCare() {
  const { levels } = page;
  return (
    <section id={levels.id} aria-labelledby="programs-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="programs-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {levels.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{levels.lead}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-se-ink">{levels.intro}</p>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {levels.items.map((level, i) => (
            <li key={level.id} className="flex flex-col rounded-3xl border border-se-line bg-se-cream p-6">
              <div className="flex items-center justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-se-green-700 text-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <span className="rounded-full bg-se-paper px-3 py-1 text-xs font-semibold text-se-green-700">
                  {level.where}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-se-green-700">{level.name}</h3>
              {level.alias && (
                <p className="mt-1 text-sm font-semibold text-se-accent-700">
                  {levels.aliasPrefix} {level.alias}
                </p>
              )}
              <p className="mt-3 leading-relaxed text-se-ink">{level.text}</p>
              {level.length && <p className="mt-auto pt-4 text-sm text-se-ink-muted">{level.length}</p>}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-5 md:grid-cols-2" role="group" aria-label={levels.locationsLabel}>
          {levels.locations.map((loc) => (
            <LocationTile key={loc.id} name={loc.name} text={loc.text} photo={loc.photo} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl bg-se-green-800 p-7 text-se-sand md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold text-white">{levels.notSure.title}</p>
            <p className="mt-2 max-w-2xl leading-relaxed">{levels.notSure.text}</p>
          </div>
          <CallButton tone="dark" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
