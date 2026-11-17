/**
 * All visible copy for the Summit Estate page. Components render what is here
 * and hard-code no copy. Settings (phone, links, group name) live in
 * content/settings.ts.
 *
 * Outpatient-first version (Nov 2026). The page is hosted by LGTC for people
 * who are already LGTC patients or are referred inside LGTC. Order (Sergei,
 * Nov 5 2026): H1, intro, the four feature lines and the summitestate.com
 * link, then the San Jose common-room photo (from go.summitestate.com/outpatient);
 * the badges; Levels of Care as cards (the San Jose card with the lounge
 * photo, the three San Jose cards, then the Palo Alto row with one combined
 * Detox + Residential card); the care-team and who-can-benefit cards;
 * Getting started (steps and the call button); "Where we are" with the two
 * location cards; the footer note (confidentiality line, note, site link).
 * The earlier full-continuum version is kept on the branch
 * lgtc-summit-microsite-full-continuum.
 *
 * Rules: "Summit Estate Recovery Centers" in the footer note and page title,
 * "Summit Estate" elsewhere; no street addresses, licence numbers or clock
 * times; lengths of stay are "typically". No eyebrow labels and no pill chips,
 * except what came from go.summitestate.com (Sergei, Nov 5 2026): the small
 * labels on the two cards, the tag chips on the level cards, and the labels
 * and chips on the two "Where we are" cards.
 * Detox and residential are call-only; the assessment / registration link
 * no longer appears on the page (Sergei, Nov 5 2026). Dual diagnosis stays the clinical
 * core: "mental health, substance use, or both", never mental health alone.
 * Never promise 24/7 or instant answers. Colour is never the only signal:
 * every in-network or higher-level marker also carries a text label.
 * "Complimentary" no longer appears: the band that carried it was deleted on
 * Nov 5 2026.
 */
import type { StaticImageData } from 'next/image';
import { settings } from './settings';
import type { FeatureIconName } from '@/components/FeatureIcon';
import type { LocationIconName } from '@/components/WhereWeAre';

import heroPhoto from './images/hero-san-jose-common-room.webp';
import sanJosePhoto from './images/location-san-jose.webp';
import paloAltoPhoto from './images/hero-palo-alto-estate.webp';
import jointCommissionBadge from './images/badge-joint-commission.png';
import carfBadge from './images/badge-carf.png';
import dhcsBadge from './images/badge-dhcs.png';
import legitScriptBadge from './images/badge-legitscript.png';
import carrier0 from './images/carriers/uhc.svg';
import carrier1 from './images/carriers/optum.svg';
import carrier2 from './images/carriers/aetna.svg';
import carrier3 from './images/carriers/blueshield.svg';
import carrier4 from './images/carriers/anthem.svg';
import carrier5 from './images/carriers/kp.svg';
import carrier6 from './images/carriers/compsych.svg';
import carrier7 from './images/carriers/carelon.svg';
import carrier8 from './images/carriers/magellan.svg';
import carrier9 from './images/carriers/healthnet.svg';
import carrier10 from './images/carriers/alliance.png';
import carrier11 from './images/carriers/vhp.png';
import carrier12 from './images/carriers/cigna.svg';
import carrier13 from './images/carriers/scfhp.png';

