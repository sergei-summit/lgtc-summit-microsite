import { page } from '@/content/page';
import LevelCards from './LevelCards';

/**
 * Levels of Care: the title and the level cards (see LevelCards). The earlier
 * tile set and the microsite's own card set, kept on the page for comparison
 * during Nov 5 2026, are gone: Sergei chose the merged format.
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
      </div>
    </section>
  );
}
