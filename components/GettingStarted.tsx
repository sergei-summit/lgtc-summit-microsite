import { page } from '@/content/page';
import { settings } from '@/content/settings';
import CallbackForm from './CallbackForm';
import { ArrowIcon, PhoneIcon } from './Actions';

/**
 * "Getting started is easy", rebuilt after lgtcgroup.com/services/psychotherapy
 * (Sergei, Nov 23 2026): centred eyebrow, title and intro; three numbered step
 * cards with a top accent bar; a button down to the form; then a split with the
 * "We can help you assess…" text on the left and the callback form from
 * go.summitestate.com/outpatient on the right.
 */
export default function GettingStarted() {
  const { gettingStarted: start } = page;
  return (
    <section id={start.id} aria-labelledby="start-title" className="scroll-mt-20 border-t border-se-line bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-10 sm:px-6 md:py-14">
        <hgroup className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-se-green-700">{start.eyebrow}</p>
          <h2 id="start-title" className="mt-3 text-3xl font-semibold text-se-green-700 sm:text-4xl">
            {start.title}
          </h2>
          <p className="mt-4 leading-relaxed text-se-ink">{start.intro}</p>
        </hgroup>

        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {start.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative overflow-hidden rounded-3xl border border-se-line bg-se-cream p-7 pt-8 shadow-se-card"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-se-sand-light" />
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-se-green-100 text-se-green-700">
                  <StepIcon name={step.icon} />
                </span>
                <span aria-hidden="true" className="text-3xl font-semibold italic text-se-green-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-se-green-700">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-se-ink">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex justify-center">
          <a
            href={`#${start.formId}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-8 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900"
          >
            {start.cta}
            <ArrowIcon />
          </a>
        </p>

        <div id={start.formId} className="mt-14 grid scroll-mt-24 items-start gap-10 rounded-3xl bg-se-cream p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="text-3xl font-light leading-tight text-se-green-700 sm:text-4xl">{start.formTitle}</h3>
            <p className="mt-6 leading-relaxed text-se-ink">
              {start.formTextBefore}{' '}
              <a href={settings.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-se-green-700">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {settings.phone}
              </a>{' '}
              {start.formTextAfter}
            </p>
            <p className="mt-6 leading-relaxed text-se-ink-muted">{start.crisis}</p>
          </div>
          <CallbackForm copy={start.form} endpoint={settings.leadEndpoint} phone={settings.phone} phoneHref={settings.phoneHref} />
        </div>
      </div>
    </section>
  );
}

function StepIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    callback: 'M16 3h5v5M21 3l-6 6M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    phone: 'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" focusable="false">
      <path d={paths[name] ?? paths.phone} />
    </svg>
  );
}
