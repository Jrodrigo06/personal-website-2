export interface Writing {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  pdf: string;
  type: "paper" | "design doc";
}

export const writing: Writing[] = [
  {
    title: "Unsprawl",
    subtitle: "Technical Design Document",
    description:
      "System architecture, embedding pipeline design, database schema, auth flows, integration pipelines, and deployment for an AI-powered task deduplication platform.",
    date: "2025",
    pdf: "/unsprawl.pdf",
    type: "design doc",
  },
  {
    title: "Blackjack RL",
    subtitle: "Deep Q-Learning Paper",
    description:
      "Mathematical foundations of Deep Q-Networks applied to optimal Blackjack strategy. Covers DQN architecture, experience replay, and why neural networks work for this problem.",
    date: "2025",
    pdf: "/blackjackrl.pdf",
    type: "paper",
  },
  {
    title: "GraphDTA Reimplementation",
    subtitle: "Graph Neural Networks Paper",
    description:
      "Reimplementation of GraphDTA for drug-target binding affinity prediction. Covers the math behind GNNs applied to molecular graph representations.",
    date: "2025",
    pdf: "/graphdta.pdf",
    type: "paper",
  },
];
