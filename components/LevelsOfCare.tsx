import { page } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';
import LevelCards from './LevelCards';

/**
 * Levels of Care: the title, the microsite's card set (five levels in care
 * order, Palo Alto first, plus the dark "Not sure" card) and the first of the
 * two assessment prompts, with the call as the primary action. The earlier
 * tile set (three outpatient tiles, Palo Alto photo with Detox and Residential
 * tiles) was deleted on Nov 5 2026 after Sergei compared the two formats.
 */
export default function LevelsOfCare() {
  const { levels } = page;
  return (
    <section id={levels.id} aria-labelledby="programs-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="programs-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {levels.title}
        </h2>

        <LevelCards />

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
