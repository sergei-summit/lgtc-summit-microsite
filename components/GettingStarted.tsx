import { page } from '@/content/page';

export default function GettingStarted() {
  const { gettingStarted } = page;
  return (
    <section aria-labelledby="start-title" className="bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="start-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {gettingStarted.title}
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {gettingStarted.steps.map((step, i) => (
            <li key={step.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-se-accent-600 font-semibold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-se-green-700">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-se-ink">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
