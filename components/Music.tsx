"use client";

const waveBars = [0, 1, 2, 3, 4, 5];

const records = [
  { artist: "Radiohead", bg: "var(--vinyl-bg)", active: true },
  { artist: "Frank Ocean", bg: "var(--bg-card)", active: false },
  { artist: "Four Tet", bg: "var(--bg-hover)", active: false },
  { artist: "Burial", bg: "var(--bg-surface)", active: false },
  { artist: "Aphex Twin", bg: "var(--border-em)", active: false },
];

function Vinyl({
  size,
  bg,
  active,
}: {
  size: number;
  bg: string;
  active?: boolean;
}) {
  const inner = Math.round(size * 0.7);
  const hole = Math.round(size * 0.2);
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: bg,
        border: "2px solid var(--vinyl-ring)",
        boxShadow: active
          ? "0 0 0 1px var(--text-accent), 0 0 6px var(--vinyl-ring)"
          : undefined,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: `${inner}px`,
          height: `${inner}px`,
          borderRadius: "50%",
          border: "0.5px solid var(--border-em)",
        }}
      >
        <div
          style={{
            width: `${hole}px`,
            height: `${hole}px`,
            borderRadius: "50%",
            background: "var(--bg)",
          }}
        />
      </div>
    </div>
  );
}

export default function Music() {
  return (
    <div style={{ padding: "24px 28px" }}>
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

      {/* block */}
      <div
        style={{
          marginTop: "12px",
          background: "var(--bg-surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          padding: "18px",
        }}
      >
        {/* now playing row */}
        <div
          className="flex items-center"
          style={{ gap: "12px", marginBottom: "16px" }}
        >
          <Vinyl size={40} bg="var(--vinyl-bg)" />

          <div className="flex-1">
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-h2)",
              }}
            >
              How to Disappear Completely
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-ghost)" }}>
              Radiohead · Kid A
            </div>
          </div>

          {/* waveform */}
          <div className="flex items-end" style={{ gap: "2px", height: "20px" }}>
            {waveBars.map((i) => (
              <span
                key={i}
                style={{
                  width: "2px",
                  height: "20px",
                  background: "var(--wave)",
                  borderRadius: "1px",
                  transformOrigin: "bottom",
                  animation: `wave ${0.8 + (i % 3) * 0.25}s ease-in-out ${
                    i * 0.12
                  }s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* progress bar */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "var(--border-sub)",
            borderRadius: "1px",
          }}
        >
          <div
            style={{
              width: "34%",
              height: "100%",
              background: "var(--progress-fill)",
              borderRadius: "1px",
            }}
          />
        </div>
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "4px", marginBottom: "14px" }}
        >
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            2:18
          </span>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            5:56
          </span>
        </div>

        {/* artist shelf */}
        <div className="flex" style={{ gap: "12px" }}>
          {records.map((record) => (
            <div
              key={record.artist}
              className="flex flex-col items-center"
              style={{ gap: "6px" }}
            >
              <Vinyl size={38} bg={record.bg} active={record.active} />
              <span style={{ fontSize: "9px", color: "var(--text-ghost)" }}>
                {record.artist}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
