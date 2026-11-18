import type { Photo } from '@/content/page';

/**
 * A photo that fills its (positioned) box, offered in two widths so phones
 * download the 720px copy and larger screens the full one. A plain <img>
 * because the static export has no image optimiser to write a srcset.
 * `priority` marks the hero photo, the largest thing on screen when the page
 * opens (Modern Web Guidance, optimize-image-priority: fetchpriority="high" on
 * that image, never lazy); every other photo loads lazily.
 */
export default function FillPhoto({ photo, sizes, priority = false }: { photo: Photo; sizes: string; priority?: boolean }) {
  const { src, small, alt } = photo;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src.src}
      srcSet={small ? `${small.src} ${small.width}w, ${src.src} ${src.width}w` : undefined}
      sizes={small ? sizes : undefined}
      alt={alt}
      width={src.width}
      height={src.height}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
