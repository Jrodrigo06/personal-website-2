import Image from "next/image";
import { LINKS } from "@/config/links";

export default function Hero() {
  return (
    <header
      className="relative"
      style={{
        padding: "52px 28px 44px",
        borderBottom: "0.5px solid var(--border-sub)",
      }}
    >
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
            I'm Jerome, a Data Science and Math student at Northeastern. I love
            tackling hard problems and I'm always trying to learn something new.
          </p>
        </div>

        {/* photo */}
        <div
          className="relative"
          style={{
            width: "108px",
            height: "136px",
            background: "var(--bg-surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/hero.jpg"
            alt="Jerome Rodrigo"
            fill
            sizes="108px"
            quality={90}
            style={{ objectFit: "cover" }}
            priority
          />
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
            href={LINKS.github}
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
            href={LINKS.linkedin}
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
          <a
            href={LINKS.resume}
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              color: "var(--text-dim)",
              border: "0.5px solid var(--border)",
            }}
          >
            resume
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
            ML intern @ Regeneron · summer 2026
          </span>
        </div>
      </div>
    </header>
  );
}
