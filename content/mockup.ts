/**
 * MOCK-UP BLOCKS (temporary). Sections adapted from LGTC's own pages,
 * rendered on the page inside a thin dashed frame, each next to the section
 * it would join or replace, so Sergei can judge them in place. Of the six,
 * three are decided (Nov 4 2026): 1 "Our treatment philosophy" is now a real
 * section in content/page.ts, 3 "Structure without isolation" was folded into
 * the program tiles, 4 "Core components" was dropped. Numbers 2, 5 and 6 stay
 * here, with their original numbers, until Sergei decides. Sources:
 *   2. lgtcgroup.com/day-programs ("A Curated Curriculum of Healing Modalities")
 *   5, 6. lgtcgroup.com/services/mental-health-and-substance-use-recovery-program
 *      ("Who Can Benefit", "Getting Started is Easy")
 * Adapted to this page's rules: adults, mental health and substance use
 * together, PHP / IOP (in person or hybrid) / OP, Summit's hours, no clock
 * times. Lines under `check` are LGTC claims to confirm before a block is
 * made permanent; they are not rendered. Once the blocks are chosen, move
 * their text into content/page.ts and delete this file, components/Mockups.tsx
 * and the <Mock…/> uses in app/summit-estate/page.tsx.
 */

export type MockSection = {
  id: string;
  /** Where on the page this sits, and what it would replace. Shown in the frame label. */
  placement: string;
  source: string;
  title: string;
  lead: string;
  /** LGTC claims carried over that need a yes from Sergei or Jan. Not rendered. */
  check?: string[];
};

export const mockup = {
  frameLabel: 'Mock-up',

  curriculum: {
    id: 'curriculum',
    placement: 'Sits inside “Mental health and substance use, together”, above the Therapies and Group topics lists (or in place of them).',
    source: 'From lgtcgroup.com/day-programs, “A Curated Curriculum of Healing Modalities”.',
    title: 'A curated curriculum of healing modalities',
    lead: 'Healing does not happen in a vacuum. Our day programs blend a multi-disciplinary clinical approach with real interpersonal connection.',
    check: [
      'LGTC names yoga; this page’s list has breathwork, art and music therapy and no yoga. Add yoga only if San Jose runs it.',
      '“Medication-assisted treatment when indicated” is added from the old hero line (MAT); cut it if you would rather not name MAT here.',
    ],
    items: [
      {
        title: 'Psychiatric oversight',
        text: 'Weekly or bi-weekly medication management and clinical assessment by board-certified psychiatrists, including medication-assisted treatment when indicated.',
      },
      {
        title: 'Group synergy',
        text: 'Skill-building and process groups built on Cognitive Behavioral and Dialectical Behavior frameworks, with relapse prevention woven through.',
      },
      {
        title: 'Mind-body integration',
        text: 'Mindfulness, breathwork, and art and music therapy, to work with what stress and trauma leave in the body.',
      },
    ],
  } satisfies MockSection & { items: { title: string; text: string }[] },

  benefit: {
    id: 'benefit',
    placement: 'Version C of “Who it is for”: LGTC’s original list, which Version A was built from.',
    source: 'From lgtcgroup.com/services/mental-health-and-substance-use-recovery-program, “Who Can Benefit From This Program?”.',
    title: 'Version C',
    lead: 'Adults seeking structured support to manage substance use alongside mood instability, anxiety or traumatic stress, in a safe, respectful environment to rebuild life goals.',
    items: [
      'Co-occurring mood disorders',
      'Active substance use recovery',
      'History of relapse',
      'Stress or trauma triggers',
      'Seeking structured sobriety support',
      'Desiring peer group connection',
    ],
  } satisfies MockSection & { items: string[] },

  start: {
    id: 'start',
    placement: 'Would replace the three steps of “Getting started is easy”, below, with LGTC’s own process wording.',
    source: 'From lgtcgroup.com/services/mental-health-and-substance-use-recovery-program, “Getting Started is Easy”.',
    title: 'Getting started is easy',
    lead: 'A structured, predictable onboarding, so you know what happens at every step.',
    steps: [
      { title: 'Register online', text: 'Answer a brief questionnaire about your physical and mental health history and goals. It takes about five minutes.' },
      { title: 'Phone intake', text: 'Our admissions coordinator calls you to verify your insurance coverage and schedule your initial consultation.' },
      { title: 'Initial consultation', text: 'Meet our integrated clinical team to build your customized treatment roadmap.' },
    ],
  } satisfies MockSection & { steps: { title: string; text: string }[] },
} as const;
