import { page } from '@/content/page';
import { CheckIcon } from './Actions';
import { MockBenefit } from './Mockups';

/**
 * Who it is for. Versions A and B are rendered side by side, on purpose, so
 * they can be compared on the live page, with LGTC's original list beside
 * them as a framed mock-up (Version C). Delete the others from
 * content/page.ts once one is chosen and the labels disappear with them.
 */
export default function WhoItIsFor() {
  const { whoFor } = page;
  const compare = whoFor.versions.length > 1;
  return (
    <section aria-labelledby="who-title" className="bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="who-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {whoFor.title}
        </h2>
        <div className={compare ? 'mt-6 grid gap-5 lg:grid-cols-3' : 'mt-2'}>
          {whoFor.versions.map((version) => (
            <div key={version.label} className={compare ? 'rounded-3xl border border-se-line bg-se-cream p-6' : ''}>
              {compare && <p className="text-sm font-semibold text-se-accent-700">{version.label}</p>}
              <p className="mt-3 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{version.intro}</p>
              <ul className={`mt-6 grid gap-3 ${compare ? '' : 'md:grid-cols-2'}`}>
                {version.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-snug text-se-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-se-accent-600 text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <MockBenefit />
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-se-ink">{whoFor.family}</p>
      </div>
    </section>
  );
}
