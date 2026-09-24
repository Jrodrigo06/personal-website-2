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
    role: "AI Engineering Intern",
    location: "Rensselaer",
    org: "Regeneron",
    oneliner: "LangGraph · SQL · React · Plotly · scikit-learn · RAG · REST APIs · Scientific Data Systems",
    date: "Summer 2026",
  },
  {
    role: "Software Engineering Co-op",
    org: "MORSE Corp",
    location: "Boston",
    oneliner: "Docker · Polars · Airflow · MinIO / S3 · DuckDB · SQL · FastAPI · ML Infrastructure",
    date: "Spring 2026",
  },
  {
    role: "ML Research Intern",
    org: "Boston Children's Hospital",
    location: "Boston",
    oneliner: "OpenCV · Image Segmentation · Statistical Analysis · PCA · Biomedical Imaging",
    date: "Fall 2025",
  },
];

export interface OrgRole {
  role: string;
  date: string;
  oneliner: string;
  current?: boolean;
}

export interface OrgGroup {
  org: string;
  location?: string;
  dateRange: string;
  badge?: "current";
  roles: OrgRole[]; // most recent first
}

export const generate: OrgGroup = {
  org: "Generate Product Development Studio",
  location: "Northeastern · Boston",
  dateRange: "Jul 2025 — Present",
  badge: "current",
  roles: [
    {
      role: "Data Project Lead — Foresight",
      date: "Jul 2026 — Present",
      current: true,
      oneliner: "Forecasting · Recommendation Systems · Feature Engineering · Applied ML · Product Development",
    },
    {
      role: "Data Tech Lead — Remetra",
      date: "Dec 2025 — Jun 2026",
      oneliner: "FastAPI · pgvector · Sentence Transformers · Gemini · Fisher's Exact Test",
    },
    {
      role: "Data Tech Lead — Unsprawl",
      date: "Jul 2025 — Dec 2025",
      oneliner: "SBERT · pgvector · LLM Evaluation · FastAPI · Semantic Retrieval",
    },
  ],
};

export const leadership: Experience[] = [
  {
    role: "AVP of Technical Development",
    location: "Boston",
    org: "Kappa Theta Pi · Northeastern",
    date: "Apr 2026–",
    badge: "current",
  },
  {
    role: "Co-op Teaching Assistant",
    org: "Northeastern",
    location: "Boston",
    oneliner: "Resume Review · Interview Prep · Application Strategy · Student Mentorship",
    date: "Fall 2026",
    badge: "current",
  },
  {
    role: "Object-Oriented Design Teaching Assistant",
    location: "Boston",
    org: "Northeastern",
    oneliner: "Java · Object-Oriented Design · Design Patterns · Debugging · Weekly Labs",
    date: "Fall 2025",
  },
];
