import { page } from '@/content/page';
import { CallButton, RegisterButton } from './Actions';

/**
 * Call or register, split by level of care: detox and residential are
 * call-only; outpatient care can also register online.
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
        <p className="mt-2 leading-relaxed">{callOrRegister.text}</p>
        <div data-verify-actions className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border-2 border-se-sand p-6">
            <h3 className="text-xl font-semibold text-white">{callOrRegister.urgent.title}</h3>
            <p className="mt-2 leading-relaxed">{callOrRegister.urgent.text}</p>
            <div className="mt-auto pt-6">
              <CallButton tone="dark" />
            </div>
          </div>
          <div className="flex flex-col rounded-3xl border border-se-green-600 p-6">
            <h3 className="text-xl font-semibold text-white">{callOrRegister.outpatient.title}</h3>
            <p className="mt-2 leading-relaxed">{callOrRegister.outpatient.text}</p>
            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap">
              <CallButton tone="dark" />
              <RegisterButton tone="dark" />
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed">{callOrRegister.smallPrint}</p>
      </div>
    </section>
  );
}
