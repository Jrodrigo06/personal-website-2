import Link from "next/link";
import { artifacts } from "@/data/artifacts";
import SectionHeader from "@/components/ui/SectionHeader";

const PREVIEW_COUNT = 3;

export default function ArtifactsTeaser() {
  const recent = [...artifacts].reverse().slice(0, PREVIEW_COUNT);

  return (
    <div style={{ padding: "24px 28px" }}>
      <SectionHeader label="artifacts" />

      <div style={{ marginTop: "8px" }}>
        {recent.map((artifact) => (
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

      <Link
        href="/artifacts"
        style={{
          display: "inline-block",
          marginTop: "12px",
          fontSize: "var(--text-xs)",
          color: "var(--text-accent)",
        }}
      >
        explore artifacts →
      </Link>
    </div>
  );
}
