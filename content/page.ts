/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Outpatient-first version (Nov 2026). The page is hosted by LGTC for people
 * who are already LGTC patients or are referred inside LGTC, so it leads with
 * the in-network outpatient programs in San Jose: PHP, IOP (in person or
 * hybrid) and OP. Detox and residential in Palo Alto stay on the page as a
 * quieter "higher level of care" card under the tiles. The earlier
 * full-continuum version is kept on the branch
 * lgtc-summit-microsite-full-continuum. The framed mock-up blocks still under
 * review come from content/mockup.ts, not from here.
 *
 * Rules: "Summit Estate Recovery Centers" in the footer note and page title,
 * "Summit Estate" elsewhere; no street addresses, licence numbers or clock
 * times; lengths of stay are "typically". No eyebrow labels and no pill chips.
 * Detox and residential are call-only; the assessment / registration link
 * appears only next to outpatient care. Dual diagnosis stays the clinical
 * core: "mental health, substance use, or both", never mental health alone.
 * Never promise 24/7 or instant answers. Colour is never the only signal:
 * every in-network or higher-level marker also carries a text label.
 * "Complimentary" appears once, in the "Not sure which program fits?" band,
 * pending LGTC's confirmation.
 */
import type { StaticImageData } from 'next/image';
import { settings } from './settings';
import type { FeatureIconName } from '@/components/FeatureIcon';

import heroPhoto from './images/location-san-jose.webp';
import paloAltoPhoto from './images/hero-palo-alto-estate.webp';
import jointCommissionBadge from './images/badge-joint-commission.png';
import carfBadge from './images/badge-carf.png';
import dhcsBadge from './images/badge-dhcs.png';
import legitScriptBadge from './images/badge-legitscript.png';

export type Photo = { src: StaticImageData; alt: string };

export type Level = {
  id: string;
  name: string;
  /** Approved alias, shown as "Also called …". */
  alias?: string;
  /** Labelled rows, from LGTC's "Structure Without Isolation" block: time commitment, intensity, treatment, who it suits. */
  rows: [string, string][];
};

export type Badge =
  | { kind: 'image'; src: StaticImageData; alt: string }
  | { kind: 'google'; label: string; rating: number };

