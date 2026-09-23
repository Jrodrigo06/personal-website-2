import { LINKS } from "@/config/links";

export default function Hero() {
  return (
    <header
      className="relative"
      style={{
        padding: "52px 28px 44px",
      }}
    >
      {/* top section */}
      <div className="relative" style={{ zIndex: 1 }}>
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
            className="hero-overline"
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
            marginBottom: "14px",
          }}
        >
          Jerome
          <br />
          Rodrigo
        </h1>

        {/* status pill */}
        <div
          className="flex items-center"
          style={{ gap: "8px", marginBottom: "18px" }}
        >
          <span className="status-dot" />
          <span style={{ fontSize: "11px", color: "var(--text-body)" }}>
            ML intern @ Regeneron · summer 2026
          </span>
        </div>

        {/* bio */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-body)",
            lineHeight: 1.85,
            maxWidth: "360px",
          }}
        >
          I'm Jerome, a Data Science and Math student at Northeastern. I love
          tackling hard problems and I'm always trying to learn something new.
        </p>
      </div>

      {/* bottom section */}
      <div
        className="relative flex items-center hero-bottom"
        style={{ zIndex: 1, marginTop: "28px" }}
      >
        <div className="flex items-center hero-cta" style={{ gap: "8px" }}>
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
            href={LINKS.github}
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-body)",
              border: "0.5px solid var(--border)",
            }}
          >
            github
          </a>
          <a
            href={LINKS.linkedin}
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-body)",
              border: "0.5px solid var(--border)",
            }}
          >
            linkedin
          </a>
        </div>
      </div>
    </header>
  );
}
