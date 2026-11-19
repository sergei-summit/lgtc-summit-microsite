import Image from 'next/image';
import { page, type Level, type LevelCard } from '@/content/page';
import { ArrowIcon, PhoneIcon, SecondaryLink } from './Actions';
import { settings } from '@/content/settings';
import ExpectDialog from './ExpectDialog';
import FillPhoto from './FillPhoto';

/**
 * The level cards (Sergei's brief, Nov 5 2026): the microsite's card format
 * with this page's headings and positions. First the San Jose card from the
 * live page (lounge photo, heading, description), then PHP, IOP, OP. Next row, under "Higher Level of Care": one
 * combined Detox + Residential card, then the estate photo with its info card. The "Not
 * sure" card was removed (Sergei, Nov 14 2026); its copy stays in page.ts. Each card: tag chip, name, clock line,
 * blurb and a "What to expect" disclosure holding the Intensity / Treatment /
 * Suitable for rows. No number circles: the order is by setting, not a path
 * through care.
 */
export default function LevelCards() {
  const { cards, outpatient, higher } = page.levels;
  return (
    <div>
      {/* The San Jose card from the live page, above the three program cards:
          photo left, the row's heading and the centre's description right. */}
      <article
        aria-labelledby="san-jose-title"
        className="mt-8 grid grid-cols-1 overflow-hidden rounded-3xl border border-se-line bg-se-cream shadow-se-card md:grid-cols-[1fr_1.2fr]"
      >
        <Image
          src={cards.outpatientCard.photo.src}
          alt={cards.outpatientCard.photo.alt}
          width={560}
          height={373}
          sizes="(min-width: 768px) 480px, 100vw"
          className="aspect-[3/2] h-full w-full object-cover"
        />
        <div className="p-6 md:p-8">
          <h3 id="san-jose-title" className="text-2xl font-semibold leading-snug text-se-green-700">
            {cards.outpatientTitle}
          </h3>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-se-ink">{cards.outpatientCard.text}</p>
        </div>
      </article>
      <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {outpatient.items.map((level) => (
          <Card
            key={level.id}
            card={cards.cards[level.id]}
            groups={[{ rows: level.rows }]}
            expectLabel={cards.expectLabel}
            popup={{ id: level.id, closeLabel: cards.closeLabel }}
          />
        ))}
      </ul>
      {/* One call-to-action bar under the three program cards (Sergei, Nov 18 2026). */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-se-line bg-se-cream p-5 shadow-se-card">
        <a
          href={settings.phoneHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900"
        >
          <PhoneIcon />
          {page.actions.callNow}
          <span className="sr-only"> {settings.phone}</span>
        </a>
        <SecondaryLink href={cards.learnMore.href}>
          {cards.learnMore.label}
          <span className="sr-only">: {cards.outpatientTitle}</span>
        </SecondaryLink>
      </div>

      <h3 className="mt-12 text-2xl font-semibold text-se-green-700">{cards.higherTitle}</h3>
      <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card
          card={cards.combined}
          groups={higher.items.map((level) => ({ name: level.name, rows: level.rows }))}
          expectLabel={cards.expectLabel}
        />
        <li className="relative min-h-[16rem] overflow-hidden rounded-3xl shadow-se-card">
          <FillPhoto photo={higher.photo} sizes="(min-width: 768px) 600px, 100vw" />
          <div className="absolute right-4 top-4 max-w-[16rem] rounded-2xl bg-se-green-800 px-4 py-3 shadow-se-card">
            <p className="text-lg font-semibold leading-tight text-white">{higher.badge.value}</p>
          </div>
        </li>
      </ul>

    </div>
  );
}

type RowGroup = { name?: string; rows: Level['rows'] };

/** `popup`: the San Jose program cards (Sergei, Nov 18 2026). "What to expect"
 * opens as a popup. Call now / Learn more sit once in a bar under the three
 * cards (Sergei, Nov 18 2026), not on each card. Without it (Detox & residential),
 * "What to expect" folds open in place as before. */
type Popup = { id: string; closeLabel: string };

function Card({ card, groups, expectLabel, popup }: { card: LevelCard; groups: RowGroup[]; expectLabel: string; popup?: Popup }) {
  const rows = <Rows groups={groups} />;
  return (
    <li className="flex flex-col rounded-3xl border border-se-line bg-se-cream p-7 shadow-se-card">
      {card.tag && (
        <span className="mb-4 self-start rounded-full bg-se-paper px-2.5 py-1 text-base font-semibold uppercase tracking-[0.14em] text-se-ink">
          {card.tag}
        </span>
      )}
      <h4 className="text-2xl font-semibold leading-snug text-se-green-700">{card.name}</h4>
      <p className="mt-2 inline-flex items-start gap-2 text-sm font-medium text-se-ink">
        <ClockIcon />
        <span>{card.meta}</span>
      </p>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-se-ink-muted">{card.blurb}</p>
      <div className="mt-5 grow" aria-hidden="true" />
      {popup ? (
        <>
          <div className="mt-auto border-t border-se-line pt-3">
            <ExpectDialog id={popup.id} label={expectLabel} title={card.name} closeLabel={popup.closeLabel}>
              {rows}
            </ExpectDialog>
          </div>
        </>
      ) : (
        <details className="group mt-auto border-t border-se-line pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-se-green-800 [&::-webkit-details-marker]:hidden">
            {expectLabel}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-se-line text-se-green-700 transition-transform group-open:rotate-90">
              <ArrowIcon />
            </span>
          </summary>
          <div className="mt-4">{rows}</div>
        </details>
      )}
    </li>
  );
}

function Rows({ groups }: { groups: RowGroup[] }) {
  return (
    <div className="grid gap-5">
      {groups.map((group, i) => (
        <div key={group.name ?? i}>
          {group.name && <h5 className="mb-2 font-semibold text-se-green-700">{group.name}</h5>}
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
