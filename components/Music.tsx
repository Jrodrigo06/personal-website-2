import Image from "next/image";
import { getTopTracks } from "@/lib/spotify";

export default async function Music() {
  const tracks = await getTopTracks(5);

  return (
    <div style={{ padding: "24px 0" }}>
      {/* section header */}
      <div className="flex items-center" style={{ gap: "12px" }}>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-ghost)",
          }}
        >
          music
        </span>
        <span
          className="flex-1"
          style={{ height: "0.5px", background: "var(--border)" }}
        />
      </div>

      {/* sub-label */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: "10px" }}
      >
        <span style={{ fontSize: "11px", color: "var(--text-body)" }}>
          Top 5 · last 4 weeks
        </span>
        <span style={{ fontSize: "10px", color: "var(--text-ghost)" }}>
          via Spotify
        </span>
      </div>

      {/* card */}
      <div
        style={{
          marginTop: "12px",
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
              fontSize: "11px",
              color: "var(--text-dim)",
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
                  fontSize: "10px",
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
                    fontSize: "13px",
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
                    fontSize: "11px",
                    color: "var(--text-ghost)",
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
    </div>
  );
}
