export interface Experience {
  role: string;
  org: string;
  location?: string;
  oneliner?: string;
  date: string;
  badge?: "current" | "incoming";
}

export const experience: Experience[] = [
  {
    role: "ML Intern",
    location: "Rensselaer",
    org: "Regeneron",
    oneliner: "integrating ML models into a visualization platform for applied analytics",
    date: "Summer 2026",
    badge: "current",
  },
  {
    role: "ML Engineer Co-op",
    org: "MORSE Corp",
    location: "Boston",
    oneliner:
      "Airflow pipelines · high-performance analytical data pipelines · CV evaluation in air-gapped infra · multi-criteria decision modeling",
    date: "Spring 2026",
  },
  {
    role: "OOD Teaching Assistant",
    location: "Boston",
    org: "Northeastern",
    oneliner: 
    "Weekly labs of 40+ students · Java, UML, design patterns · office hours and debugging support",
    date: "Fall 2025",
  },
  {
    role: "ML Research Assistant",
    org: "Boston Children's Hospital",
    location: "Boston",
    oneliner:
      "Automated organoid segmentation · computer vision · OpenCV pipelines",
    date: "Fall 2025",
  },
];

export const leadership: Experience[] = [
  {
    role: "Tech Lead",
    org: "Generate · Northeastern",
    location: "Boston",
    oneliner:
      "Shipped NLP systems for two startups · pgvector semantic search · full-stack ML under real client deadlines",
    date: "Jul 2025–",
    badge: "current",
  },
  {
    role: "AVP of Technical Development",
    location: "Boston",
    org: "Kappa Theta Pi · Northeastern",
    date: "Apr 2026–",
    badge: "current",
  },
];
