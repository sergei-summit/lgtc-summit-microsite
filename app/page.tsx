/**
 * Standalone preview only: serves the same page at the export's root, so a
 * static host (and Summit's staging copy at /lgtc-summit-microsite) shows it
 * at the base path itself. When lifting the page into LGTC's app, copy
 * app/summit-estate/ and leave this file behind.
 */
export { default, metadata } from './summit-estate/page';
