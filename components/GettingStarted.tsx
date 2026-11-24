import { page } from '@/content/page';
import { settings } from '@/content/settings';
import CallbackForm from './CallbackForm';
import { PhoneIcon } from './Actions';

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
      <div className="mx-auto max-w-se-content px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-10">
        <hgroup className="mx-auto max-w-2xl text-center">
          <h2 id="start-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
            {start.title}
          </h2>
          <p className="mt-4 leading-relaxed text-se-ink">{start.intro}</p>
        </hgroup>

        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {start.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-3xl border border-se-line bg-se-cream p-7 shadow-se-card"
            >
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-se-green-100 text-se-green-700">
                  <StepIcon name={step.icon} />
                </span>
                <span aria-hidden="true" className="text-3xl font-semibold text-se-green-600">
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

        {/* The form block sits on the brand green so it reads as the destination (Sergei, Nov 23 2026). */}
        <div id={start.formId} data-verify-actions className="mt-12 grid scroll-mt-24 items-start gap-10 rounded-3xl bg-se-green-800 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{start.formTitle}</h3>
            <p className="mt-5 text-lg leading-relaxed text-white">{start.formLead}</p>
            <p className="mt-4 leading-relaxed text-white">
              {start.formTextBefore}{' '}
              <a href={settings.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-se-sand">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {settings.phone}
              </a>{' '}
              {start.formTextAfter}
            </p>
            <p className="mt-6 leading-relaxed text-se-sand">{start.crisis}</p>
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
