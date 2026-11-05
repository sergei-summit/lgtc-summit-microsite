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
 * lgtc-summit-microsite-full-continuum.
 *
 * Rules: "Summit Estate Recovery Centers" in the footer note and page title,
 * "Summit Estate" elsewhere; no street addresses, licence numbers or clock
 * times; lengths of stay are "typically". No eyebrow labels and no pill chips,
 * except the two cards copied from go.summitestate.com/microsite (Sergei,
 * Nov 5 2026), which keep their small labels.
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
export type Card = { eyebrow: string; title: string; points: string[] };
/** A card in the comparison set copied from the microsite's Levels of Care. */
export type CompareCard = { name: string; short: string; blurb: string; meta: string; expect: string[] };

export type Level = {
  id: string;
  name: string;
  /** Approved alias, shown as "Also called …". */
  alias?: string;
  /** Labelled rows, from LGTC's "Structure Without Isolation" block: time commitment, intensity, treatment, who it suits. */
  rows: [string, string][];
};

export type Badge =
  /** An accreditation image that links to the accreditor's own listing or lookup for Summit Estate. */
  | { kind: 'image'; src: StaticImageData; alt: string; href: string }
  | { kind: 'google'; label: string; rating: number };

export const page = {
  subBar: {
    logoLabel: 'Summit Estate',
    navLabel: 'Summit Estate',
    links: [
      { href: '#programs', label: 'Levels of care' },
    ],
    cta: { href: '#verify', label: 'Get started' },
  },

  skipLink: 'Skip to programs',

  hero: {
    /** No punctuation inside or at the end of the H1 (Sergei, Nov 5 2026). */
    title: 'The right level of care',
    titleAccent: 'without putting your life on hold',
    text: 'Day Treatment (PHP), Intensive Outpatient (IOP) and Individual Therapy for Mental Health and Substance Use Disorder Care, in person in San Jose, with one Psychiatry-led team.',
    /** Second line under the intro; moved here from the San Jose block on Nov 5 2026. */
    schedule: 'Day and evening schedules are work-compatible, with hybrid IOP (in person and telehealth) when clinically appropriate.',
    /** One line per outpatient level, then the team. Each pairs the service with its proof point. */
    features: [
      { icon: 'layers', title: 'Partial Hospitalization (PHP)', proof: 'Structured Day Treatment, home every evening' },
      { icon: 'calendar', title: 'Intensive Outpatient (IOP)', proof: 'Day, evening or hybrid, around work, school and family' },
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

  /**
   * Each accreditation badge links to the accreditor's page for Summit Estate
   * (Sergei, Nov 5 2026); the Google reviews chip does not link. Links open in
   * a new tab. Sources: The Joint Commission provider locator entry for
   * "Summit Estate Recovery Centers LLC"; CARF provider 413635 (the San Jose
   * outpatient programs: PHP, IOP, OP, three-year accreditation); DHCS's
   * GeoHub map of SUD recovery treatment facilities, opened on the San Jose
   * center (link supplied by Sergei, Nov 5 2026; DHCS has no per-provider
   * page); LegitScript's website-certification lookup for summitestate.com.
   */
  trust: {
    label: 'Accreditations and reviews',
    newTab: 'opens in a new tab',
    badges: [
      {
        kind: 'image',
        src: jointCommissionBadge,
        alt: 'The Joint Commission Gold Seal of Approval',
        href: 'https://www.jointcommission.org/en-us/accreditation/behavioral-health-care-and-human-services/provider-locator/596075/612069',
      },
      { kind: 'image', src: carfBadge, alt: 'CARF Accredited', href: 'https://carf.org/provider/summit-estate-recovery-413635/' },
      {
        kind: 'image',
        src: dhcsBadge,
        alt: 'California Department of Health Care Services (DHCS) Certified',
        href: 'https://geohub-cadhcs.hub.arcgis.com/datasets/CADHCS::sud-recovery-treatment-facilities/explore?location=37.301953%2C-122.023584%2C15',
      },
      {
        kind: 'image',
        src: legitScriptBadge,
        alt: 'LegitScript Certified',
        href: 'https://www.legitscript.com/websites/?checker_keywords=summitestate.com',
      },
      { kind: 'google', label: 'Google reviews', rating: 4.5 },
    ] satisfies Badge[],
  },

  /**
   * Two cards under the badge strip, copied from the Summit Estate microsite
   * (go.summitestate.com/microsite) at Sergei's request, Nov 5 2026: who the
   * programs are for, and the team behind them. Role titles are capitalized
   * per the copy rule; the lists are otherwise the microsite's.
   */
  cards: {
    label: 'Who can benefit and your care team',
    items: [
      {
        eyebrow: 'Who can benefit',
        title: 'Adults who need support for both.',
        points: [
          'Anxiety, depression or other mood conditions alongside substance use',
          'Active substance use, or early recovery',
          'A history of relapse',
          'Stress or trauma triggers',
          'Wanting structured support to stay sober',
          'Wanting a peer group going through the same thing',
        ],
      },
      {
        eyebrow: 'Your care team',
        title: 'A team, not a single clinician.',
        points: [
          'Medical Director providing psychiatric oversight',
          'Clinical Director providing clinical guidance',
          'Supervision by an Addictionologist and Psychiatric Mental Health Practitioners',
          'Individual Therapist',
          'Group Facilitators',
          'Case Manager',
        ],
      },
    ] satisfies Card[],
  },

  /**
   * Levels of Care: two groups under one title, each headed with its place.
   * Outpatient (San Jose): three tiles. Higher Level of Care (Palo Alto): the
   * estate photo beside two tiles of the same shape, Medical Detox and
   * Residential Treatment, with the insurance note beneath them. All tiles are
   * in LGTC's format (labelled rows, no hours line, no links). Detox and
   * residential are call-only.
   */
  levels: {
    id: 'programs',
    title: 'Levels of Care',
    aliasPrefix: 'Also called',
    outpatient: {
      title: 'Outpatient Programs · San Jose Outpatient Center, a mile from Cupertino and Saratoga',
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
            ['Treatment', 'Group Therapy is the core, with Individual Therapy and skill-building sessions. In person, or hybrid with telehealth sessions when clinically appropriate.'],
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
            ['Treatment', 'Individual Therapy and Psychiatry-guided Medication Management.'],
            ['Suitable for', 'People stepping down from IOP, or whose needs are met by regular individual care.'],
          ],
        },
      ] satisfies Level[],
    },
    higher: {
      title: 'Higher Level of Care · Palo Alto',
      items: [
        {
          id: 'detox',
          name: 'Medical Detox',
          rows: [
            ['Time commitment', 'Typically 7–10 days, with 24-hour care on the private Palo Alto estate.'],
            ['Intensity', 'The highest level of care: Medically supervised withdrawal when stopping is not yet safe at home.'],
            ['Treatment', 'Withdrawal management with psychiatric evaluation and Medication Management; Mental Health and Substance Use treated together from the first day.'],
            ['Suitable for', 'People who need medical support to stop safely before Residential or Outpatient treatment can begin.'],
          ],
        },
        {
          id: 'residential',
          name: 'Residential Treatment',
          rows: [
            ['Time commitment', 'Typically 3–4 weeks, living on the private Palo Alto estate.'],
            ['Intensity', 'Live-in treatment with structure and support around the clock, when home is not yet the right place to recover.'],
            ['Treatment', 'Individual and Group Therapy with Psychiatry-guided Medication Management: Medically Integrated, personalized Mental Health and Substance Use Disorder Care in a private, comfortable setting.'],
            ['Suitable for', 'People stepping down from Medical Detox, or who need more than a day program can give, before continuing in the San Jose programs with the same team.'],
          ],
        },
      ] satisfies Level[],
      /** Sergei's approved wording (Nov 4 2026); shown under the two tiles. */
      networkLabel: 'Insurance:',
      network:
        'In-network agreements for Detox and Residential in Palo Alto are in progress and expected in 2027; today they are out of network, and a single case agreement may be possible. We check your benefits before anything is decided.',
      photo: {
        src: paloAltoPhoto,
        alt: 'A two-storey Mediterranean-style house above a landscaped garden with a stone fountain and patio chairs',
      } satisfies Photo,
    },
    /** First of the two assessment prompts; the second is the closing section. The call comes first. */
    notSure: {
      title: 'Not sure which level of care fits?',
      text: 'A complimentary, confidential assessment sets the right level of care. Call admissions, or request one online and we call you back.',
    },
    /**
     * For comparison only (Sergei, Nov 5 2026): the card set from
     * go.summitestate.com/microsite, in a dashed frame under the tiles so he
     * and Jan can judge the two formats side by side. The copy is the
     * microsite's, verbatim, except the phone number, which is LGTC's. If this
     * format is chosen, the copy still needs this page's rules applied (no
     * statewide telehealth claim, no hours lines, capitalization).
     */
    compare: {
      title: 'For comparison: the card set from go.summitestate.com/microsite',
      note: 'Shown here only so the two formats can be judged side by side. The copy is the microsite\u2019s, the phone number is LGTC\u2019s.',
      expectLabel: 'What to expect',
      cards: [
        {
          name: 'Detox & Residential',
          short: 'Palo Alto',
          blurb: 'Medically supervised detox and residential treatment at a private estate in Palo Alto, for when recovery is not yet safe at home.',
          meta: 'Detox 7\u201310 days \u00b7 residential 3\u20134 weeks',
          expect: [
            'Medical detox, then residential treatment on a private estate.',
            'Substance use and mental health treated together from day one.',
            'Step down into PHP or IOP in San Jose afterwards.',
          ],
        },
        {
          name: 'Partial Hospitalization',
          short: 'PHP',
          blurb: 'Structured day treatment, most weekdays. The highest level of outpatient care, ideal when stepping down from inpatient or needing intensive daily support.',
          meta: '20+ hrs/week \u00b7 typically 4\u20136 weeks',
          expect: [
            'Several hours a day, most weekdays, then home each evening.',
            'Group and Individual Therapy, a psychiatric evaluation with psychiatry-guided support as clinically indicated, and peer support.',
            'Often a step down from residential treatment, or a step up when IOP is not enough.',
            'Some people take leave or reduce their work schedule for these weeks.',
            'Case management and personalized recovery planning, based on clinical necessity.',
            'We accept most major insurances.',
          ],
        },
        {
          name: 'Intensive Outpatient',
          short: 'IOP',
          blurb: 'Flexible scheduling: day, evening or virtual. Maintain work and family life while receiving structured clinical care 3\u20135 days a week.',
          meta: '9\u201319 hrs/week \u00b7 typically 8\u201312 weeks',
          expect: [
            'Three-hour blocks, 3\u20135 days a week.',
            'Group and Individual Therapy, with psychiatry-guided support as clinically indicated.',
            'Most people keep working full- or part-time.',
            'Case management and personalized recovery planning, based on clinical necessity.',
            'We accept most major insurances.',
          ],
        },
        {
          name: 'Virtual IOP',
          short: 'Telehealth',
          blurb: 'Outpatient treatment over HIPAA-compliant Zoom for Healthcare, from anywhere in California.',
          meta: 'Statewide in California',
          expect: [
            'Sessions with California-licensed staff on Zoom for Healthcare, which is HIPAA compliant.',
            'Group and individual sessions.',
            'Drug and alcohol testing through Quest Diagnostics.',
          ],
        },
        {
          name: 'Outpatient',
          short: 'OP',
          blurb: 'Routine therapy for people who are stable and want to keep their recovery on track.',
          meta: '1\u20139 hrs/week \u00b7 ongoing',
          expect: [
            'Usually the next step after IOP.',
            'Individual Therapy, in person or virtual.',
            'Fits around a full working week.',
            'Recovery coaching, continuing care planning and long-term recovery support.',
            'After treatment, tune-ups are available to all alumni.',
          ],
        },
      ] satisfies CompareCard[],
      notSure: {
        title: 'Not sure what you need?',
        text: 'The level of care is set after an assessment with a therapist and a review by our Clinical Director. One call starts it, and admissions can check what your insurance covers.',
      },
    },
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
    lead: 'One registration and one team for the right level of care',
    steps: [
      {
        title: 'Call or register',
        text: 'Call admissions, or request a confidential assessment online in a few minutes. Either way the same team handles every level of care on this page.',
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
    /** Jan's preferred click-through (Nov 5 2026): a quiet text link under the button pairs. */
    siteLink: 'Learn more about Summit Estate at summitestate.com',
  },

  footerNote: {
    text: `Summit Estate Recovery Centers. Dual-diagnosis care for adults, a collaborative partnership under the guidance and oversight of ${settings.groupName}.`,
    fullSiteLink: 'Explore the full Summit Estate site',
  },

  /** Phone bar: Call, plus Get started, which jumps to the closing section. */
  mobileBar: { label: 'Call or get started', secondary: { href: '#verify', label: 'Get started' } },
} as const;

export type PageContent = typeof page;
