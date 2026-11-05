import type { ReactNode } from 'react';
import { mockup } from '@/content/mockup';
import { CheckIcon } from './Actions';

/**
 * MOCK-UP BLOCKS (temporary). Sections adapted from LGTC's own pages, each
 * shown on the page inside a thin dashed frame with a one-line label, so it
 * reads as a mock-up and not as page content, and placed next to the section
 * it would join or replace. Three of the original six are decided (see
 * content/mockup.ts); 5 and 6 remain, keeping their original numbers. Once
 * chosen, move the text into content/page.ts and delete this file,
 * content/mockup.ts and the <Mock…/> uses in app/summit-estate/page.tsx.
 */

const TOTAL = 6;

/** The frame: a thin dashed line plus a text label (never the line alone). */
function Frame({ n, placement, children, className = '' }: { n: number; placement: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-dashed border-se-accent-600 p-5 sm:p-7 ${className}`}>
      <p className="text-sm font-semibold text-se-accent-700">
        {mockup.frameLabel} {n} of {TOTAL} · {placement}
      </p>
      {children}
    </div>
  );
}

type Standalone = { id: string; placement: string; title: string; lead: string };

/** A framed block that stands on its own as a page section (H2). Its landmark
 * name carries the mock-up label, so it stays distinct from the real section
 * of the same title. */
function MockSection({ n, s, tone = 'cream', children }: { n: number; s: Standalone; tone?: 'cream' | 'paper'; children: ReactNode }) {
  return (
    <section id={`mock-${s.id}`} aria-label={`${mockup.frameLabel} ${n}: ${s.title}`} className={tone === 'paper' ? 'bg-se-paper' : 'bg-se-cream'}>
      <div className="mx-auto max-w-se-content px-4 py-10 sm:px-6 md:py-14">
        <Frame n={n} placement={s.placement}>
          <h2 id={`mock-${s.id}-title`} className="mt-3 text-3xl font-semibold text-se-green-700 sm:text-4xl">
            {s.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{s.lead}</p>
          {children}
        </Frame>
      </div>
    </section>
  );
}

/** 5. Who can benefit: the third column of "Who it is for" (Version C). */
export function MockBenefit() {
  const s = mockup.benefit;
  return (
    <Frame n={5} placement={s.placement} className="bg-se-paper">
      <p className="mt-3 text-sm font-semibold text-se-accent-700">{s.title}</p>
      <p className="mt-3 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{s.lead}</p>
      <ul className="mt-6 grid gap-3">
        {s.items.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-snug text-se-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-se-accent-600 text-white">
              <CheckIcon className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** 6. Getting started, LGTC's wording: just above the closing section. */
export function MockStart() {
  const s = mockup.start;
  return (
    <MockSection n={6} s={s} tone="paper">
      <ol className="mt-8 grid gap-5 md:grid-cols-3">
        {s.steps.map((step, i) => (
          <li key={step.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-se-accent-600 font-semibold text-white"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-se-green-700">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-se-ink">{step.text}</p>
          </li>
        ))}
      </ol>
    </MockSection>
  );
}
