import { page } from '@/content/page';
import { CheckIcon } from './Actions';

/** What we treat: the two condition groups, then the Therapies and Group
 * topics lists ported from go.summitestate.com/microsite. */
export default function WhatWeTreat() {
  const { treatment } = page;
  const slug = (label: string) => `treat-${label.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <section id={treatment.id} aria-labelledby="treatment-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="treatment-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {treatment.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-se-ink">{treatment.intro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {treatment.groups.map((group) => (
            <div key={group.label} className="rounded-3xl border border-se-line bg-se-cream p-6">
              <p id={slug(group.label)} className="text-lg font-semibold text-se-green-700">
                {group.label}
              </p>
              <ul aria-labelledby={slug(group.label)} className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-se-accent-100 px-3 py-1.5 text-sm font-semibold text-se-green-800"
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {treatment.lists.map((list) => (
            <div key={list.label} className="rounded-3xl border border-se-line bg-se-cream p-6">
              <h3 id={slug(list.label)} className="text-xl font-semibold text-se-green-700">
                {list.label}
              </h3>
              <ul aria-labelledby={slug(list.label)} className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}
