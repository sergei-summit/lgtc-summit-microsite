import { page } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';

/**
 * Closing prompt: one primary action (the assessment request), the phone
 * beside it, and one quiet line for detox and residential, which stay
 * call-only.
 */
export default function CallOrRegister() {
  const { callOrRegister } = page;
  return (
    <section id={callOrRegister.id} aria-labelledby="verify-title" className="scroll-mt-20 bg-se-green-800 text-se-sand">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="verify-title" className="text-3xl font-semibold text-white sm:text-4xl">
          {callOrRegister.title}
        </h2>
        <p className="mt-4 text-xl font-semibold text-se-sand">{callOrRegister.subtitle}</p>
        <p className="mt-3 max-w-3xl leading-relaxed">{callOrRegister.text}</p>
        <div data-verify-actions className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RegisterButton tone="dark" className="min-h-14 px-8 text-lg" />
          <CallButton tone="dark" variant="outline" className="min-h-14 px-8 text-lg" />
        </div>
        <p className="mt-6 max-w-2xl leading-relaxed">{callOrRegister.higherLevel}</p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed">{callOrRegister.smallPrint}</p>
      </div>
    </section>
  );
}
