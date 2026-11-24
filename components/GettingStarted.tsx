import { page } from '@/content/page';
import { settings } from '@/content/settings';
import CallbackForm from './CallbackForm';
import { PhoneIcon } from './Actions';

/**
 * "Getting started is easy" and the callback form as one block (Sergei, Nov 23
 * 2026: the step cards and the "Request a callback" block sat next to each
 * other and said the same thing twice). The brand-green block holds the
 * heading, one lead sentence and the three numbered steps on the left, and the
 * callback form from go.summitestate.com/outpatient on the right. Step 1 names
 * the phone number, so there is no second "call us or use the form" sentence.
 * On phones the green runs edge to edge, as on /outpatient, and the steps come
 * before the form; "Request a callback" buttons land on the form itself.
 */
export default function GettingStarted() {
  const { gettingStarted: start } = page;
  return (
    <section id={start.id} aria-labelledby="start-title" className="scroll-mt-20 border-t border-se-line bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-0 sm:px-6 sm:py-10 md:py-14">
        <div
          data-verify-actions
          className="-mx-4 grid items-start gap-10 bg-se-green-800 px-4 py-10 sm:mx-0 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:gap-14"
        >
          <div>
            <h2 id="start-title" className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {start.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white">{start.lead}</p>

            <ol className="mt-8 space-y-6">
              {start.steps.map((step, i) => {
                const [before, after] = step.text.split('{phone}');
                return (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-se-sand font-semibold text-se-sand"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-1 leading-relaxed text-white">
                        {before}
                        {after !== undefined && (
                          <>
                            <a href={settings.phoneHref} className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-se-sand">
                              <PhoneIcon className="h-4 w-4 shrink-0" />
                              {settings.phone}
                            </a>
                            {after}
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-8 leading-relaxed text-se-sand">{start.crisis}</p>
          </div>
          <div id={start.formId} className="scroll-mt-24">
            <CallbackForm copy={start.form} endpoint={settings.leadEndpoint} phone={settings.phone} phoneHref={settings.phoneHref} />
          </div>
        </div>
      </div>
    </section>
  );
}
