"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

function badgeStyle(status: NonNullable<Project["status"]>): {
  color: string;
  background: string;
  border: string;
} {
  if (status === "shipped") {
    return {
      color: "var(--badge-text)",
      background: "var(--badge-bg)",
      border: "0.5px solid var(--badge-border)",
    };
  }
  if (status === "paper") {
    return {
      color: "var(--text-dim)",
      background: "var(--bg-card)",
      border: "0.5px solid var(--border)",
    };
  }
  return {
    color: "var(--badge-amber)",
    background: "var(--badge-bg)",
    border: "0.5px solid var(--badge-border)",
  };
}

function projectLinks(project: Project): { href: string; label: string }[] {
  return [
    project.link && { href: project.link, label: "view on github" },
    project.demo && { href: project.demo, label: "live demo" },
  ].filter(Boolean) as { href: string; label: string }[];
}

const tagStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "var(--tag-text)",
  background: "var(--tag-bg)",
  border: "0.5px solid var(--tag-border)",
  borderRadius: "8px",
  padding: "2px 7px",
};

export default function Projects() {
  const [openNum, setOpenNum] = useState<string | null>(null);
  const openProject = projects.find((p) => p.num === openNum) ?? null;

  // close on Escape + lock body scroll while a modal is open
  useEffect(() => {
    if (!openNum) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenNum(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openNum]);

  return (
    <div
      style={{
        padding: "24px 28px",
      }}
    >
      {/* section header */}
      <div className="flex items-center" style={{ gap: "12px" }}>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-ghost)",
          }}
        >
          projects
        </span>
        <span
          className="flex-1"
          style={{ height: "0.5px", background: "var(--border)" }}
        />
      </div>

      {/* items */}
      <div style={{ marginTop: "8px" }}>
        {projects.map((project, i) => {
          const hasDetail = Boolean(project.detail);
          return (
            <div
              key={project.num}
              onClick={hasDetail ? () => setOpenNum(project.num) : undefined}
              className="grid items-start"
              style={{
                gridTemplateColumns: "24px 1fr 16px",
                gap: "14px",
                padding: "13px 0",
                cursor: hasDetail ? "pointer" : "default",
                borderBottom:
                  i === projects.length - 1
                    ? "none"
                    : "0.5px solid var(--border-sub)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "var(--text-ghost)",
                }}
              >
                {project.num}
              </div>

              <div>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-h2)",
                    }}
                  >
                    {project.name}
                  </span>
                  {project.status && (
                    <span
                      style={{
                        fontSize: "10px",
                        borderRadius: "20px",
                        padding: "1px 8px",
                        ...badgeStyle(project.status),
                      }}
                    >
                      {project.status}
                    </span>
                  )}
                  {project.date && (
                    <span
                      className="mobile-hide-date"
                      style={{
                        marginLeft: "auto",
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "var(--text-ghost)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.date}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-body)",
                    lineHeight: 1.55,
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  {project.desc}
                </div>

                <div className="flex flex-wrap" style={{ gap: "5px" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {hasDetail && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-ghost)",
                  }}
                >
                  ↗
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* detail modal */}
      <AnimatePresence>
        {openProject && (
          <motion.div
            onClick={() => setOpenNum(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "color-mix(in srgb, var(--bg) 85%, transparent)",
              backdropFilter: "blur(4px)",
            }}
          >
            <motion.div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "relative",
                maxWidth: "560px",
                width: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-em)",
                borderRadius: "12px",
                padding: "28px",
              }}
            >
              <button
                onClick={() => setOpenNum(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontSize: "16px",
                  lineHeight: 1,
                  color: "var(--text-ghost)",
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              <div
                className="flex items-center"
                style={{ gap: "8px", paddingRight: "24px" }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "var(--text-h1)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {openProject.name}
                </span>
                {openProject.status && (
                  <span
                    style={{
                      fontSize: "10px",
                      borderRadius: "20px",
                      padding: "1px 8px",
                      ...badgeStyle(openProject.status),
                    }}
                  >
                    {openProject.status}
                  </span>
                )}
                {openProject.date && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: "var(--text-ghost)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {openProject.date}
                  </span>
                )}
              </div>

              <div
                className="flex flex-wrap"
                style={{ gap: "5px", marginTop: "10px" }}
              >
                {openProject.tags.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  height: "0.5px",
                  background: "var(--border-sub)",
                  margin: "14px 0",
                }}
              />

              {openProject.detail && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-body)",
                    lineHeight: 1.8,
                  }}
                >
                  {openProject.detail}
                </div>
              )}

              {openProject.previews && openProject.previews.length > 0 && (
                <div
                  className="flex flex-col"
                  style={{ gap: "10px", marginTop: "16px" }}
                >
                  {openProject.previews.map((img, idx) => (
                    <Image
                      key={img.src}
                      src={img}
                      alt={`${openProject.name} preview ${idx + 1}`}
                      sizes="(max-width: 600px) 90vw, 504px"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        border: "0.5px solid var(--border)",
                      }}
                    />
                  ))}
                </div>
              )}

              {(() => {
                const links = projectLinks(openProject);
                if (links.length === 0) return null;
                return (
                  <div
                    className="flex flex-wrap"
                    style={{ gap: "16px", marginTop: "16px" }}
                  >
                    {links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "11px",
                          color: "var(--text-accent)",
                        }}
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
