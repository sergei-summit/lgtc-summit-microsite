import type { NextConfig } from 'next';
import { settings } from './content/settings';

/**
 * Static export: `next build` writes plain HTML, CSS and images to `out/`.
 * Host those files as they are, or lift `app/summit-estate/`, `components/`
 * and `content/` into an existing Next.js app (see README).
 *
 * basePath comes from content/settings.ts, which reads NEXT_PUBLIC_BASE_PATH.
 * Empty for Jan; `/lgtc-summit-microsite` for Summit's Cloudflare staging copy.
 */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: settings.basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Photos are pre-sized for their display size in content/images/, so a
  // static host needs no image optimiser.
  images: { unoptimized: true },
};

export default nextConfig;
