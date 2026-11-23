import { page } from '@/content/page';

/** The very bottom of the page (Sergei, Nov 5 2026): the confidentiality
 * line and the page's own closing note (the full-site button moved above
 * "Where we are" on Nov 18 2026). LGTC's site
 * footer (privacy, legal, contact) wraps the page, so none of that is
 * repeated here. */
export default function PageFooterNote() {
  const { footerNote } = page;
  return (
    <div className="border-t border-se-line bg-se-paper">
      <div className="mx-auto flex max-w-se-content flex-col items-center gap-3 px-4 py-8 text-center text-sm text-se-ink-muted sm:px-6">
        {/* Confidentiality / 988 line removed Nov 23 2026 (Sergei): the callback form above carries it. */}
        <p className="max-w-2xl leading-relaxed">{footerNote.text}</p>
      </div>
    </div>
  );
}