export const page = {
  subBar: {
    logoLabel: 'Summit Estate',
    navLabel: 'Summit Estate',
    links: [
      { href: '#programs', label: 'Programs' },
    ],
    cta: { href: '#verify', label: 'Get started' },
  },

  skipLink: 'Skip to programs',

  hero: {
    title: 'The right level of care,',
    titleAccent: 'without putting your life on hold.',
    text: 'Day Treatment (PHP), Intensive Outpatient (IOP) and Individual Therapy for Mental Health and Substance Use Disorder Care, in person in San Jose and virtually across California, with one Psychiatry-led team.',
    /** Second line under the intro; moved here from the San Jose block on Nov 5 2026. */
    schedule: 'Day and evening schedules are work-compatible, with hybrid IOP when clinically appropriate.',
    /** One line per outpatient level, then the team. Each pairs the service with its proof point. */
    features: [
      { icon: 'layers', title: 'Partial Hospitalization (PHP)', proof: 'Structured Day Treatment, home every evening' },
      { icon: 'calendar', title: 'Intensive Outpatient (IOP)', proof: 'Day, evening or virtual, around work, school and family' },
      { icon: 'brain', title: 'Outpatient Therapy (OP)', proof: 'Ongoing Individual Therapy and Medication Management' },
      { icon: 'shield', title: 'Board-Certified Team', proof: 'Psychiatry and Addiction Medicine, in-network with all major plans' },
    ] satisfies { icon: FeatureIconName; title: string; proof: string }[],
    insuranceBadge: { label: 'San Jose Outpatient Center', value: 'In-network with all major plans' },
    callCard: { title: 'Confidential', note: 'Obligation-free insurance check' },
    photo: {
      src: heroPhoto,
      alt: 'The San Jose outpatient lounge: leather sofas and armchairs around a wooden coffee table',
    } satisfies Photo,
  },

  trust: {
    label: 'Accreditations and reviews',
    badges: [
      { kind: 'image', src: jointCommissionBadge, alt: 'The Joint Commission Gold Seal of Approval' },
      { kind: 'image', src: carfBadge, alt: 'CARF Accredited' },
      { kind: 'image', src: dhcsBadge, alt: 'California Department of Health Care Services (DHCS) Certified' },
      { kind: 'image', src: legitScriptBadge, alt: 'LegitScript Certified' },
      { kind: 'google', label: 'Google reviews', rating: 4.5 },
    ] satisfies Badge[],
  },

  levels: {
    id: 'programs',
    title: 'Outpatient Programs',
    items: [
      {
        id: 'php',
        name: 'Partial Hospitalization (PHP)',
        alias: 'Day Treatment',
        rows: [
          ['Time commitment', '20 or more hours a week, typically 4–6 weeks.'],
          ['Intensity', 'More intensive than IOP: a structured day similar to Residential Care, without the overnight stay.'],
          ['Treatment', 'Group and Individual Therapy, Psychiatry-guided Medication Management, skill-building and psychoeducation.'],
          ['Suitable for', 'People who need more structure than IOP but not 24-hour medical supervision, including the step down from Residential Care.'],
        ],
      },
      {
        id: 'iop',
        name: 'Intensive Outpatient (IOP)',
        rows: [
          ['Time commitment', '9–19 hours a week, typically 8–12 weeks.'],
          ['Intensity', 'Less intensive than PHP, more than weekly therapy. Most people keep working.'],
          ['Treatment', 'Group Therapy is the core, with Individual Therapy and skill-building sessions. In person, or hybrid with virtual sessions when clinically appropriate.'],
          ['Suitable for', 'People with a stable home and support system who need more structure than weekly therapy.'],
        ],
      },
      {
        id: 'outpatient',
        name: 'Outpatient (OP)',
        alias: 'Individual Therapy',
        rows: [
          ['Time commitment', 'From one session a week, for as long as it is useful.'],
          ['Intensity', 'The lightest level of care: sessions that fit around a full working week.'],
          ['Treatment', 'Individual Therapy and Psychiatry-guided Medication Management, in person or virtual.'],
          ['Suitable for', 'People stepping down from IOP, or whose needs are met by regular individual care.'],
        ],
      },
    ] satisfies Level[],
    aliasPrefix: 'Also called',
    /** Detox and residential: a photo card below the San Jose card, labelled as a higher level of care. Call-only. */
    higher: {
      label: 'Higher Level of Care · Palo Alto',
      title: 'Need Detox or Residential Treatment first?',
      text: 'Private, confidential Medical Detox (typically 7–10 days) and Residential Treatment (typically 3–4 weeks) on our Palo Alto estate, when the assessment calls for it. Both start with a call to admissions, and both step down into the San Jose programs with the same team.',
      network:
        'In-network agreements for Detox and Residential in Palo Alto are in progress and expected in 2027; today they are out of network, and a single case agreement may be possible. We check your benefits before anything is decided.',
      photo: {
        src: paloAltoPhoto,
        alt: 'A two-storey Mediterranean-style house above a landscaped garden with a stone fountain and patio chairs',
      } satisfies Photo,
    },
    /** First of the two assessment prompts; the second is the closing section. */
    notSure: {
      title: 'Not sure which program fits?',
      text: 'A complimentary, confidential assessment sets the right level of care. Request one online and we call you back, or call admissions.',
    },
  },

  /** Adapted from LGTC's "Our Treatment Philosophy" (lgtcgroup.com/services/mental-health-programs); chosen from the mock-ups on Nov 4 2026. */
  philosophy: {
    id: 'philosophy',
    title: 'Our treatment philosophy',
    lead: 'We built these programs around four principles, each grounded in clinical evidence.',
    items: [
      {
        title: 'Intensity that matches need',
        text: 'Some challenges cannot be resolved in one hour a week. PHP and IOP provide the concentrated, structured treatment that moderate-to-severe symptoms require, at the level clinical necessity calls for, and step you down as you stabilize.',
      },
      {
        title: 'Proven therapies, practiced daily',
        text: 'Every group is grounded in Trauma-Informed Care and the evidence base: CBT, DBT and Mindfulness-Based Relapse Prevention, so a skill learned in the morning is safe to practice in real life the same day.',
      },
      {
        title: 'Progress you can see',
        text: 'We track symptoms weekly with validated measures and adjust your treatment plan on data, not guesswork.',
      },
      {
        title: 'Families heal together',
        text: 'Caregivers are part of treatment, not spectators. Weekly Family Therapy and a Multi-Family Group mean the people around you learn the same skills at the same time, and alumni tune-ups keep the door open after treatment.',
      },
    ],
  },

  /**
   * Two versions shown side by side, on purpose, so they can be compared on
   * the live page (a third, LGTC's original list, sits beside them as a
   * framed mock-up). Keep one and delete the others once chosen.
   */
  whoFor: {
    title: 'Who it is for',
    versions: [
      {
        label: 'Version A',
        intro:
          'We provide structured, evidence-based care for adults navigating both psychiatric disorders and co-occurring Substance Use challenges, including:',
        items: [
          'Anxiety, depression or other mood conditions alongside Substance Use',
          'Active Substance Use, or early recovery',
          'A history of relapse',
          'Stress or trauma triggers',
          'Wanting structured support to stay sober',
          'Wanting a peer group going through the same thing',
          'Professionals who need privacy and a schedule that fits their career',
        ],
      },
      {
        label: 'Version B',
        intro:
          'Structured, evidence-based care for adults with Mental Health and Substance Use challenges, when:',
        items: [
          'Weekly therapy or medication alone is not enough right now',
          'Anxiety, depression or trauma and Substance Use are feeding each other',
          'You are leaving a hospital stay or stepping down from Residential Care',
          'A relapse, or the risk of one, needs more structure than once a week',
          'You want a peer group going through the same thing',
          'You need privacy and a schedule that fits your career',
        ],
      },
    ],
    family:
      'Treatment includes Family Therapy and a Multi-Family Group. Loved ones learn the same skills at the same time, so the whole family is practising together rather than one person carrying the change alone.',
  },

  /**
   * Closing section, on the dark band: the three steps carry the LGTC points
   * (one registration, psychiatry built in, one team across levels), then the
   * primary pair of buttons, one quiet line for detox and residential, and
   * the small print. #verify is where "Get started" jumps.
   */
  gettingStarted: {
    id: 'verify',
    title: 'Getting started is easy',
    lead: 'One registration, one team, the right level of care.',
    steps: [
      {
        title: 'Register or call',
        text: 'Request a confidential assessment online in a few minutes, or call admissions. Either way the same team handles every program on this page.',
      },
      {
        title: 'We verify your benefits',
        text: 'Outpatient Care is in-network with all major plans. Costs upfront, with no obligation. Detox and Residential Care in Palo Alto: PPO policies accepted, in-network agreements in progress, single case agreement possible.',
      },
      {
        title: 'Assessment and consultation',
        text: 'A confidential assessment using the ASAM criteria, reviewed by our Clinical Director, sets your level of care: PHP, IOP or therapy, with Psychiatric Evaluation in conjunction with Medication Management.',
      },
    ],
    higherLevel: 'Need Detox or Residential Care? Those programs start with a call to admissions.',
    smallPrint: "All communication is confidential. Please don't include sensitive medical details. If you are in crisis, call or text 988.",
  },

  actions: {
    /** The visible label; the number follows it. */
    callPrefix: 'Call',
    /** LGTC's online registration form, framed as the assessment request. */
    register: 'Request a confidential assessment',
  },

  footerNote: {
    text: `Summit Estate Recovery Centers. Dual-diagnosis care for adults, a collaborative partnership under the guidance and oversight of ${settings.groupName}.`,
    fullSiteLink: 'Explore the full Summit Estate site',
  },

  /** Phone bar: Call, plus Get started, which jumps to the closing section. */
  mobileBar: { label: 'Call or get started', secondary: { href: '#verify', label: 'Get started' } },
} as const;

export type PageContent = typeof page;
