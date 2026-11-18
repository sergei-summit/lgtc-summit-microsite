import { page } from '@/content/page';
import { settings } from '@/content/settings';

/** The very bottom of the page (Sergei, Nov 5 2026): the confidentiality
 * line, the page's own closing note and the full-site link. LGTC's site
 * footer (privacy, legal, contact) wraps the page, so none of that is
 * repeated here. */
export default function PageFooterNote() {
  const { footerNote } = page;
  return (
    <div className="border-t border-se-line bg-se-paper">
      <div className="mx-auto flex max-w-se-content flex-col items-center gap-3 px-4 py-8 text-center text-sm text-se-ink-muted sm:px-6">
        <p className="max-w-2xl leading-relaxed">{footerNote.smallPrint}</p>
        <p className="max-w-2xl leading-relaxed">{footerNote.text}</p>
        {settings.showFullSiteLink && (
          <p>
            {/* At least 24px tall so it is easy to tap (WCAG 2.2 target size). */}
            <a
              href={settings.fullSiteUrl}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-se-green-900"
            >
              {footerNote.fullSiteLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
