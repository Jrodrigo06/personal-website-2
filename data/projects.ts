export interface Project {
  num: string;
  name: string;
  desc: string;
  detail?: string;
  tags: string[];
  link?: string;
  status?: "shipped" | "in progress";
}

export const projects: Project[] = [
  {
    num: "01",
    name: "Unsprawl",
    desc: "AI duplicate task detection across Slack, Jira, and Trello. Built and shipped to real clients at Generate.",
    detail:
      "Duplicate task detection across project management tools. Built a semantic similarity pipeline with SBERT embeddings, pgvector HNSW indexing, and OAuth integrations across Slack, Jira, and Trello. Deployed to DigitalOcean under real client deadlines.",
    tags: ["SBERT", "pgvector", "FastAPI", "OAuth 2.0", "DigitalOcean"],
    status: "shipped",
  },
  {
    num: "02",
    name: "Remetra RAG pipeline",
    desc: "Full RAG pipeline for autoimmune symptom tracking — food tagging, Apriori correlation, Gemini LLM.",
    detail:
      "Autoimmune symptom tracking app with a full RAG pipeline. Built food tagging, an Apriori correlation layer for surfacing symptom patterns, and a Gemini-powered structured output system. Shipped to the client.",
    tags: ["Gemini", "pgvector", "Django", "sentence-transformers"],
    status: "shipped",
  },
  {
    num: "03",
    name: "Blackjack RL",
    desc: "DQN agent trained to play Blackjack in a custom Gymnasium environment, with an accompanying paper on Deep Q-Learning.",
    detail:
      "DQN agent trained to play Blackjack in a custom Gymnasium environment using experience replay and epsilon-greedy exploration. Wrote an accompanying paper on the mathematical foundations of Deep Q-Learning.",
    tags: ["DQN", "Gymnasium", "PyTorch", "Reinforcement Learning"],
  },
  {
    num: "04",
    name: "GraphDTA reimplementation",
    desc: "Reimplementation of GraphDTA for drug-target binding affinity prediction with graph neural networks.",
    detail:
      "Reimplementation of GraphDTA for drug-target binding affinity prediction using PyTorch Geometric and graph neural networks. Wrote a paper on the implementation and the math behind GNNs applied to molecular data.",
    tags: ["PyTorch Geometric", "GNN", "PyTorch"],
  },
  {
    num: "05",
    name: "RAG nutrition recommender",
    desc: "Web app that answers nutrition questions using RAG over health research documents.",
    detail:
      "Web app that answers nutrition questions using RAG over health research documents. Semantic chunking, Llama 2 for generation, ChromaDB for vector storage, FastAPI backend, React frontend, Docker deployment.",
    tags: ["RAG", "Llama 2", "ChromaDB", "FastAPI", "React", "Docker"],
  },
];
