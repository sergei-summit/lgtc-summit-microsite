import { page } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';

/**
 * Closing section, on the dark band: three steps (register or call, benefits,
 * assessment) that carry the LGTC continuum points, the primary pair of
 * buttons, one quiet line for detox and residential (call-only) and the small
 * print. #verify is the target of the sub-bar's and the phone bar's
 * "Get started"; the phone bar hides itself once [data-verify-actions] is on
 * screen.
 */
export default function GettingStarted() {
  const { gettingStarted: start } = page;
  return (
    <section id={start.id} aria-labelledby="start-title" className="scroll-mt-20 bg-se-green-800 text-se-sand">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="start-title" className="text-3xl font-semibold text-white sm:text-4xl">
          {start.title}
        </h2>
        <p className="mt-4 text-xl font-semibold text-se-sand">{start.lead}</p>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {start.steps.map((step, i) => (
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
        <div data-verify-actions className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RegisterButton tone="dark" className="min-h-14 px-8 text-lg" />
          <CallButton tone="dark" variant="outline" className="min-h-14 px-8 text-lg" />
        </div>
        <p className="mt-6 max-w-2xl leading-relaxed">{start.higherLevel}</p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed">{start.smallPrint}</p>
      </div>
    </section>
  );
}
