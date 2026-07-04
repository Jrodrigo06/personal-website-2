import type { StaticImageData } from "next/image";

import unsprawl1 from "@/public/unsprawl1.png";
import unsprawl2 from "@/public/unsprawl2.png";
import blackjackrl1 from "@/public/blackjackrl1.png";
import blackjackrl2 from "@/public/blackjackrl2.png";
import graphdta1 from "@/public/graphdta1.png";
import graphdta2 from "@/public/graphdta2.png";

export interface Project {
  num: string;
  name: string;
  desc: string;
  detail?: string;
  demo?: string; // optional live-demo URL
  previews?: StaticImageData[]; // optional preview images shown in the modal
  tags: string[];
  link?: string;
  status?: "shipped" | "in progress" | "paper";
  date?: string; // human-readable timeframe, e.g. "Sep – Dec 2025"
}

export const projects: Project[] = [
  {
    num: "01",
    name: "Unsprawl",
    desc: "AI duplicate task detection across Slack, Jira, and Trello.",
    detail:
      "Led development at Generate for a client-commissioned AI task management platform. Engineers were losing work to duplicate tasks scattered across Slack, Jira, and Trello — Unsprawl consolidates them and uses semantic similarity to surface and deduplicate across all three. Led the technical implementation: SBERT embeddings, pgvector with HNSW indexing, OAuth 2.0 integrations, and a full duplicate detection engine. Shipped to the client. The design doc covers architecture, database schema, auth flows, integration pipelines, and the detection engine.",
    tags: ["SBERT", "pgvector", "FastAPI", "OAuth 2.0", "DigitalOcean"],
    link: "https://github.com/GenerateNU/unsprawl",
    status: "shipped",
    date: "Sep – Dec 2025",
    previews: [unsprawl1, unsprawl2],
  },
  {
    num: "02",
    name: "Remetra",
    desc: "Remetra is a mobile health app for autoimmune patients — log food and symptoms, surface statistically significant correlations",
    tags: ["Gemini", "pgvector", "Django", "sentence-transformers"],
    status: "shipped",
    date: "Jan – Apr 2026",
  },
  {
    num: "03",
    name: "Blackjack RL",
    desc: "DQN agent trained to play Blackjack in a custom Gymnasium environment, with an accompanying paper on Deep Q-Learning.",
    detail:
      "Implemented a Deep Q-Network agent in a custom Gymnasium environment. The interesting problem was whether a neural network could learn Blackjack's optimal strategy through trial and error alone. Wrote an accompanying paper examining the mathematical foundations of DQNs and why they work for this problem.",
    tags: ["DQN", "Gymnasium", "PyTorch", "Reinforcement Learning"],
    link: "https://github.com/Jrodrigo06/BlackJackOpenCV",
    date: "Mar 2026",
    previews: [blackjackrl1, blackjackrl2],
  },
  {
    num: "04",
    name: "GraphDTA reimplementation",
    desc: "Reimplementation of GraphDTA for drug-target binding affinity prediction with graph neural networks.",
    detail:
      "Reimplementation of the GraphDTA architecture for predicting drug-target binding affinity — a core problem in drug discovery. Used PyTorch Geometric to represent molecular structure as a graph. Wrote a paper on the implementation and the math behind graph neural networks applied to molecular data.",
    tags: ["PyTorch Geometric", "GNN", "PyTorch"],
    link: "https://github.com/Jrodrigo06/GraphDTA-Replication",
    date: "Aug 2025",
    previews: [graphdta1, graphdta2],
  },
  {
    num: "05",
    name: "RAG nutrition recommender",
    desc: "Web app that answers nutrition questions using RAG over health research documents.",
    detail:
      "Built a RAG pipeline over nutrition research documents with semantic chunking, Llama 2 for generation, and ChromaDB for vector storage. React frontend, FastAPI backend, Docker deployment.",
    tags: ["RAG", "Llama 2", "ChromaDB", "FastAPI", "React", "Docker"],
    link: "https://github.com/Jrodrigo06/llm-health-recommender",
    date: "Jun 2025",
  },
];
