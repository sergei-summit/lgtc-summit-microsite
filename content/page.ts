/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Outpatient-first version (Nov 2026). The page is hosted by LGTC for people
 * who are already LGTC patients or are referred inside LGTC, so it leads with
 * the in-network outpatient programs in San Jose (PHP, IOP, Virtual IOP, OP).
 * Detox and residential in Palo Alto stay on the page as a quieter "higher
 * level of care" strip. The earlier full-continuum version is kept on the
 * branch lgtc-summit-microsite-full-continuum.
 *
 * Rules: "Summit Estate Recovery Centers" in the footer note and page title,
 * "Summit Estate" elsewhere; no street addresses, licence numbers or clock
 * times; lengths of stay are "typically". No eyebrow labels and no pill chips.
 * Detox and residential are call-only; the assessment / registration link
 * appears only next to outpatient care. Dual diagnosis stays the clinical
 * core: "mental health, substance use, or both", never mental health alone.
 * Never promise 24/7 or instant answers. Colour is never the only signal:
 * every in-network or higher-level marker also carries a text label.
 */
import type { StaticImageData } from 'next/image';
import { settings } from './settings';
import type { FeatureIconName } from '@/components/FeatureIcon';

import heroPhoto from './images/location-san-jose.webp';
import sanJosePhoto from './images/location-san-jose.webp';
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
  where: string;
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
      { href: '#how-we-treat', label: 'How we treat' },
      { href: '#treatment', label: 'What we treat' },
    ],
    cta: { href: '#verify', label: 'Get started' },
  },

  skipLink: 'Skip to programs',

  hero: {
    title: 'More support than weekly appointments,',
    titleAccent: 'without putting your life on hold.',
    text: 'Day treatment, intensive outpatient and individual therapy for mental health and substance use, in San Jose and virtually across California, with one psychiatry-led team.',
    /** One line per outpatient level, then the team. Each pairs the service with its proof point. */
    features: [
      { icon: 'layers', title: 'Partial Hospitalization (PHP)', proof: 'Structured day treatment, home every evening' },
      { icon: 'calendar', title: 'Intensive Outpatient (IOP)', proof: 'Day, evening or virtual, around work, school and family' },
      { icon: 'brain', title: 'Outpatient Therapy (OP)', proof: 'Ongoing individual therapy and medication management' },
      { icon: 'shield', title: 'Board-Certified Team', proof: 'Psychiatry and addiction medicine, in-network with all major plans' },
    ] satisfies { icon: FeatureIconName; title: string; proof: string }[],
    /** Quiet pointer to the higher levels of care; the strip under the programs carries the detail. */
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
    lead: 'PHP, IOP, Virtual IOP and outpatient therapy in San Jose and virtually across California. Wherever you start, the first step is a complimentary, confidential assessment with our integrated clinical team.',
    /** Text label on every outpatient tile. Colour alone never carries this. */
    inNetwork: 'In-network with all major plans',
    items: [
      {
        id: 'php',
        name: 'Partial Hospitalization (PHP)',
        alias: 'Day Treatment',
        where: 'San Jose',
        text: 'Intensive mental health and substance use treatment several hours a day, then home each evening.',
        length: '20+ hours a week, typically 4–6 weeks',
      },
      {
        id: 'iop',
        name: 'Intensive Outpatient (IOP)',
        where: 'San Jose',
        text: 'Structured support around work, school and family, 3–5 days a week. Day or evening groups; most people keep working.',
        length: '9–19 hours a week, typically 8–12 weeks',
      },
      {
        id: 'virtual-iop',
        name: 'Virtual IOP',
        where: 'Anywhere in California',
        text: 'The same structured intensive outpatient care over HIPAA-compliant video, from home.',
      },
      {
        id: 'outpatient',
        name: 'Outpatient (OP)',
        alias: 'Individual Therapy',
        where: 'San Jose or virtual',
        text: 'Ongoing individual therapy and medication management that fit around a full working week.',
        length: '1–9 hours a week, ongoing',
      },
    ] satisfies Level[],
    aliasPrefix: 'Also called',
    /** Detox and residential, kept visible but quiet. Call-only. */
    higher: {
      label: 'Higher level of care · Palo Alto',
      title: 'Need detox or residential first?',
      text: 'Medical detox (typically 7–10 days) and residential treatment (typically 3–4 weeks) on our private Palo Alto estate, when the assessment calls for it. Both start with a call to admissions, and both step down into the outpatient programs above with the same team.',
      network: 'In-network agreements for Palo Alto are in progress; we check your benefits before anything is decided.',
    },
    locationsLabel: 'Where we are',
    location: {
      id: 'san-jose',
      name: 'San Jose outpatient center',
      text: 'PHP, IOP, OP and Virtual IOP, family therapy and a multi-family group, psychiatry-guided medication management and case management. Day, evening and virtual schedules are work-compatible.',
      photo: {
        src: sanJosePhoto,
        alt: 'The San Jose outpatient lounge: leather sofas and armchairs around a wooden coffee table',
      } satisfies Photo,
    },
    /** First of the two assessment prompts; the second is the closing section. */
    notSure: {
      title: 'Not sure which program fits?',
      text: 'A complimentary, confidential assessment sets the right level of care. Request one online and we call you back, or call admissions.',
    },
  },

  /** Day, evening and virtual, so the schedule question is answered before anyone calls. */
  schedule: {
    id: 'schedule',
    title: 'A typical week',
    lead: 'Hours step down as you progress, from PHP to IOP to weekly therapy, with the same team throughout.',
    options: [
      {
        title: 'Day',
        text: 'PHP runs on weekdays, several hours a day, 20 or more hours a week, and you are home every evening. Day IOP groups meet 3–5 days a week.',
      },
      {
        title: 'Evening',
        text: 'IOP after the working day, 3–5 evenings a week, 9–19 hours in total. Most people keep their job, their studies and their routine.',
      },
      {
        title: 'Virtual',
        text: 'IOP and individual therapy over HIPAA-compliant video, anywhere in California. The same groups and the same team as in San Jose.',
      },
    ],
  },

  /** Why an LGTC patient is here: one registration, psychiatry built in, one team across levels. */
  lgtc: {
    id: 'lgtc',
    title: `Part of ${settings.groupName}'s continuum of care`,
    lead: 'Summit Estate runs these programs in partnership with LGTC. Whether you are new to LGTC or already see an LGTC psychiatrist, the path is the same.',
    points: [
      {
        title: 'One registration',
        text: 'Register online or call admissions and you are an LGTC patient. The same admissions team handles every program on this page.',
      },
      {
        title: 'Psychiatry is built in',
        text: 'Psychiatric evaluation and medication management are part of the program, not a separate referral.',
      },
      {
        title: 'Step up or down without starting over',
        text: 'PHP, IOP and therapy share one clinical team, so your plan moves with you. The assessment decides where you begin.',
      },
    ],
  },

  /** Ported from go.summitestate.com/microsite ("How we treat it"), plus the
   * core components carried over from LGTC's own recovery-program page. */
  howWeTreat: {
    id: 'how-we-treat',
    title: 'How we treat',
    coreLabel: 'What every program shares',
    core: [
      {
        title: 'Dual diagnosis focus',
        text: 'Mental health and substance use treated at the same time, by the same team, including the triggers that link them.',
      },
      {
        title: 'Relapse prevention',
        text: 'A personal plan for triggers and high-risk situations, built and rehearsed in group.',
      },
      {
        title: 'CBT and DBT',
        text: 'Skills for emotion regulation, cravings and stress, used at every level of care.',
      },
      {
        title: 'Psychiatric oversight',
        text: 'Evaluation and medication management, adjusted as recovery progresses.',
      },
      {
        title: 'Family alignment',
        text: 'Family therapy and a multi-family group, so the people around you learn the same skills.',
      },
      {
        title: 'Flexible scheduling',
        text: 'Day, evening and virtual options, so work, school and home life keep running.',
      },
    ],
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
  },

  /**
   * Two versions shown one after the other, on purpose, so they can be
   * compared on the live page. Keep one and delete the other once chosen.
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

  gettingStarted: {
    title: 'Getting started is easy',
    steps: [
      {
        title: 'Register or call',
        text: 'Request a confidential assessment online in a few minutes, or talk it through with admissions. Either way you become an LGTC patient and the same team takes it from there.',
      },
      {
        title: 'We verify your benefits',
        text: 'Outpatient care is in-network with all major plans. Costs upfront, with no obligation.',
      },
      {
        title: 'Assessment and consultation',
        text: 'A complimentary, confidential assessment using the ASAM criteria, reviewed by our Clinical Director, sets your level of care. The assessment decides placement, not the program you clicked.',
      },
    ],
  },

  /** Closing prompt: one primary action, phone beside it, higher levels of care one line below. */
  callOrRegister: {
    id: 'verify',
    title: 'Not sure where to start?',
    subtitle: "Let's find the right level of care.",
    text: 'Speak with our integrated psychiatry and addiction medicine team to find the right starting point. Complimentary, confidential assessment and insurance benefits check. No obligation to enroll.',
    higherLevel: 'Need detox or residential care? Those programs start with a call to admissions.',
    smallPrint:
      "All communication is confidential. Please don't include sensitive medical details. A benefits check does not guarantee coverage or payment. If you are in crisis, call or text 988.",
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

  /** Phone bar: Call, plus Get started, which jumps to the closing prompt. */
  mobileBar: { label: 'Call or get started', secondary: { href: '#verify', label: 'Get started' } },
} as const;

export type PageContent = typeof page;
