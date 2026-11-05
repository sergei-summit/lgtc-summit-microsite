/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Outpatient-first version (Nov 2026). The page is hosted by LGTC for people
 * who are already LGTC patients or are referred inside LGTC, so it leads with
 * the in-network outpatient programs in San Jose: PHP, IOP (in person or
 * hybrid) and OP. Detox and residential in Palo Alto stay on the page as a
 * quieter "higher level of care" card under the San Jose card. The earlier
 * full-continuum version is kept on the branch
 * lgtc-summit-microsite-full-continuum. The framed mock-up blocks on the page
 * come from content/mockup.ts, not from here.
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
import sanJosePhoto from './images/location-san-jose.webp';
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
  /** Benefit line: why someone would choose this level, not just what it is. */
  text: string;
  /** Typical length; omitted where the source gives none. */
  length?: string;
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
      { href: '#treatment', label: 'What we treat' },
    ],
    cta: { href: '#verify', label: 'Get started' },
  },

  skipLink: 'Skip to programs',

  hero: {
    title: 'The right level of care,',
    titleAccent: 'without putting your life on hold.',
    text: 'Day treatment, intensive outpatient and individual therapy for mental health and substance use, in San Jose and virtually across California, with one psychiatry-led team.',
    /** One line per outpatient level, then the team. Each pairs the service with its proof point. */
    features: [
      { icon: 'layers', title: 'Partial Hospitalization (PHP)', proof: 'Structured day treatment, home every evening' },
      { icon: 'calendar', title: 'Intensive Outpatient (IOP)', proof: 'Day, evening or virtual, around work, school and family' },
      { icon: 'brain', title: 'Outpatient Therapy (OP)', proof: 'Ongoing individual therapy and medication management' },
      { icon: 'shield', title: 'Board-Certified Team', proof: 'Psychiatry and addiction medicine, in-network with all major plans' },
    ] satisfies { icon: FeatureIconName; title: string; proof: string }[],
    /** Quiet pointer to the higher levels of care; the Palo Alto card under the programs carries the detail. */
    higherLevel: 'Need detox or residential care first? Those start with a call to admissions.',
    insuranceBadge: { label: 'Outpatient care', value: 'In-network with all major plans' },
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
    title: 'Outpatient programs',
    /** The in-network statement is made once, here, not on every tile. */
    lead: 'PHP, IOP and outpatient therapy in San Jose, in-network with all major plans. Wherever you start, the first step is a confidential assessment with our integrated clinical team.',
    items: [
      {
        id: 'php',
        name: 'Partial Hospitalization (PHP)',
        alias: 'Day Treatment',
        text: 'Intensive mental health and substance use treatment several hours a day, then home each evening.',
        length: '20+ hours a week, typically 4–6 weeks',
      },
      {
        id: 'iop',
        name: 'Intensive Outpatient (IOP)',
        text: 'Structured support around work, school and family, 3–5 days a week, day or evening. In person, or hybrid with virtual sessions when clinically appropriate. Most people keep working.',
        length: '9–19 hours a week, typically 8–12 weeks',
      },
      {
        id: 'outpatient',
        name: 'Outpatient (OP)',
        alias: 'Individual Therapy',
        text: 'Ongoing individual therapy and medication management that fit around a full working week.',
        length: '1–9 hours a week, ongoing',
      },
    ] satisfies Level[],
    aliasPrefix: 'Also called',
    locationsLabel: 'Where we are',
    location: {
      id: 'san-jose',
      name: 'San Jose outpatient center',
      text: 'PHP, IOP and OP, family therapy and a multi-family group, psychiatry-guided medication management and case management. Day and evening schedules are work-compatible, with hybrid IOP when clinically appropriate.',
      photo: {
        src: sanJosePhoto,
        alt: 'The San Jose outpatient lounge: leather sofas and armchairs around a wooden coffee table',
      } satisfies Photo,
    },
    /** Detox and residential: a photo card below the San Jose card, labelled as a higher level of care. Call-only. */
    higher: {
      label: 'Higher level of care · Palo Alto',
      title: 'Need detox or residential first?',
      text: 'Private, confidential medical detox (typically 7–10 days) and residential treatment (typically 3–4 weeks) on our Palo Alto estate, when the assessment calls for it. Both start with a call to admissions, and both step down into the San Jose programs with the same team.',
      network:
        'In-network agreements for detox and residential in Palo Alto are in progress and expected in 2027; today they are out of network, and a single case agreement may be possible. We check your benefits before anything is decided.',
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

  /** One card per program, with Summit's weekly hours and LGTC's framing of
   * PHP and IOP ("Structure Without Isolation"). Weekdays only; no clock times. */
  schedule: {
    id: 'schedule',
    title: 'A typical week',
    lead: 'PHP and IOP bridge the gap between weekly therapy and residential care: structured days, your own bed at night. Hours step down as you progress, with the same team throughout.',
    options: [
      {
        title: 'Partial Hospitalization (PHP)',
        text: '5 days a week, about 6 hours a day, 20 or more hours in total; typically 4–6 weeks. You live at home and spend most of the day with the program. For people who need more structure than IOP but not 24-hour medical supervision.',
      },
      {
        title: 'Intensive Outpatient (IOP)',
        text: '3–5 days a week in three-hour blocks, day or evening, 9–19 hours in total; typically 8–12 weeks. Group therapy is the core, with individual therapy and skill-building. In person, or hybrid with virtual sessions when clinically appropriate. Most people keep working.',
      },
      {
        title: 'Outpatient (OP)',
        text: '1–9 hours a week, ongoing. Individual therapy and medication management, in person or virtual, that fit around a full working week.',
      },
    ],
  },

  treatment: {
    id: 'treatment',
    title: 'Mental health and substance use, together.',
    intro: 'Mental health, substance use, or both: dual diagnosis is the program, not an add-on.',
    groups: [
      { label: 'Mental health', items: ['Anxiety', 'Depression', 'Trauma', 'PTSD / PTSI'] },
      {
        label: 'Substance use',
        items: [
          'Alcohol',
          'Opioids & Heroin',
          'Prescription Drugs',
          'Benzodiazepines',
          'Cocaine',
          'Methamphetamine',
          'Kratom / 7-OH',
          'Inhalants / Nitrous',
        ],
      },
    ],
    /** Ported from go.summitestate.com/microsite ("How we treat it"); shown under the conditions. */
    lists: [
      {
        label: 'Therapies',
        items: [
          'Cognitive Behavioral Therapy (CBT)',
          'Dialectical Behavior Therapy (DBT)',
          'Mindfulness-Based Relapse Prevention',
          'Trauma-Informed Therapy',
          'PTSD / PTSI Therapy',
          'EMDR (Eye Movement Desensitization and Reprocessing)',
          'Narrative Therapy',
          'Attachment Therapy',
          'Family Systems Therapy',
          'Couples & Family Therapy',
          'Art Therapy',
          'Music Therapy',
          'Breathwork',
          'Psychiatry-Guided Medication Management',
        ],
      },
      {
        label: 'Group topics',
        items: [
          'Mindfulness & Nervous System Regulation',
          'Relapse Prevention',
          'Chemical Dependency Education',
          'Stress Management',
          'Anger Management & Conflict Resolution',
          'Coping & Resilience Skills',
          'Specialized Process Groups',
          'Emotional Regulation (DBT)',
          'Interpersonal Effectiveness (DBT)',
          'Thought Shifting (CBT)',
          'Trauma Stabilization',
          'Somatic Awareness',
          'Values, Identity & Meaning',
          'Communication Skills',
          'Family Roles & Dynamics',
          'Functional Living Skills',
        ],
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
          'We provide structured, evidence-based care for adults navigating both psychiatric disorders and co-occurring substance use challenges, including:',
        items: [
          'Anxiety, depression or other mood conditions alongside substance use',
          'Active substance use, or early recovery',
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
          'Structured, evidence-based care for adults with mental health and substance use challenges, when:',
        items: [
          'Weekly therapy or medication alone is not enough right now',
          'Anxiety, depression or trauma and substance use are feeding each other',
          'You are leaving a hospital stay or stepping down from residential care',
          'A relapse, or the risk of one, needs more structure than once a week',
          'You want a peer group going through the same thing',
          'You need privacy and a schedule that fits your career',
        ],
      },
    ],
    family:
      'Treatment includes family therapy and a multi-family group. Loved ones learn the same skills at the same time, so the whole family is practising together rather than one person carrying the change alone.',
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
        text: 'Outpatient care is in-network with all major plans. Costs upfront, with no obligation. Detox and residential care in Palo Alto: PPO policies accepted, in-network agreements in progress, single case agreement possible.',
      },
      {
        title: 'Assessment and consultation',
        text: 'A confidential assessment using the ASAM criteria, reviewed by our Clinical Director, sets your level of care: PHP, IOP or therapy, with psychiatric evaluation in conjunction with medication management.',
      },
    ],
    higherLevel: 'Need detox or residential care? Those programs start with a call to admissions.',
    smallPrint: "All communication is confidential. Please don't include sensitive medical details. If you are in crisis, call or text 988.",
  },

  actions: {
    /** The visible label; the number follows it. */
    callPrefix: 'Call',
    /** Short call link on each program tile; dials the same number without repeating it. */
    callAdmissions: 'Call admissions',
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
