import { page } from '@/content/page';
import { CheckIcon } from './Actions';

export default function WhoItIsFor() {
  const { whoFor } = page;
  return (
    <section aria-labelledby="who-title" className="bg-se-cream">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="who-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {whoFor.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-se-ink">{whoFor.intro}</p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {whoFor.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-snug text-se-ink">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-se-accent-600 text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
