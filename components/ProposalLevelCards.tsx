import Image from 'next/image';
import { page, type Level, type ProposalCard } from '@/content/page';
import { ArrowIcon, CallButton } from './Actions';

/**
 * Proposal 3 (Sergei, Nov 5 2026): the microsite's card format with the
 * current block's headings and positions, in a dashed frame under the other
 * two sets. Top row: PHP, IOP, OP under the San Jose heading. Bottom row:
 * the estate photo with its info card, one combined Detox + Residential card
 * and the "Not sure" card. Each card: tag chip, name, clock line, blurb and a
 * "What to expect" disclosure holding the tiles' rows (Time commitment,
 * Intensity, Treatment, Suitable for). No number circles: the order here is
 * by setting, not a path through care.
 */
export default function ProposalLevelCards() {
  const { proposal, outpatient, higher, compare } = page.levels;
  return (
    <div className="mt-12 rounded-3xl border-2 border-dashed border-se-accent-600 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-se-accent-700">{proposal.title}</h3>
      <p className="mt-1 text-sm text-se-ink-muted">{proposal.note}</p>

      <h4 className="mt-8 text-2xl font-semibold text-se-green-700">{proposal.outpatientTitle}</h4>
      <ul className="mt-5 grid gap-5 md:grid-cols-3">
        {outpatient.items.map((level) => (
          <Card key={level.id} card={proposal.cards[level.id]} groups={[{ rows: level.rows }]} expectLabel={proposal.expectLabel} />
        ))}
      </ul>

      <h4 className="mt-12 text-2xl font-semibold text-se-green-700">{proposal.higherTitle}</h4>
      <ul className="mt-5 grid gap-5 md:grid-cols-3">
        <li className="relative min-h-[16rem] overflow-hidden rounded-3xl shadow-se-card">
          <Image src={higher.photo.src} alt={higher.photo.alt} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
          <div className="absolute right-4 top-4 max-w-[16rem] rounded-2xl bg-se-green-800 px-4 py-3 shadow-se-card">
            <p className="text-sm text-se-sand">{higher.badge.label}</p>
            <p className="text-lg font-semibold leading-tight text-white">{higher.badge.value}</p>
            <p className="mt-1 text-sm leading-snug text-se-sand">{higher.badge.note}</p>
          </div>
        </li>
        <Card
          card={proposal.combined}
          groups={higher.items.map((level) => ({ name: level.name, rows: level.rows }))}
          expectLabel={proposal.expectLabel}
        />
        <li className="flex flex-col justify-center rounded-3xl bg-se-green-800 p-7 text-se-sand shadow-se-card">
          <h5 className="text-2xl font-semibold leading-snug text-white">{compare.notSure.title}</h5>
          <p className="mt-3 text-sm leading-relaxed">{compare.notSure.text}</p>
          <CallButton tone="dark" className="mt-6 self-start" />
        </li>
      </ul>
    </div>
  );
}

type RowGroup = { name?: string; rows: Level['rows'] };

function Card({ card, groups, expectLabel }: { card: ProposalCard; groups: RowGroup[]; expectLabel: string }) {
  return (
    <li className="flex flex-col rounded-3xl border border-se-line bg-se-cream p-7 shadow-se-card">
      <span className="self-start rounded-full bg-se-paper px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-se-ink">
        {card.tag}
      </span>
      <h5 className="mt-4 text-2xl font-semibold leading-snug text-se-green-700">{card.name}</h5>
      <p className="mt-2 inline-flex items-start gap-2 text-sm font-medium text-se-ink">
        <ClockIcon />
        <span>{card.meta}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-se-ink-muted">{card.blurb}</p>
      <div className="mt-5 grow" aria-hidden="true" />
      <details className="group mt-auto border-t border-se-line pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-se-green-800 [&::-webkit-details-marker]:hidden">
          {expectLabel}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-se-line text-se-green-700 transition-transform group-open:rotate-90">
            <ArrowIcon />
          </span>
        </summary>
        <div className="mt-4 grid gap-5">
          {groups.map((group, i) => (
            <div key={group.name ?? i}>
              {group.name && <p className="mb-2 font-semibold text-se-green-700">{group.name}</p>}
              <dl className="grid gap-2.5 text-sm leading-relaxed text-se-ink">
                {group.rows.map(([label, text]) => (
                  <div key={label}>
                    <dt className="inline font-semibold text-se-green-800">{label}: </dt>
                    <dd className="ml-0 inline">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </details>
    </li>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" className="mt-0.5 h-4 w-4 shrink-0 text-se-green-700">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}
