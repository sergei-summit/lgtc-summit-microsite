import { page } from '@/content/page';

/** One card per program (PHP, IOP, OP) with Summit's weekly hours and LGTC's
 * framing, so the schedule question is answered on the page. No clock times,
 * by the content rules. */
export default function TypicalWeek() {
  const { schedule } = page;
  return (
    <section id={schedule.id} aria-labelledby="schedule-title" className="scroll-mt-20 bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-14 sm:px-6 md:py-20">
        <h2 id="schedule-title" className="text-3xl font-semibold text-se-green-700 sm:text-4xl">
          {schedule.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-se-green-800">{schedule.lead}</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {schedule.options.map((option) => (
            <li key={option.title} className="rounded-3xl border border-se-line bg-se-cream p-6">
              <h3 className="text-xl font-semibold text-se-green-700">{option.title}</h3>
              <p className="mt-2 leading-relaxed text-se-ink">{option.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
