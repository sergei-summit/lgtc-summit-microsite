import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../summit-estate/summit-estate.css';
import { montserrat } from '@/components/fonts';
import { mockup } from '@/content/mockup';
import { CheckIcon } from '@/components/Actions';

export const metadata: Metadata = {
  title: mockup.pageTitle,
  robots: 'noindex, nofollow',
};

/**
 * MOCK-UP ONLY. Renders the sections in content/mockup.ts in the page's own
 * style, each under a note saying where it would sit. Not linked from the
 * page; delete this folder and content/mockup.ts once the sections are
 * chosen and moved into content/page.ts.
 */
export default function MockupPage() {
  return (
    <div className={`se-root ${montserrat.variable} bg-se-cream`}>
      <main>
        <section aria-labelledby="mock-title" className="border-b border-se-line bg-se-paper">
          <div className="mx-auto max-w-se-content px-4 py-12 sm:px-6">
            <h1 id="mock-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
              {mockup.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-se-ink">{mockup.intro}</p>
          </div>
        </section>

        <Mock n={1} s={mockup.philosophy} tone="cream">
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {mockup.philosophy.items.map((item, i) => (
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
        </Mock>

        <Mock n={2} s={mockup.curriculum} tone="paper">
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {mockup.curriculum.items.map((item) => (
              <li key={item.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
                <h3 className="text-xl font-semibold text-se-green-700">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-se-ink">{item.text}</p>
              </li>
            ))}
          </ul>
        </Mock>

        <Mock n={3} s={mockup.structure} tone="cream">
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {mockup.structure.programs.map((program) => (
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
          <p className="mt-6 max-w-3xl leading-relaxed text-se-ink">{mockup.structure.after}</p>
        </Mock>

        <Mock n={4} s={mockup.core} tone="paper">
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockup.core.items.map((item) => (
              <li key={item.title} className="rounded-3xl border border-se-line bg-se-cream p-5">
                <h3 className="text-lg font-semibold text-se-green-700">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-se-ink">{item.text}</p>
              </li>
            ))}
          </ul>
        </Mock>

        <Mock n={5} s={mockup.benefit} tone="cream">
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {mockup.benefit.items.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-snug text-se-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-se-accent-600 text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Mock>

        <Mock n={6} s={mockup.start} tone="dark">
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {mockup.start.steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl border border-se-green-600 p-6">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-se-sand font-semibold text-se-green-900"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </Mock>
      </main>
    </div>
  );
}

type Section = { id: string; placement: string; source: string; title: string; lead: string; check?: readonly string[] };

/** One mock section: the placement note, then the section as it would look. */
function Mock({ n, s, tone, children }: { n: number; s: Section; tone: 'cream' | 'paper' | 'dark'; children: ReactNode }) {
  const bg = tone === 'dark' ? 'bg-se-green-800 text-se-sand' : tone === 'paper' ? 'bg-se-paper' : 'bg-se-cream';
  const heading = tone === 'dark' ? 'text-white' : 'text-se-green-700';
  const lead = tone === 'dark' ? 'text-se-sand' : 'text-se-green-800';
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={bg}>
      <div className="mx-auto max-w-se-content px-4 pt-8 sm:px-6">
        <div className="rounded-2xl border border-dashed border-se-accent-400 bg-se-accent-100 px-4 py-3 text-sm leading-relaxed text-se-green-800">
          <p>
            <strong>Mock-up {n} of 6.</strong> {s.placement}
          </p>
          <p className="mt-1">{s.source}</p>
          {s.check && (
            <ul className="mt-1 list-disc pl-5">
              {s.check.map((c) => (
                <li key={c}>To confirm: {c}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-se-content px-4 py-12 sm:px-6 md:py-16">
        <h2 id={`${s.id}-title`} className={`text-3xl font-semibold sm:text-4xl ${heading}`}>
          {s.title}
        </h2>
        <p className={`mt-5 max-w-3xl text-lg font-semibold leading-relaxed ${lead}`}>{s.lead}</p>
        {children}
      </div>
    </section>
  );
}
