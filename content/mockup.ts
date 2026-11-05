/**
 * MOCK-UP BLOCKS (temporary). Sections adapted from LGTC's own pages,
 * rendered on the page inside a thin dashed frame, each next to the section
 * it would join or replace, so Sergei can judge them in place. Of the six,
 * four are decided (Nov 4 2026): 1 "Our treatment philosophy" is now a real
 * section in content/page.ts, 3 "Structure without isolation" was folded into
 * the program tiles, 2 "Curated curriculum" and 4 "Core components" were
 * dropped. Numbers 5 and 6 stay here, with their original numbers, until
 * Sergei decides. Source:
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
