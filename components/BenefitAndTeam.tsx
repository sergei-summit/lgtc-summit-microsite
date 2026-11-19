import { page } from '@/content/page';
import { CheckIcon } from './Actions';
import FillPhoto from './FillPhoto';

/**
 * "Your care team" card and, since Nov 18 2026 (Sergei), a photo in place of
 * the "Who can benefit" card. Originally two cards, as on the Summit Estate microsite
 * (go.summitestate.com/microsite). Each card is an hgroup (small label as the
 * kicker, then the h2) and a ticked list. Placed here by Sergei on Nov 5 2026;
 * the care-team list is his five lines.
 */
export default function BenefitAndTeam() {
  const { cards } = page;
  return (
    <section aria-label={cards.label} className="bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.items.map((card) => (
            <div key={card.title} className="rounded-3xl border border-se-line bg-se-paper p-7 sm:p-8">
              <hgroup>
                {/* No eyebrow above "Your care team" card's heading since Nov 18 2026 (Sergei). */}
                <h2 className="text-3xl font-semibold leading-tight text-se-green-700 sm:text-4xl">{card.title}</h2>
              </hgroup>
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
          {/* In place of the "Who can benefit" card (Sergei, Nov 18 2026). */}
          <div className="relative min-h-[18rem] overflow-hidden rounded-3xl shadow-se-card">
            <FillPhoto photo={cards.photo} sizes="(min-width: 768px) 560px, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
