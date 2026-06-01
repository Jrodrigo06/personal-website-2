export default function Hero() {
  return (
    <header
      className="relative"
      style={{
        padding: "52px 28px 44px",
        borderBottom: "0.5px solid var(--border-sub)",
      }}
    >
      {/* diagonal line texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={`${i * 20 - 20}%`}
            y1="0"
            x2={`${i * 20 + 20}%`}
            y2="100%"
            stroke="var(--border-sub)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* top section */}
      <div
        className="relative grid"
        style={{ zIndex: 1, gridTemplateColumns: "1fr 118px", gap: "32px" }}
      >
        <div>
          {/* overline */}
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--text-accent)",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: "var(--text-ghost)",
                letterSpacing: "0.12em",
              }}
            >
              northeastern &apos;28 · data science &amp; mathematics · boston
            </span>
          </div>

          {/* name */}
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 500,
              fontFamily: "var(--font-serif)",
              color: "var(--text-h1)",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              marginTop: "16px",
              marginBottom: "20px",
            }}
          >
            Jerome
            <br />
            Rodrigo
          </h1>

          {/* bio */}
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-body)",
              lineHeight: 1.85,
              maxWidth: "360px",
            }}
          >
            I care about understanding things deeply, not just making them work.
            That&apos;s what pulled me into data science and math, and what keeps
            me building. Problem solving isn&apos;t a skill — it&apos;s just how I
            think. Also into music, photography, cooking, and a bunch of other
            things.
          </p>
        </div>

        {/* photo placeholder */}
        <div
          className="relative flex items-end"
          style={{
            width: "108px",
            height: "136px",
            background: "var(--bg-surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "6px",
            padding: "6px",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            photo
          </span>
        </div>
      </div>

      {/* bottom section */}
      <div
        className="relative flex items-center justify-between"
        style={{ zIndex: 1, marginTop: "28px" }}
      >
        <div className="flex items-center" style={{ gap: "8px" }}>
          <a
            href="#projects"
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              color: "var(--text-accent)",
              border: "0.5px solid var(--border-em)",
            }}
          >
            view projects
          </a>
          <a
            href="#"
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-dim)",
              border: "0.5px solid var(--border)",
            }}
          >
            github
          </a>
          <a
            href="#"
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-dim)",
              border: "0.5px solid var(--border)",
            }}
          >
            linkedin
          </a>
        </div>

        <div className="flex items-center" style={{ gap: "8px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--status-dot)",
            }}
          />
          <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>
            incoming ML intern @ Regeneron · summer 2026
          </span>
        </div>
      </div>
    </header>
  );
}
