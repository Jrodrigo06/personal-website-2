import Link from "next/link";
import { notFound } from "next/navigation";
import { artifacts } from "@/data/artifacts";
import { getOrbitParams } from "@/lib/orbit";

export function generateStaticParams() {
  return artifacts.map((artifact) => ({ id: artifact.id }));
}

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = artifacts.findIndex((a) => a.id === id);
  if (index === -1) notFound();

  const artifact = artifacts[index];
  const prev = index > 0 ? artifacts[index - 1] : null;
  const next = index < artifacts.length - 1 ? artifacts[index + 1] : null;

  // This artifact's own trajectory, shown as a small static (non-animated)
  // fragment behind the header — the same math as the /artifacts field, just
  // one ellipse, cropped, and frozen. Decoration only, not interactive.
  const { rx, ry, rotateDeg, centerX, centerY } = getOrbitParams(index);

  return (
    <main style={{ padding: "40px 0 80px" }}>
      <div className="page-container prose">
        <Link
          href="/artifacts"
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--text-dim)",
          }}
        >
          ← all artifacts
        </Link>

        {/* header with a single static orbit-fragment accent */}
        <div
          style={{
            position: "relative",
            marginTop: "16px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "0.5px solid var(--border-sub)",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              opacity: 0.6,
              transform: `rotate(${rotateDeg}deg)`,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: `calc(50% + ${centerY}px)`,
                left: `calc(50% + ${centerX}px)`,
                width: `${rx * 2}px`,
                height: `${ry * 2}px`,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: "0.5px dashed var(--border-sub)",
              }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="flex items-center" style={{ gap: "8px" }}>
              <span
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: 500,
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-h1)",
                  letterSpacing: "-0.025em",
                }}
              >
                {artifact.title}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: "8px", marginTop: "10px" }}>
              <span className="row-date">{artifact.id}</span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-ghost)" }}>
                {artifact.date}
              </span>
            </div>
          </div>
        </div>

        {/* body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {artifact.body.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-body)",
                lineHeight: 1.8,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* prev/next — plain accessible links, no orbital interaction required */}
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: "var(--space-7)",
            paddingTop: "16px",
            borderTop: "0.5px solid var(--border-sub)",
          }}
        >
          {prev ? (
            <Link
              href={`/artifacts/${prev.id}`}
              style={{ fontSize: "var(--text-xs)", color: "var(--text-accent)" }}
            >
              ‹ {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/artifacts/${next.id}`}
              style={{ fontSize: "var(--text-xs)", color: "var(--text-accent)" }}
            >
              {next.title} ›
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
