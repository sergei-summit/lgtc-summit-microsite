import { page } from '@/content/page';
import { CheckIcon } from './Actions';

/** How we treat: lead, intro, therapies and group topics, ported from
 * go.summitestate.com/microsite. */
export default function HowWeTreat() {
  const { howWeTreat } = page;
  return (
    <section id={howWeTreat.id} aria-labelledby="how-title" className="scroll-mt-20 bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="how-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {howWeTreat.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{howWeTreat.lead}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-se-ink">{howWeTreat.intro}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {howWeTreat.lists.map((list) => {
            const id = `how-${list.label.toLowerCase().replace(/\W+/g, '-')}`;
            return (
              <div key={list.label} className="rounded-3xl border border-se-line bg-se-paper p-6">
                <h3 id={id} className="text-xl font-semibold text-se-green-700">
                  {list.label}
                </h3>
                <ul aria-labelledby={id} className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 leading-snug text-se-ink">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-se-accent-600 text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
