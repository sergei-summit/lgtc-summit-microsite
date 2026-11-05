import type { ReactNode } from 'react';
import { mockup } from '@/content/mockup';
import { CheckIcon } from './Actions';

/**
 * MOCK-UP BLOCKS (temporary). Six sections adapted from LGTC's own pages,
 * each shown on the page inside a thin dashed frame with a one-line label, so
 * it reads as a mock-up and not as page content, and placed next to the
 * section it would join or replace. Text in content/mockup.ts. Once chosen,
 * move the text into content/page.ts and delete this file, content/mockup.ts
 * and the <Mock…/> uses in app/summit-estate/page.tsx.
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
function MockSection({ n, s, children }: { n: number; s: Standalone; children: ReactNode }) {
  return (
    <section id={`mock-${s.id}`} aria-label={`${mockup.frameLabel} ${n}: ${s.title}`} className="bg-se-cream">
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

/** 1. Our treatment philosophy: after the programs section. */
export function MockPhilosophy() {
  const s = mockup.philosophy;
  return (
    <MockSection n={1} s={s}>
      <ol className="mt-8 grid gap-5 md:grid-cols-2">
        {s.items.map((item, i) => (
          <li key={item.title} className="flex gap-4 rounded-3xl border border-se-line bg-se-paper p-6">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-se-green-700 font-semibold text-white"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-xl font-semibold text-se-green-700">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-se-ink">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </MockSection>
  );
}

/** 2. A curated curriculum: inside "Mental health and substance use, together" (H3 under its H2). */
export function MockCurriculum() {
  const s = mockup.curriculum;
  return (
    <Frame n={2} placement={s.placement} className="mt-8">
      <h3 id={`mock-${s.id}-title`} className="mt-3 text-2xl font-semibold text-se-green-700">
        {s.title}
      </h3>
      <p className="mt-3 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{s.lead}</p>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {s.items.map((item) => (
          <li key={item.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
            <h4 className="text-xl font-semibold text-se-green-700">{item.title}</h4>
            <p className="mt-2 leading-relaxed text-se-ink">{item.text}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** 3. Structure without isolation: after "A typical week", which it would replace. */
export function MockStructure() {
  const s = mockup.structure;
  return (
    <MockSection n={3} s={s}>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {s.programs.map((program) => (
          <article key={program.title} className="rounded-3xl border-2 border-se-accent-600 bg-se-paper p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-se-green-700">{program.title}</h3>
            <p className="mt-1 font-semibold text-se-accent-700">{program.meta}</p>
            <dl className="mt-5 grid gap-3">
              {program.rows.map(([label, text]) => (
                <div key={label} className="grid gap-0.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-se-green-800">{label}</dt>
                  <dd className="leading-relaxed text-se-ink">{text}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-3xl leading-relaxed text-se-ink">{s.after}</p>
    </MockSection>
  );
}

/** 4. Core components of recovery: after "Mental health and substance use, together". */
export function MockCore() {
  const s = mockup.core;
  return (
    <MockSection n={4} s={s}>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item) => (
          <li key={item.title} className="rounded-3xl border border-se-line bg-se-paper p-5">
            <h3 className="text-lg font-semibold text-se-green-700">{item.title}</h3>
            <p className="mt-1.5 leading-relaxed text-se-ink">{item.text}</p>
          </li>
        ))}
      </ul>
    </MockSection>
  );
}

/** 5. Who can benefit: the third column of "Who it is for" (Version C). */
export function MockBenefit() {
  const s = mockup.benefit;
  return (
    <Frame n={5} placement={s.placement} className="bg-se-cream">
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
    <MockSection n={6} s={s}>
      <ol className="mt-8 grid gap-5 md:grid-cols-3">
        {s.steps.map((step, i) => (
          <li key={step.title} className="rounded-3xl border border-se-line bg-se-paper p-6">
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
