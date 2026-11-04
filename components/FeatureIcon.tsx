/**
 * Thin-line icons for the hero feature list, copied from Summit-Landing-Pages
 * (Astro/src/components/ui.tsx, `Icon`) so the badges match /microsite.
 */
export type FeatureIconName = 'brain' | 'layers' | 'home' | 'compass' | 'calendar' | 'shield';

export function FeatureIcon({ name, className = 'h-4 w-4' }: { name: FeatureIconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: 'false' as const,
  };
  switch (name) {
    case 'brain':
      return (
        <svg {...common}>
          <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5 2.5 2.5 0 0 0 4.5 8c0 .9.5 1.7 1.2 2.1A2.6 2.6 0 0 0 4.5 12c0 1 .6 1.9 1.4 2.3-.3.4-.4.9-.4 1.4A2.8 2.8 0 0 0 8.3 18.5c.2 1.4 1.4 2.5 2.9 2.5.4 0 .8-.5.8-1V4c0-.6-.5-1-1.1-1z" />
          <path d="M14.5 3A2.5 2.5 0 0 1 17 5.5 2.5 2.5 0 0 1 19.5 8c0 .9-.5 1.7-1.2 2.1.7.4 1.2 1.1 1.2 1.9 0 1-.6 1.9-1.4 2.3.3.4.4.9.4 1.4a2.8 2.8 0 0 1-2.8 2.8c-.2 1.4-1.4 2.5-2.9 2.5-.4 0-.8-.5-.8-1V4c0-.6.5-1 1.1-1z" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h3M13 14h3M8 17.5h3" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6l-7-3z" />
          <path d="m9 12 2 2 4-4.5" />
        </svg>
      );
  }
}
