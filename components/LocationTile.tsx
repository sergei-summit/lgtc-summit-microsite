import Image from 'next/image';
import type { Photo } from '@/content/page';

export default function LocationTile({ name, text, photo }: { name: string; text: string; photo: Photo }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-se-line bg-se-paper">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={560}
        height={373}
        sizes="(min-width: 768px) 560px, 100vw"
        className="aspect-[3/2] h-auto w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-se-green-700">{name}</h3>
        <p className="mt-2 leading-relaxed text-se-ink">{text}</p>
      </div>
    </article>
  );
}
