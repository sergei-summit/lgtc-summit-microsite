import { page } from '@/content/page';
import { CheckIcon } from './Actions';

/**
 * Two cards side by side just above "Getting started is easy": "Your care
 * team", then "Who can benefit", as on the Summit Estate microsite
 * (go.summitestate.com/microsite). Each card is a small label, a heading and
 * a ticked list; the care-team card has no heading since Nov 5 2026 (Sergei
 * replaced it with his five lines), so its label is the heading. Placed here
 * by Sergei on Nov 5 2026.
 */
const eyebrowClass = 'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-se-green-700';

export default function BenefitAndTeam() {
  const { cards } = page;
  return (
    <section aria-label={cards.label} className="bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.items.map((card) => (
            <div key={card.eyebrow} className="rounded-3xl border border-se-line bg-se-paper p-7 sm:p-8">
              {card.title ? (
                <>
                  <p className={eyebrowClass}>
                    <span aria-hidden="true" className="h-px w-8 bg-se-green-700" />
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-se-green-700 sm:text-4xl">{card.title}</h2>
                </>
              ) : (
                <h2 className={eyebrowClass}>
                  <span aria-hidden="true" className="h-px w-8 bg-se-green-700" />
                  {card.eyebrow}
                </h2>
              )}
              <ul className="mt-6 space-y-3">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 leading-snug text-se-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-se-green-700 text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