export type Photo = { src: StaticImageData; alt: string };
/** A labelled card: small label (kicker), heading and ticked list. */
export type Card = { eyebrow: string; title: string; points: string[] };
/** A card in the comparison set copied from the microsite's Levels of Care. */
/** A level card: tag chip, name, clock line and blurb; its "What to expect" rows are a Level's rows. */
export type LevelCard = { tag: string; name: string; meta: string; blurb: string };
/** A "Where we are" card from go.summitestate.com/outpatient: icon, small label, name, one line and chips. */
export type LocationCard = { icon: LocationIconName; eyebrow: string; title: string; text: string; points: string[] };

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
    title: 'World-class dual-diagnosis care in the heart of Silicon Valley,',
    titleAccent: 'built around your life',
    text: 'Substance use and mental health treated together. Day treatment (PHP), intensive outpatient (IOP) and individual therapy (OP). In San Jose in person and via hybrid IOP',
    /** The team line, then three badges in the style of go.summitestate.com/outpatient
     * (Sergei, Nov 14 2026). The earlier PHP/IOP/OP lines repeated the Levels of Care cards and are gone. */
    features: [
      { icon: 'shield', title: 'Psychiatric oversight, board-certified teams' },
      { icon: 'compass', title: 'Day, evening & hybrid formats for outpatient' },
      { icon: 'briefcase', title: 'Programming built around work and family' },
      { icon: 'heart', title: 'Individualized care' },
    ] as { icon: FeatureIconName; title: string; proof?: string }[],
    insuranceBadge: { label: 'San Jose outpatient center', value: 'Most major insurances' },
    callCard: { title: 'Confidential', note: 'Obligation-free insurance check' },
    photo: {
      src: heroPhoto,
      alt: 'An open common area with sofas, a glass side table with a potted bromeliad, and a kitchenette behind',
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
    /** Sergei, Nov 14 2026: badges are shown without links for now. The hrefs
     * below are kept for future use; set this to true to link them again. */
    linkBadges: false,
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
   * Two cards just above Getting started (Sergei, Nov 5 2026): the team
   * behind the programs first, then who they are for. Copied from the
   * Summit Estate microsite (go.summitestate.com/microsite); role titles are
   * capitalized per the copy rule, the lists are otherwise the microsite's.
   */
  cards: {
    label: 'Who can benefit and your care team',
    items: [
      {
        eyebrow: 'Your care team',
        title: 'A team, not a single clinician.',
        /** Sergei's five lines (Nov 5 2026) in place of the microsite's six. */
        points: [
          'Medical supervision by addictionologists and psychiatric mental health practitioners',
          'Clinical director providing clinical guidance',
          'Individual therapist',
          'Group facilitators',
          'Case manager',
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
    title: 'Levels of care',
    outpatient: {
      items: [
        {
          id: 'php',
          name: 'Partial hospitalization (PHP)',
          rows: [
            ['Intensity', 'More intensive than IOP: a structured day similar to residential care, without the overnight stay.'],
            ['Treatment', 'Group and individual therapy, psychiatry-guided medication management, skill-building and psychoeducation.'],
            ['Suitable for', 'People who need more structure than IOP but not 24-hour medical supervision, including the step down from residential care.'],
          ],
        },
        {
          id: 'iop',
          name: 'Intensive outpatient (IOP)',
          rows: [
            ['Intensity', 'Less intensive than PHP, more than weekly therapy. Most people keep working.'],
            ['Treatment', 'Group therapy is the core, with individual therapy and skill-building sessions. In person, or hybrid with telehealth sessions when clinically appropriate.'],
            ['Suitable for', 'People with a stable home and support system who need more structure than weekly therapy.'],
          ],
        },
        {
          id: 'outpatient',
          name: 'Outpatient (OP)',
          rows: [
            ['Intensity', 'The lightest level of care: sessions that fit around a full working week.'],
            ['Treatment', 'Individual therapy and psychiatry-guided medication management.'],
            ['Suitable for', 'People stepping down from IOP, or whose needs are met by regular individual care.'],
          ],
        },
      ] satisfies Level[],
    },
    higher: {
      items: [
        {
          id: 'detox',
          name: 'Medical detox',
          rows: [
            ['Intensity', 'The highest level of care: medically supervised withdrawal when stopping is not yet safe at home.'],
            ['Treatment', 'Withdrawal management with psychiatric evaluation and medication management; mental health and substance use treated together from the first day.'],
            ['Suitable for', 'People who need medical support to stop safely before residential or outpatient treatment can begin.'],
          ],
        },
        {
          id: 'residential',
          name: 'Residential treatment',
          rows: [
            ['Intensity', 'Live-in treatment with structure and support around the clock, when home is not yet the right place to recover.'],
            ['Treatment', 'Individual and group therapy with psychiatry-guided medication management: medically integrated, personalized mental health and substance use disorder care in a private, comfortable setting.'],
            ['Suitable for', 'People stepping down from medical detox, or who need more than a day program can give, before continuing in the San Jose programs with the same team.'],
          ],
        },
      ] satisfies Level[],
      /** Sergei's approved wording (Nov 4 2026); shown under the two tiles. */
      /** Info card over the estate photo, like the hero badge over the San
       * Jose photo (Sergei, Nov 5 2026, his wording). */
      badge: {
        label: 'Detox and residential',
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
      outpatientTitle: 'Summit Estate Recovery \u2013 Outpatient',
      /** The San Jose card from the live page (go.summitestate.com/lgtc-summit-microsite),
       * placed above the three cards (Sergei, Nov 5 2026): the lounge photo,
       * the heading above as its name, and the live page's description. */
      outpatientCard: {
        text: 'PHP, IOP and OP, family therapy and a multi-family group, psychiatry-guided medication management and case management. Day and evening schedules are work-compatible, with hybrid IOP when clinically appropriate.',
        photo: {
          src: sanJosePhoto,
          alt: 'The San Jose outpatient lounge: leather sofas and armchairs around a wooden coffee table',
        } satisfies Photo,
      },
      /** "We Accept Most Major Insurances" block from go.summitestate.com/outpatient-backup
       * (Sergei, Nov 14 2026, preview comment on the San Jose card): same title,
       * carriers, order and logo files as that page. */
      insurance: {
        title: 'We accept most major insurances',
        carriers: [
          { name: 'UnitedHealthcare', logo: carrier0, width: 564, height: 177 },
          { name: 'Optum', logo: carrier1, width: 708, height: 205 },
          { name: 'Aetna', logo: carrier2, width: 186, height: 36 },
          { name: 'Blue Shield of California', logo: carrier3, width: 600, height: 232 },
          { name: 'Anthem Blue Cross', logo: carrier4, width: 605, height: 216 },
          { name: 'Kaiser Permanente', logo: carrier5, width: 486, height: 55 },
          { name: 'ComPsych', logo: carrier6, width: 1184, height: 208 },
          { name: 'Carelon Behavioral Health', logo: carrier7, width: 597, height: 154 },
          { name: 'Magellan Health', logo: carrier8, width: 600, height: 219 },
          { name: 'Health Net', logo: carrier9, width: 652, height: 311 },
          { name: 'Central California Alliance for Health', logo: carrier10, width: 561, height: 561 },
          { name: 'Valley Health Plan', logo: carrier11, width: 1203, height: 215 },
          { name: 'Cigna', logo: carrier12, width: 750, height: 246 },
          { name: 'Santa Clara Family Health Plan', logo: carrier13, width: 840, height: 215 },
        ] satisfies { name: string; logo: StaticImageData; width: number; height: number }[],
      },
      higherTitle: 'Higher level of care \u00b7 Palo Alto',
      expectLabel: 'What to expect',
      cards: {
        php: {
          tag: 'PHP',
          name: 'Partial hospitalization program',
          meta: '20+ hrs/week \u00b7 typically 4\u20136 weeks',
          blurb: 'Also called day treatment. Structured treatment most weekdays, home every evening: the highest level of outpatient care.',
        },
        iop: {
          tag: 'IOP',
          name: 'Intensive outpatient program',
          meta: '9\u201319 hrs/week \u00b7 typically 8\u201312 weeks',
          blurb: 'Day, evening or hybrid IOP (in person and telehealth). Structured clinical care that fits around work, school and family.',
        },
        outpatient: {
          tag: 'OP',
          name: 'Outpatient therapy program (OP)',
          meta: 'From one session a week \u00b7 for as long as it is useful',
          blurb: 'Also called individual therapy. Ongoing individual therapy and medication management for people who are stable and want to stay on track.',
        },
      } as Record<string, LevelCard>,
      combined: {
        tag: 'DTX / RTC',
        name: 'Detox & residential',
        meta: 'Detox typically 7\u201310 days \u00b7 residential typically 3\u20134 weeks',
        blurb: 'Medically supervised detox and residential treatment on the private Palo Alto estate, for when recovery is not yet safe at home.',
      } satisfies LevelCard,
      /** Not shown since Nov 14 2026 (Sergei removed the card); kept for later use. */
      notSure: {
        title: 'Not sure what you need?',
        text: 'The level of care is set after an assessment with a therapist and a review by our clinical director. One call starts it, and admissions can check what your insurance covers.',
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
        /** Two lines (Sergei, Nov 5 2026): outpatient, then Palo Alto on its own line. */
        text: 'Outpatient care is in-network with all major plans. Costs upfront, with no obligation.\nDetox and residential care in Palo Alto: PPO policies accepted, in-network agreements in progress, and single case agreement possible.',
      },
      {
        title: 'Assessment and consultation',
        text: 'A confidential assessment using the ASAM criteria, reviewed by our clinical director, sets your level of care: PHP, IOP or therapy, with psychiatric evaluation in conjunction with medication management.',
      },
    ],
  },

  actions: {
    /** The visible label; the number follows it. */
    callPrefix: 'Call',
    /** LGTC's online registration form, framed as the assessment request. Not shown since Nov 5 2026 (Sergei removed the button from the closing section); kept for the RegisterButton. */
    register: 'Request a confidential assessment',
    /** Jan's preferred click-through (Nov 5 2026): the quiet text link in the hero. */
    siteLink: 'Learn more about Summit Estate at summitestate.com',
  },

  /** The very bottom of the page, under "Where we are" (Sergei, Nov 5 2026): the confidentiality line, the note and the link. */
  footerNote: {
    smallPrint: "All communication is confidential. Please don't include sensitive medical details. If you are in crisis, call or text 988.",
    text: `Summit Estate Recovery Centers. Dual-diagnosis care for adults, a collaborative partnership under the guidance and oversight of ${settings.groupName}.`,
    fullSiteLink: 'Explore the full Summit Estate site',
  },

  /**
   * "Where we are" from go.summitestate.com/outpatient (Sergei, Nov 5 2026),
   * after Getting started. Copy as on that page, with three changes:
   * capitalization per the house rule, no "Virtual IOP anywhere in
   * California" (this page names telehealth only as part of Hybrid IOP), and
   * no "Adults 28+" (Sergei, Nov 5 2026).
   */
  whereWeAre: {
    eyebrow: 'Where we are',
    title: 'In the heart of Silicon Valley.',
    items: [
      {
        icon: 'pin',
        eyebrow: 'San Jose',
        title: 'Summit Estate Recovery \u2013 Outpatient',
        text: 'West San Jose, a mile from Cupertino and Saratoga.',
        points: ['PHP', 'IOP', 'OP', 'Hybrid IOP'],
      },
      {
        icon: 'home',
        /** The source card says "Adults 28+" here and in the text; Sergei removed both (Nov 5 2026). */
        eyebrow: 'Palo Alto',
        title: 'Summit Estate Recovery \u2013 Palo Alto Residential Detox',
        text: "Silicon Valley's finest rehab: detox and residential care on a private estate in the rolling hills.",
        points: ['Detox & residential'],
      },
    ] satisfies LocationCard[],
  },

  /** Phone bar: Call, plus Get started, which jumps to the closing section. */
  mobileBar: { label: 'Call or get started', secondary: { href: '#verify', label: 'Get started' } },
} as const;

export type PageContent = typeof page;
