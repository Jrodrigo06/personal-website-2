export interface Project {
  num: string
  name: string
  desc: string
  tags: string[]
  link?: string
  status?: 'shipped' | 'in progress'
}

export const projects: Project[] = [
  {
    num: '01',
    name: 'Unsprawl',
    desc: 'AI duplicate task detection across Slack, Jira, and Trello. Built and shipped to real clients at Generate.',
    tags: ['SBERT', 'pgvector', 'FastAPI', 'OAuth 2.0', 'DigitalOcean'],
    status: 'shipped',
  },
  {
    num: '02',
    name: 'Remetra RAG pipeline',
    desc: 'Full RAG pipeline for autoimmune symptom tracking — food tagging, Apriori correlation, Gemini LLM.',
    tags: ['Gemini', 'pgvector', 'Django', 'sentence-transformers'],
    status: 'in progress',
  },
  {
    num: '03',
    name: 'Audio recommender',
    desc: 'Music similarity via CLAP embeddings and UMAP visualization. Spotify playlist as input.',
    tags: ['CLAP', 'UMAP', 'yt-dlp', 'Spotify API'],
    status: 'in progress',
  },
  {
    num: '04',
    name: 'CV analytics platform',
    desc: 'ndjson → Parquet → MinIO pipeline with DuckDB analytics. TOPSIS model comparison across 70+ models.',
    tags: ['DuckDB', 'Airflow', 'MinIO', 'TOPSIS'],
  },
]
