"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "music", href: "#music" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        padding: "15px 0",
        background: "var(--bg)",
        borderBottom: scrolled
          ? "0.5px solid var(--border-sub)"
          : "0.5px solid transparent",
      }}
    >
      <div className="page-container flex items-center justify-between">
        <a
          href="#"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-accent)",
            fontFamily: "var(--font-serif)",
          }}
        >
          jr
        </a>

        <div className="flex items-center" style={{ gap: "18px" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: "11px", color: "var(--text-dim)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/photos"
            style={{
              fontSize: "11px",
              color: "var(--text-accent)",
              border: "0.5px solid var(--border)",
              padding: "4px 12px",
              borderRadius: "20px",
            }}
          >
            photos ↗{"︎"}
          </a>
        </div>
      </div>
    </nav>
  );
}
