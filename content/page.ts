/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Outpatient-first version (Nov 2026). The page is hosted by LGTC for people
 * who are already LGTC patients or are referred inside LGTC. Order (Sergei,
 * Nov 5 2026): H1, the care-team and who-can-benefit cards, the San Jose
 * photo, then the intro, the four feature lines and the summitestate.com
 * link; the badges; Levels of Care as cards (San Jose row, then the Palo Alto
 * row with one combined Detox + Residential card); Getting started. The
 * earlier full-continuum version is kept on the branch
 * lgtc-summit-microsite-full-continuum.
 *
 * Rules: "Summit Estate Recovery Centers" in the footer note and page title,
 * "Summit Estate" elsewhere; no street addresses, licence numbers or clock
 * times; lengths of stay are "typically". No eyebrow labels and no pill chips,
 * except what came from go.summitestate.com/microsite (Sergei, Nov 5 2026):
 * the small labels on the two cards and the tag chips on the level cards.
 * Detox and residential are call-only; the assessment / registration link
 * appears only next to outpatient care. Dual diagnosis stays the clinical
 * core: "mental health, substance use, or both", never mental health alone.
 * Never promise 24/7 or instant answers. Colour is never the only signal:
 * every in-network or higher-level marker also carries a text label.
 * "Complimentary" no longer appears: the band that carried it was deleted on
 * Nov 5 2026.
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
/** A level card: tag chip, name, clock line and blurb; its "What to expect" rows are a Level's rows. */
export type LevelCard = { tag: string; name: string; meta: string; blurb: string };

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
  },

  skipLink: 'Skip to programs',

  hero: {
    /** No punctuation inside or at the end of the H1 (Sergei, Nov 5 2026). */
    title: 'The right level of care',
    titleAccent: 'without putting your life on hold',
    text: 'Day Treatment (PHP), Intensive Outpatient (IOP) and Individual Therapy for Mental Health and Substance Use Disorder Care, in person in San Jose, with one Psychiatry-led team.',
    /** One line per outpatient level, then the team. Each pairs the service with its proof point. */
    features: [
      { icon: 'layers', title: 'Partial Hospitalization (PHP)', proof: 'Structured Day Treatment, home every evening' },
      { icon: 'calendar', title: 'Intensive Outpatient (IOP)', proof: 'Day, evening or Hybrid IOP (In person and telehealth), around work, school and family' },
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
   * Two cards between the H1 and the hero photo (Sergei, Nov 5 2026): the
   * team behind the programs first, then who they are for. Copied from the
   * Summit Estate microsite (go.summitestate.com/microsite); role titles are
   * capitalized per the copy rule, the lists are otherwise the microsite's.
   */
  cards: {
    label: 'Who can benefit and your care team',
    items: [
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
    ] satisfies Card[],
  },

  /**
   * Levels of Care: one title and the level cards. `outpatient.items` and
   * `higher.items` hold the Intensity / Treatment / Suitable for rows that
   * open under "What to expect"; `cards` holds the rest. Detox and residential
   * are call-only.
   */
  levels: {
    id: 'programs',
    title: 'Levels of Care',
    outpatient: {
      items: [
        {
          id: 'php',
          name: 'Partial Hospitalization (PHP)',
          rows: [
            ['Intensity', 'More intensive than IOP: a structured day similar to Residential Care, without the overnight stay.'],
            ['Treatment', 'Group and Individual Therapy, Psychiatry-guided Medication Management, skill-building and psychoeducation.'],
            ['Suitable for', 'People who need more structure than IOP but not 24-hour medical supervision, including the step down from Residential Care.'],
          ],
        },
        {
          id: 'iop',
          name: 'Intensive Outpatient (IOP)',
          rows: [
            ['Intensity', 'Less intensive than PHP, more than weekly therapy. Most people keep working.'],
            ['Treatment', 'Group Therapy is the core, with Individual Therapy and skill-building sessions. In person, or hybrid with telehealth sessions when clinically appropriate.'],
            ['Suitable for', 'People with a stable home and support system who need more structure than weekly therapy.'],
          ],
        },
        {
          id: 'outpatient',
          name: 'Outpatient (OP)',
          rows: [
            ['Intensity', 'The lightest level of care: sessions that fit around a full working week.'],
            ['Treatment', 'Individual Therapy and Psychiatry-guided Medication Management.'],
            ['Suitable for', 'People stepping down from IOP, or whose needs are met by regular individual care.'],
          ],
        },
      ] satisfies Level[],
    },
    higher: {
      items: [
        {
          id: 'detox',
          name: 'Medical Detox',
          rows: [
            ['Intensity', 'The highest level of care: Medically supervised withdrawal when stopping is not yet safe at home.'],
            ['Treatment', 'Withdrawal management with psychiatric evaluation and Medication Management; Mental Health and Substance Use treated together from the first day.'],
            ['Suitable for', 'People who need medical support to stop safely before Residential or Outpatient treatment can begin.'],
          ],
        },
        {
          id: 'residential',
          name: 'Residential Treatment',
          rows: [
            ['Intensity', 'Live-in treatment with structure and support around the clock, when home is not yet the right place to recover.'],
            ['Treatment', 'Individual and Group Therapy with Psychiatry-guided Medication Management: Medically Integrated, personalized Mental Health and Substance Use Disorder Care in a private, comfortable setting.'],
            ['Suitable for', 'People stepping down from Medical Detox, or who need more than a day program can give, before continuing in the San Jose programs with the same team.'],
          ],
        },
      ] satisfies Level[],
      /** Sergei's approved wording (Nov 4 2026); shown under the two tiles. */
      /** Info card over the estate photo, like the hero badge over the San
       * Jose photo (Sergei, Nov 5 2026, his wording). */
      badge: {
        label: 'Detox and Residential',
        value: 'Most major PPO policies accepted',
        note: 'In-network agreements are in progress and expected in 2027',
      },
      photo: {
        src: paloAltoPhoto,
        alt: 'A two-storey Mediterranean-style house above a landscaped garden with a stone fountain and patio chairs',
      } satisfies Photo,
    },
    /** First of the two assessment prompts; the second is the closing section. The call comes first. */
    /**
     * The level cards (Sergei's brief of Nov 5 2026, adopted the same night):
     * the microsite's card format with this page's headings and positions.
     * Top row: the three San Jose programs; bottom row: the estate photo with
     * its info card, one combined Detox + Residential card and the "Not sure"
     * card. Time commitment sits right under the name as a clock line;
     * Intensity, Treatment and Suitable for (`outpatient.items` and
     * `higher.items` above) open under "What to expect". Only name, tag, clock
     * line and blurb live here.
     */
    cards: {
      outpatientTitle: 'San Jose Outpatient Center, a mile from Cupertino and Saratoga',
      higherTitle: 'Higher Level of Care \u00b7 Palo Alto',
      expectLabel: 'What to expect',
      cards: {
        php: {
          tag: 'PHP',
          name: 'Partial Hospitalization Program',
          meta: '20+ hrs/week \u00b7 typically 4\u20136 weeks',
          blurb: 'Also called Day Treatment. Structured treatment most weekdays, home every evening: the highest level of Outpatient Care.',
        },
        iop: {
          tag: 'IOP',
          name: 'Intensive Outpatient Program',
          meta: '9\u201319 hrs/week \u00b7 typically 8\u201312 weeks',
          blurb: 'Day, evening or Hybrid IOP (In person and telehealth). Structured clinical care that fits around work, school and family.',
        },
        outpatient: {
          tag: 'OP',
          name: 'Outpatient Program',
          meta: 'From one session a week \u00b7 for as long as it is useful',
          blurb: 'Also called Individual Therapy. Ongoing Individual Therapy and Medication Management for people who are stable and want to stay on track.',
        },
      } as Record<string, LevelCard>,
      combined: {
        tag: 'Palo Alto',
        name: 'Detox & Residential',
        meta: 'Detox typically 7\u201310 days \u00b7 Residential typically 3\u20134 weeks',
        blurb: 'Medically supervised Detox and Residential Treatment on the private Palo Alto estate, for when recovery is not yet safe at home.',
      } satisfies LevelCard,
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
