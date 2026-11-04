/**
 * MOCK-UP ONLY (not part of the page). Sections adapted from LGTC's own
 * pages for Sergei to review, rendered at /mockup/. Sources:
 *   1. lgtcgroup.com/services/mental-health-programs ("Our Treatment Philosophy")
 *   2. lgtcgroup.com/day-programs ("A Curated Curriculum of Healing Modalities",
 *      "Structure Without Isolation")
 *   3. lgtcgroup.com/services/mental-health-and-substance-use-recovery-program
 *      ("Core Components of Recovery", "Who Can Benefit", "Getting Started is Easy")
 * Adapted to this page's rules: adults, mental health and substance use
 * together, PHP / IOP (in person or hybrid) / OP, Summit's hours, no clock
 * times. Lines marked `check` are LGTC claims to confirm before they go live.
 */

export type MockSection = {
  id: string;
  /** Where on the page this would sit, and what it would replace. */
  placement: string;
  source: string;
  title: string;
  lead: string;
  /** LGTC claims carried over that need a yes from Sergei or Jan. */
  check?: string[];
};

export const mockup = {
  pageTitle: 'Mock-up: LGTC sections, adapted',
  intro:
    'Six blocks from LGTC’s own pages, rewritten for this page: adults, mental health and substance use together, PHP, IOP (in person or hybrid) and OP, Summit’s hours. Each block says where it would sit. Comment on any of them.',

  philosophy: {
    id: 'philosophy',
    placement: 'Would sit after the Outpatient programs section, in place of the removed “How we treat” cards.',
    source: 'From lgtcgroup.com/services/mental-health-programs, “Our Treatment Philosophy”.',
    title: 'Our treatment philosophy',
    lead: 'We built these programs around four principles, each grounded in clinical evidence.',
    check: [
      '“We track symptoms weekly with validated measures”: confirm this is how the San Jose program runs.',
      'LGTC lists CBT, DBT and ACT; this page’s therapy list has no ACT, so the line says CBT, DBT and mindfulness-based relapse prevention.',
      'Alumni: Summit’s outpatient page offers tune-ups to all alumni; confirm that holds for LGTC-registered patients.',
    ],
    items: [
      {
        title: 'Intensity that matches need',
        text: 'Some challenges cannot be resolved in one hour a week. PHP and IOP provide the concentrated, structured treatment that moderate-to-severe symptoms require, at the level clinical necessity calls for, and step you down as you stabilize.',
      },
      {
        title: 'Proven therapies, practiced daily',
        text: 'Every group is grounded in trauma-informed care and the evidence base: CBT, DBT and mindfulness-based relapse prevention, so a skill learned in the morning is safe to practice in real life the same day.',
      },
      {
        title: 'Progress you can see',
        text: 'We track symptoms weekly with validated measures and adjust your treatment plan on data, not guesswork.',
      },
      {
        title: 'Families heal together',
        text: 'Caregivers are part of treatment, not spectators. Weekly family therapy and a multi-family group mean the people around you learn the same skills at the same time, and alumni tune-ups keep the door open after treatment.',
      },
    ],
  } satisfies MockSection & { items: { title: string; text: string }[] },

  curriculum: {
    id: 'curriculum',
    placement: 'Would sit inside “Mental health and substance use, together”, above the Therapies and Group topics lists (or in place of them).',
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

  structure: {
    id: 'structure',
    placement: 'Would replace “A typical week”.',
    source: 'From lgtcgroup.com/day-programs, “Structure Without Isolation”, with Summit’s weekly hours.',
    title: 'Structure without isolation',
    lead: 'PHP and IOP bridge the gap between weekly therapy and residential care. One multidisciplinary team treats mental health and substance use together while you sleep in your own bed.',
    check: [
      'PHP is shown as 5 days a week; LGTC’s page says 5–7 days and 6–8 hours a day. Confirm the San Jose schedule.',
    ],
    programs: [
      {
        title: 'Partial Hospitalization (PHP)',
        meta: '5 days a week · about 6 hours a day',
        rows: [
          ['Time commitment', '20 or more hours a week, typically 4–6 weeks.'],
          ['Living arrangement', 'You live at home and spend most of the day with the program.'],
          ['Intensity', 'More intensive than IOP: a structured day similar to residential care, without the overnight stay.'],
          ['Treatment', 'Group and individual therapy, psychiatry-guided medication management, skill-building and psychoeducation.'],
          ['Suitable for', 'People who need more structure than IOP but not 24-hour medical supervision, including the step down from residential care.'],
        ],
      },
      {
        title: 'Intensive Outpatient (IOP)',
        meta: '3–5 days a week · 3-hour blocks, day or evening',
        rows: [
          ['Time commitment', '9–19 hours a week, typically 8–12 weeks.'],
          ['Living arrangement', 'You live at home and come in for sessions: in person, or hybrid with virtual sessions when clinically appropriate.'],
          ['Intensity', 'Less intensive than PHP, more than weekly therapy. Most people keep working.'],
          ['Treatment', 'Group therapy is the core, with individual therapy and skill-building sessions.'],
          ['Suitable for', 'People with a stable home and support system who need more structure than weekly therapy.'],
        ],
      },
    ],
    after: 'After IOP: outpatient therapy, 1–9 hours a week, ongoing, in person or virtual.',
  } satisfies MockSection & { programs: { title: string; meta: string; rows: [string, string][] }[]; after: string },

  core: {
    id: 'core',
    placement: 'Optional. Covers the same ground as the two blocks above in LGTC’s original wording; pick this or those, not both.',
    source: 'From lgtcgroup.com/services/mental-health-and-substance-use-recovery-program, “Core Components of Recovery”.',
    title: 'Core components of recovery',
    lead: 'We combine clinical psychology, addiction science and medical support into one path.',
    items: [
      { title: 'Dual diagnosis focus', text: 'Simultaneous treatment for mental health conditions and substance use, to address the triggers where they intersect.' },
      { title: 'Relapse prevention', text: 'A structured, personal roadmap to identify triggers, navigate high-risk situations and maintain stability.' },
      { title: 'CBT and DBT integration', text: 'Evidence-based skills to regulate intense emotions, manage cravings and resolve stressors productively.' },
      { title: 'Psychiatric oversight', text: 'Dedicated evaluations and medication management for people in active recovery.' },
      { title: 'Relational healing', text: 'Family alignment and therapy support groups to repair relationships and build a strong recovery ecosystem.' },
      { title: 'Flexible scheduling', text: 'Day, evening and hybrid options, so you can transition back to work or home life smoothly.' },
    ],
  } satisfies MockSection & { items: { title: string; text: string }[] },

  benefit: {
    id: 'benefit',
    placement: 'Would be “Who it is for”, Version C (LGTC’s original list; Version A on the preview was built from it).',
    source: 'From lgtcgroup.com/services/mental-health-and-substance-use-recovery-program, “Who Can Benefit From This Program?”.',
    title: 'Who can benefit',
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
    placement: 'Would be the three steps of the merged closing section (edit 8), in LGTC’s own process wording.',
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
