/**
 * MOCK-UP BLOCKS (temporary). Sections adapted from LGTC's own pages,
 * rendered on the page inside a thin dashed frame, each next to the section
 * it would join or replace, so Sergei can judge them in place. Of the six,
 * five are decided (Nov 4–5 2026): 3 "Structure without isolation" was folded
 * into the program tiles; 1 "Our treatment philosophy" became a real section
 * and was then removed with it; 2 "Curated curriculum", 4 "Core components"
 * and 5 "Who can benefit" were dropped. Number 6 stays here, with its original
 * number, until Sergei decides. Source:
 *   6. lgtcgroup.com/services/mental-health-and-substance-use-recovery-program
 *      ("Getting Started is Easy")
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

  start: {
    id: 'start',
    placement: 'Would replace the three steps of “Getting started is easy”, below, with LGTC’s own process wording.',
    source: 'From lgtcgroup.com/services/mental-health-and-substance-use-recovery-program, “Getting Started is Easy”.',
    title: 'Getting started is easy',
    lead: 'A structured, predictable onboarding, so you know what happens at every step.',
    steps: [
      { title: 'Register online', text: 'Answer a brief questionnaire about your physical and Mental Health history and goals. It takes about five minutes.' },
      { title: 'Phone intake', text: 'Our admissions coordinator calls you to verify your insurance coverage and schedule your initial consultation.' },
      { title: 'Initial consultation', text: 'Meet our integrated clinical team to build your customized treatment roadmap.' },
    ],
  } satisfies MockSection & { steps: { title: string; text: string }[] },
} as const;
