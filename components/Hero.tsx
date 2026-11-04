import Image from 'next/image';
import { page } from '@/content/page';
import { CallButton, CheckIcon, RegisterButton } from './Actions';

export default function Hero() {
  const { hero } = page;
  return (
    <section aria-labelledby="hero-title" className="bg-se-cream">
      <div className="mx-auto grid max-w-se-content items-center gap-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-se-accent-700">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 text-4xl font-semibold leading-[1.1] text-se-green-700 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-se-ink">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallButton />
            <RegisterButton />
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.pills.map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-se-line bg-se-paper px-3 py-1.5 text-sm text-se-ink-muted"
              >
                <CheckIcon className="h-3.5 w-3.5 text-se-accent-600" />
                {pill}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          width={560}
          height={373}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority
          className="h-auto w-full rounded-3xl object-cover shadow-se-card"
        />
      </div>
    </section>
  );
}
