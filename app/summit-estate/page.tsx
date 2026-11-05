import type { Metadata } from 'next';
import './summit-estate.css';
import { montserrat } from '@/components/fonts';
import { page } from '@/content/page';
import { settings } from '@/content/settings';
import SubBar from '@/components/SubBar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import BenefitAndTeam from '@/components/BenefitAndTeam';
import LevelsOfCare from '@/components/LevelsOfCare';
import GettingStarted from '@/components/GettingStarted';
import PageFooterNote from '@/components/PageFooterNote';
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
    <div className={`se-root ${montserrat.variable} bg-se-cream pb-24 md:pb-0`}>
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
        <BenefitAndTeam />
        <LevelsOfCare />
        <GettingStarted />
        <PageFooterNote />
      </main>
      <MobileCallBar
        label={page.mobileBar.label}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        callPrefix={page.actions.callPrefix}
        secondaryLabel={page.mobileBar.secondary.label}
        secondaryHref={page.mobileBar.secondary.href}
      />
    </div>
  );
}
