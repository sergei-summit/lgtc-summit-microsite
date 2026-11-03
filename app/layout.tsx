import type { ReactNode } from 'react';

/**
 * Root layout for running this repo on its own (preview, static export,
 * staging). LGTC's app has its own root layout with its site header and
 * footer; the page under app/summit-estate/ does not depend on this file.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F7F4EF' }}>{children}</body>
    </html>
  );
}
