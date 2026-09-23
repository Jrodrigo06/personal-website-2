import Image from "next/image";
import { getTopTracks } from "@/lib/spotify";
import SectionHeader from "@/components/ui/SectionHeader";

export default async function Music() {
  const tracks = await getTopTracks(5);

  return (
    <div style={{ padding: "24px 0" }}>
      <SectionHeader label="music" />

      {/* collapsed row that expands to reveal the track list */}
      <details className="music-details" style={{ marginTop: "10px" }}>
        <summary
          className="music-summary flex items-center justify-between"
          style={{
            cursor: "pointer",
            background: "var(--bg-surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "10px",
            padding: "10px 14px",
          }}
        >
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-body)" }}>
            Top 5 · last 4 weeks
          </span>
          <span className="flex items-center" style={{ gap: "8px" }}>
            <span style={{ fontSize: "var(--text-2xs)", color: "var(--text-ghost)" }}>
              via Spotify
            </span>
            <svg
              className="music-chevron"
              width="10"
              height="10"
              viewBox="0 0 16 16"
              aria-hidden
              style={{ flexShrink: 0, color: "var(--text-ghost)" }}
            >
              <path
                d="M5 3l6 5-6 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>

        {/* card */}
        <div
          style={{
            marginTop: "8px",
            background: "var(--bg-surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "10px",
            padding: "8px",
          }}
        >
          {tracks.length === 0 ? (
            <div
              style={{
                padding: "20px 14px",
                fontSize: "var(--text-xs)",
                color: "var(--text-body)",
              }}
            >
              couldn&apos;t load Spotify right now.
            </div>
          ) : (
            tracks.map((track, i) => (
              <a
                key={track.id}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="music-row flex items-center"
                style={{
                  gap: "14px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  borderTop:
                    i === 0 ? "none" : "0.5px solid var(--border-sub)",
                }}
              >
                {/* rank */}
                <span
                  style={{
                    fontSize: "var(--text-2xs)",
                    fontFamily: "monospace",
                    color: "var(--text-ghost)",
                    flexShrink: 0,
                    width: "14px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* album cover */}
                <span
                  style={{
                    position: "relative",
                    width: "48px",
                    height: "48px",
                    flexShrink: 0,
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--bg-card)",
                    border: "0.5px solid var(--border)",
                  }}
                >
                  {track.albumImageUrl ? (
                    <Image
                      src={track.albumImageUrl}
                      alt={track.album}
                      width={48}
                      height={48}
                      sizes="48px"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : null}
                </span>

                {/* track info */}
                <span className="flex-1" style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--text-h2)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.name}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "var(--text-xs)",
                      color: "var(--text-body)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.artist} · {track.album}
                  </span>
                </span>

                {/* open-in-Spotify glyph */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  aria-hidden
                  style={{ flexShrink: 0, color: "var(--text-accent)" }}
                >
                  <path
                    d="M6 3h7v7M13 3 4 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))
          )}
        </div>
      </details>
    </div>
  );
}
