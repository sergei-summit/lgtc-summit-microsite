import { page } from '@/content/page';

/** Why an LGTC patient is on this page: one registration, psychiatry built
 * in, one team across levels of care. */
export default function LgtcContinuum() {
  const { lgtc } = page;
  return (
    <section id={lgtc.id} aria-labelledby="lgtc-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="lgtc-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {lgtc.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-se-ink">{lgtc.lead}</p>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {lgtc.points.map((point, i) => (
            <li key={point.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-se-green-700 font-semibold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-se-green-700">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-se-ink">{point.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
