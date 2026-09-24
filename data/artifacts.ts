export interface Artifact {
  id: string; // "A-001" — stable, never reused or reordered
  title: string;
  date: string; // human-readable, e.g. "Mar 2026"
  summary: string; // one sentence, used in list rows
  body: string[]; // paragraphs, shown on the artifact's own page
}

// Order is chronological, oldest first — A-001 is the oldest note, ids climb
// as you add newer ones. Homepage/archive listings reverse this for display
// (newest first); prev/next on an artifact page walks this same array order.
export const artifacts: Artifact[] = [
  {
    id: "A-001",
    title: "Technical Communication",
    date: "Oct 2025",
    summary: "Making complex technical work easier for other people to understand and contribute to.",
    body: [
      "Generate taught me how much technical work depends on communication. Being able to break something complex into something digestible helps clients, teammates, and newer members understand what is being built and why.",
      "I've come to see clear communication as part of the technical work itself, not something separate from it.",
    ],
  },
  {
    id: "A-002",
    title: "Iterative Development",
    date: "Mar 2026",
    summary: "Why I prefer small changes, short feedback loops, and steady progress.",
    body: [
      "I believe in building iteratively. Small, testable changes make progress easier to measure and mistakes easier to catch.",
      "MORSE taught me to prefer shorter feedback loops over large refactors, and that has shaped how I approach software since.",
    ],
  },
  {
    id: "A-003",
    title: "Decision Velocity",
    date: "Apr 2026",
    summary: "Making reversible decisions quickly enough to keep moving.",
    body: [
      "I've learned not to overthink reversible decisions. If I have enough information to make a reasonable choice, I'd rather move, test it, and adjust than spend too long searching for the perfect answer.",
      "Iterative development made me much more comfortable with that, because most early decisions do not have to be permanent.",
    ],
  },
  {
    id: "A-004",
    title: "Keeping the North Star",
    date: "Feb 2026",
    summary: "Staying focused on the main goal while still leaving room to explore.",
    body: [
      "At Regeneron, I learned how easy it is to get pulled into new ideas and lose sight of the main goal. I've become much more deliberate about asking whether what I'm building actually moves the project forward.",
      "That matters even more now that faster coding tools make it easy to build more than is actually useful.",
    ],
  },
];
