import { page } from '@/content/page';
import { CheckIcon } from './Actions';

export default function WhatWeTreat() {
  const { treatment } = page;
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
              <p id={`treat-${group.label.toLowerCase().replace(/\W+/g, "-")}`} className="text-lg font-semibold text-se-green-700">
                {group.label}
              </p>
              <ul aria-labelledby={`treat-${group.label.toLowerCase().replace(/\W+/g, "-")}`} className="mt-4 flex flex-wrap gap-2">
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
      </div>
    </section>
  );
}
