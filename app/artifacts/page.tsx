import Link from "next/link";
import { artifacts } from "@/data/artifacts";
import ArtifactOrbit from "@/components/ArtifactOrbit";

export default function ArtifactsPage() {
  const sorted = [...artifacts].reverse();

  return (
    <main style={{ padding: "40px 0 80px" }}>
      <div className="page-container">
        {/* header */}
        <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span className="section-label">archive · {artifacts.length} notes</span>
            <h1
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 500,
                fontFamily: "var(--font-serif)",
                color: "var(--text-h1)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              Artifacts
            </h1>
          </div>
          <Link
            href="/"
            style={{
              fontSize: "var(--text-xs)",
              padding: "6px 16px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              color: "var(--text-accent)",
              border: "0.5px solid var(--border)",
            }}
          >
            ← back
          </Link>
        </div>

        {/* orbit field — atmosphere, not the only way to navigate */}
        <div
          style={{
            position: "relative",
            height: "420px",
            background: "var(--bg-surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <ArtifactOrbit artifacts={artifacts} />
        </div>

        {/* plain archive — the real navigation */}
        <div style={{ marginTop: "var(--space-6)" }}>
          {sorted.map((artifact) => (
            <Link key={artifact.id} href={`/artifacts/${artifact.id}`} className="row click-row">
              <div>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <span className="row-date">{artifact.id}</span>
                  <span className="row-title">{artifact.title}</span>
                </div>
                <div className="row-desc" style={{ marginTop: "4px" }}>
                  {artifact.summary}
                </div>
              </div>
              <div className="row-date">{artifact.date}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
