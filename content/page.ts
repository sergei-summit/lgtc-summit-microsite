/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Source: sergei-summit/Summit-Landing-Pages, Astro/src/lib/microsite.ts and
 * Astro/src/lib/outpatient-auragen.ts (go.summitestate.com/microsite), cut to
 * the LGTC hand-over spec. Rules: "Summit Estate Recovery Centers" in the hero
 * and footer note, "Summit Estate" elsewhere; "psychiatry-guided", never
 * "psychiatry" alone, as a Summit service; no street addresses, licence
 * numbers or clock times; lengths of stay are "typically".
 */
import type { StaticImageData } from 'next/image';
import { settings } from './settings';

import heroPhoto from './images/hero-palo-alto-estate.webp';
import paloAltoPhoto from './images/location-palo-alto.webp';
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
    brand: 'Summit Estate Recovery Centers',
    eyebrow: 'Integrated recovery · Dual diagnosis · Psychiatric Oversight',
    title: 'Mental health and substance use, treated together.',
    text: 'One clinical team across the full path: from Medical Detoxification and Stabilization, through Residential Care, Day Treatment & Intensive Outpatient, to Individual Therapy.',
    pills: ['Confidential', 'Obligation-free insurance check'],
    photo: {
      src: heroPhoto,
      alt: 'A two-storey Mediterranean-style house above a landscaped garden with a stone fountain and patio chairs',
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
    insurance: 'We accept most major insurances',
  },

  levels: {
    id: 'programs',
    title: 'Levels of care',
    lead: 'Wherever you start, the first step is a psychiatric evaluation and integrated assessment, with rapid psychiatric and addictionology team evaluations at intake and continued psychiatry-guided medication management at every level.',
    intro: 'You can enter at any level, and many people step down from one to the next.',
    items: [
      {
        id: 'detox',
        name: 'Medical Detox',
        where: 'Palo Alto',
        text: 'Medically supervised withdrawal when stopping is not yet safe at home. Starts with a call.',
        length: 'Typically 7–10 days',
      },
      {
        id: 'residential',
        name: 'Residential',
        where: 'Palo Alto',
        text: 'Live-in treatment on a private estate. Starts with a call.',
        length: 'Typically 3–4 weeks',
      },
      {
        id: 'php',
        name: 'Partial Hospitalization (PHP)',
        alias: 'Day Treatment',
        where: 'San Jose',
        text: 'Structured treatment several hours a day, then home each evening.',
        length: '20+ hours a week, typically 4–6 weeks',
      },
      {
        id: 'iop',
        name: 'Intensive Outpatient (IOP)',
        where: 'San Jose',
        text: 'Day or evening care, 3–5 days a week. Most people keep working.',
        length: '9–19 hours a week, typically 8–12 weeks',
      },
      {
        id: 'virtual-iop',
        name: 'Virtual IOP',
        where: 'Anywhere in California',
        text: 'Intensive outpatient care over HIPAA-compliant video.',
      },
      {
        id: 'outpatient',
        name: 'Outpatient (OP)',
        alias: 'Individual Therapy',
        where: 'San Jose or virtual',
        text: 'Ongoing therapy that fits around a full working week.',
        length: '1–9 hours a week, ongoing',
      },
    ] satisfies Level[],
    aliasPrefix: 'Also called',
    locationsLabel: 'Where we are',
    locations: [
      {
        id: 'palo-alto',
        name: 'Palo Alto',
        text: 'Medical detox and residential treatment on a private estate.',
        photo: {
          src: paloAltoPhoto,
          alt: 'The Palo Alto estate: a two-storey Mediterranean-style house above a sloping lawn with sun loungers and mature trees',
        } satisfies Photo,
      },
      {
        id: 'san-jose',
        name: 'San Jose',
        text: `A comprehensive outpatient program (PHP, IOP, OP and Virtual IOP), family therapy and a multi-family group, psychiatry-guided medication management and case management, under psychiatric guidance from the psychiatrists of ${settings.groupName}.`,
        photo: {
          src: sanJosePhoto,
          alt: 'The San Jose outpatient lounge: leather sofas and armchairs around a wooden coffee table',
        } satisfies Photo,
      },
    ],
    notSure: {
      title: 'Not sure what you need?',
      text: 'An assessment sets the right level of care. One call starts it.',
    },
  },

  treatment: {
    id: 'treatment',
    eyebrow: 'What we treat',
    title: 'Substance use and mental health, together.',
    intro: 'Dual diagnosis is the program, not an add-on.',
    groups: [
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
      { label: 'Mental health', items: ['Anxiety', 'Depression', 'Trauma', 'PTSD / PTSI'] },
    ],
  },

  whoFor: {
    title: 'Who it is for',
    intro: 'Adults who need support for both.',
    items: [
      'Anxiety, depression or other mood conditions alongside substance use',
      'Active substance use, or early recovery',
      'A history of relapse',
      'Stress or trauma triggers',
      'Wanting structured support to stay sober',
      'Wanting a peer group going through the same thing',
    ],
  },

  gettingStarted: {
    title: 'Getting started is easy',
    steps: [
      {
        title: 'You call',
        text: 'Talk it through with admissions. Detox and residential start with a call; for outpatient care you can also register online.',
      },
      {
        title: 'We verify your benefits',
        text: 'In-network with Blue Shield of California, and most major insurances accepted. Costs upfront, with no obligation.',
      },
      {
        title: 'Initial consultation',
        text: 'An assessment with a therapist and a review by our Clinical Director set your level of care.',
      },
    ],
  },

  callOrRegister: {
    id: 'verify',
    title: 'Call or register',
    subtitle: 'We can help you find the right program.',
    text: 'All communication is confidential.',
    smallPrint: "Please don't include sensitive medical details. If you are in crisis, call or text 988.",
  },

  actions: {
    /** The visible label; the number follows it. */
    callPrefix: 'Call',
    register: 'Register online, we call you back',
    registerShort: 'Register',
  },

  footerNote: {
    text: `Summit Estate Recovery Centers. Dual-diagnosis care for adults, a collaborative partnership under the guidance and oversight of ${settings.groupName}.`,
    fullSiteLink: 'Explore the full Summit Estate site',
  },

  mobileBar: { label: 'Call or register' },
} as const;

export type PageContent = typeof page;
