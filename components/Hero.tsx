import Image from "next/image";
import { LINKS } from "@/config/links";

export default function Hero() {
  return (
    <header
      className="relative"
      style={{
        padding: "52px 28px 44px",
      }}
    >
      {/* top section — text + a desktop-only personal photo */}
      <div
        className="hero-top"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "32px",
          alignItems: "start",
        }}
      >
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
              fontSize: "var(--text-2xs)",
              color: "var(--text-ghost)",
              letterSpacing: "0.12em",
            }}
          >
            Northeastern '28 · Data Science & Mathematics · Boston
          </span>
        </div>

        {/* name */}
        <h1
          style={{
            fontSize: "var(--text-2xl)",
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
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
            Data Project Lead @ Generate · Fall 2026
          </span>
        </div>

        {/* bio */}
        <p
          className="prose"
          style={{
            fontSize: "var(--text-base)",
            color: "var(--text-body)",
            lineHeight: 1.75,
          }}
        >
          I'm Jerome, a Data Science and Math student at Northeastern
          interested in ML engineering, data systems, and software engineering. I
          like working on technically challenging problems and building
          thoughtful systems that have a real impact.
        </p>
      </div>

        {/* personal photo — desktop only, hidden on mobile via .hero-photo */}
        <div className="hero-photo relative" style={{ zIndex: 1 }}>
          <Image
            src="/hero-portrait.png"
            alt="Jerome Rodrigo"
            width={170}
            height={226}
            priority
            style={{
              width: "170px",
              height: "226px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "0.5px solid var(--border)",
              filter: "saturate(0.92)",
              display: "block",
            }}
          />
        </div>
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
              fontSize: "var(--text-xs)",
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
              fontSize: "var(--text-xs)",
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
              fontSize: "var(--text-xs)",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-body)",
              border: "0.5px solid var(--border)",
            }}
          >
            linkedin
          </a>
          <a
            href="/photos"
            style={{
              fontSize: "var(--text-xs)",
              padding: "6px 10px",
              color: "var(--text-dim)",
            }}
          >
            photos ↗
          </a>
        </div>
      </div>
    </header>
  );
}
