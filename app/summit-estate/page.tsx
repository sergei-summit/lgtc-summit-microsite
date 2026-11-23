import type { Metadata } from 'next';
import './summit-estate.css';
import { montserrat } from '@/components/fonts';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import SubBar from '@/components/SubBar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import LevelsOfCare from '@/components/LevelsOfCare';
import PageFooterNote from '@/components/PageFooterNote';
import WhereWeAre from '@/components/WhereWeAre';
import GettingStarted from '@/components/GettingStarted';
import MobileCallBar from '@/components/MobileCallBar';

export const metadata: Metadata = {
  title: settings.metaTitle,
  description: settings.metaDescription,
  robots: settings.robots,
};

/**
 * The Summit Estate page. LGTC's site header and footer wrap it; it renders
 * only the Summit sub-bar, the page content and its own footer note.
 */
export default function SummitEstatePage() {
  return (
    <div className={`se-root ${montserrat.variable} bg-se-sand pb-[4.75rem] md:pb-0`}>
      <a
        href="#programs"
        className="sr-only z-50 rounded-full bg-se-green-800 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {page.skipLink}
      </a>
      <SubBar />
      <main>
        <Hero />
        <TrustBadges />
        <LevelsOfCare />
        {/* Care team section removed (Sergei, Nov 18 2026); BenefitAndTeam.tsx kept for later use. */}
        <WhereWeAre />
        {/* Getting started is easy, with the callback form (Sergei, Nov 23 2026); below the location cards. */}
        <GettingStarted />
        <PageFooterNote />
      </main>
      {/* Two-button bar pinned to the bottom on phones again (Sergei, Nov 23 2026; removed Nov 18). It hides while the form is on screen. */}
      <MobileCallBar
        label={page.actions.callNow}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        callPrefix={page.actions.callNow}
        secondaryLabel={page.hero.callback}
        secondaryHref={`#${page.gettingStarted.formId}`}
      />
    </div>
  );
}
