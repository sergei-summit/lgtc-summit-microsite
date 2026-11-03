import { page } from '@/content/page';
import { settings } from '@/content/settings';

/** The page's own closing note. LGTC's site footer (privacy, legal, contact)
 * wraps the page, so none of that is repeated here. */
export default function PageFooterNote() {
  const { footerNote } = page;
  return (
    <div className="border-t border-se-line bg-se-paper">
      <div className="mx-auto flex max-w-se-content flex-col items-center gap-3 px-4 py-8 text-center text-sm text-se-ink-muted sm:px-6">
        <p className="max-w-2xl leading-relaxed">{footerNote.text}</p>
        {settings.showFullSiteLink && (
          <p>
            <a href={settings.fullSiteUrl} className="font-semibold text-se-green-700 underline">
              {footerNote.fullSiteLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
