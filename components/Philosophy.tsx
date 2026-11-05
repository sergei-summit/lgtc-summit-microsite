import { page } from '@/content/page';

/** Our treatment philosophy: four numbered principles, adapted from LGTC's
 * "Our Treatment Philosophy". Sits right after the programs. */
export default function Philosophy() {
  const { philosophy } = page;
  return (
    <section id={philosophy.id} aria-labelledby="philosophy-title" className="scroll-mt-20 bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="philosophy-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {philosophy.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{philosophy.lead}</p>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {philosophy.items.map((item, i) => (
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
      </div>
    </section>
  );
}
