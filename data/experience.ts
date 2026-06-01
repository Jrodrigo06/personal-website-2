export interface Experience {
  role: string
  org: string
  location?: string
  oneliner: string
  date: string
  badge?: 'current' | 'incoming'
}

export const experience: Experience[] = [
  {
    role: 'ML Engineer Co-op',
    org: 'MORSE Corp',
    location: 'Boston',
    oneliner: 'Airflow pipelines · DuckDB/Parquet analytics · CV evaluation in air-gapped infra · TOPSIS decision modeling',
    date: '2025–26',
    badge: 'current',
  },
  {
    role: 'Tech Lead',
    org: 'Generate · Northeastern',
    oneliner: 'Leading 8-person team · Unsprawl (shipped) · Remetra RAG pipeline',
    date: '2024–',
    badge: 'current',
  },
  {
    role: 'ML Research Assistant',
    org: 'Boston Children\'s Hospital',
    oneliner: 'Automated organoid segmentation · computer vision · OpenCV pipelines',
    date: '2024',
  },
  {
    role: 'ML Intern',
    org: 'Regeneron',
    oneliner: 'Incoming summer 2026',
    date: 'Summer 2026',
    badge: 'incoming',
  },
]
