import { page } from '@/content/page';
import { ArrowIcon, CallButton, CheckIcon } from './Actions';

/**
 * Comparison block under the Levels of Care tiles (Sergei, Nov 5 2026): the
 * card set from go.summitestate.com/microsite, rebuilt with this page's
 * tokens inside a dashed frame, so the two formats can be judged side by
 * side. Five cards plus the microsite's dark "Not sure" card, which here
 * carries LGTC's number. "What to expect" is a native disclosure (the
 * microsite opens a dialog). Not part of the page until a format is chosen.
 */
export default function CompareLevelCards() {
  const { compare } = page.levels;
  return (
    <div className="mt-12 rounded-3xl border-2 border-dashed border-se-accent-600 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-se-accent-700">{compare.title}</h3>
      <p className="mt-1 text-sm text-se-ink-muted">{compare.note}</p>

      <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {compare.cards.map((card, i) => (
          <li key={card.name} className="flex flex-col rounded-3xl border border-se-line bg-se-cream p-7 shadow-se-card">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-se-accent-100 text-sm font-semibold text-se-green-800">
                {i + 1}
              </span>
              <span className="rounded-full bg-se-paper px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-se-ink">
                {card.short}
              </span>
            </div>
            <h4 className="mt-4 text-2xl font-semibold leading-snug text-se-green-700">{card.name}</h4>
            <p className="mt-2.5 text-sm leading-relaxed text-se-ink-muted">{card.blurb}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-se-ink-muted">
              <ClockIcon />
              {card.meta}
            </p>
            <div className="mt-5 grow" aria-hidden="true" />
            <details className="group mt-auto border-t border-se-line pt-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-se-green-800 [&::-webkit-details-marker]:hidden">
                {compare.expectLabel}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-se-line text-se-green-700 transition-transform group-open:rotate-90">
                  <ArrowIcon />
                </span>
              </summary>
              <ul className="mt-4 space-y-2.5">
                {card.expect.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-se-ink-muted">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-se-green-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}

        <li className="flex flex-col justify-center rounded-3xl bg-se-green-800 p-7 text-se-sand shadow-se-card">
          <h4 className="text-2xl font-semibold leading-snug text-white">{compare.notSure.title}</h4>
          <p className="mt-3 text-sm leading-relaxed">{compare.notSure.text}</p>
          <CallButton tone="dark" className="mt-6 self-start" />
        </li>
      </ul>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" className="h-3.5 w-3.5 text-se-green-700">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}
