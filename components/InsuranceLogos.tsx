import { page } from '@/content/page';

/** Same optical sizing as go.summitestate.com/outpatient-backup: wide logos shorter, square ones taller. */
const LOGO_SCALE = 44;

/**
 * Insurance block from go.summitestate.com/outpatient-backup, as its own line
 * below "Where we are" (Sergei, Nov 17 2026; before that it sat under the trust
 * badges, and first at the foot of the San Jose card). Logos are shown in one ink colour, as on that
 * page; each keeps its carrier name as alt text.
 */
export default function InsuranceLogos() {
  const { insurance } = page.levels.cards;
  return (
    <section aria-labelledby="insurance-title" className="border-t border-se-line bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-6 sm:px-6">
        <h2
          id="insurance-title"
          className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-se-ink-muted"
        >
          {insurance.title}
        </h2>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          {insurance.carriers.map((c) => (
            <li key={c.name} className="flex h-9 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo.src}
                alt={c.name}
                width={c.width}
                height={c.height}
                loading="lazy"
                decoding="async"
                style={{ height: `${Math.round(LOGO_SCALE / Math.sqrt(c.width / c.height))}px`, width: 'auto', filter: 'brightness(0)', opacity: 0.6 }}
                className="max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
