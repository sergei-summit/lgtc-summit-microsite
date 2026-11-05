import Image from 'next/image';
import { page } from '@/content/page';

/** Accreditation and review badges as a plain list, with no heading. Each
 * accreditation image is a link to the accreditor's own listing or lookup for
 * Summit Estate (new tab); its alt text names the credential and so names the
 * link. The Google reviews chip is not a link. */
export default function TrustBadges() {
  const { trust } = page;
  return (
    <section aria-label={trust.label} className="border-y border-se-line bg-se-paper">
      <div className="mx-auto max-w-se-content px-4 py-6 sm:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {trust.badges.map((badge) =>
            badge.kind === 'image' ? (
              <li key={badge.alt}>
                <a
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-se-accent-700"
                >
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    height={56}
                    width={Math.round((badge.src.width / badge.src.height) * 56)}
                    className="h-14 w-auto"
                  />
                  <span className="sr-only">, {trust.newTab}</span>
                </a>
              </li>
            ) : (
              <li
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-se-line bg-se-cream px-4 py-2"
              >
                <GoogleIcon />
                <span className="text-sm font-semibold text-se-ink">{badge.label}</span>
                <Stars rating={badge.rating} />
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 01-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 010-4.6V6.6H1.3a12 12 0 000 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0012 0 12 12 0 001.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z" />
    </svg>
  );
}

/** Star rating in half steps, announced once as text. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex text-[#946B00]" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-4 w-4">
            <defs>
              <linearGradient id={`se-star-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="#CFCFCC" />
              </linearGradient>
            </defs>
            <path fill={`url(#se-star-${i})`} d="M12 2l2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.8 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9L12 2z" />
          </svg>
        );
      })}
    </span>
  );
}
