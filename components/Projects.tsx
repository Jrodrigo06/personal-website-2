"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import TechTag from "@/components/ui/TechTag";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";

const MAX_VISIBLE_TAGS = 4;

function statusTone(status: NonNullable<Project["status"]>): StatusTone {
  if (status === "shipped") return "accent";
  if (status === "paper") return "muted";
  return "amber";
}

function projectLinks(project: Project): { href: string; label: string }[] {
  return [
    project.link && { href: project.link, label: "view on github" },
    project.demo && { href: project.demo, label: "open app" },
  ].filter(Boolean) as { href: string; label: string }[];
}

export default function Projects() {
  const [openNum, setOpenNum] = useState<string | null>(null);
  const openProject = projects.find((p) => p.num === openNum) ?? null;
  const prefersReducedMotion = useReducedMotion();

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
      <SectionHeader label="projects" />

      {/* items */}
      <div style={{ marginTop: "8px" }}>
        {projects.map((project, i) => {
          const hasDetail = Boolean(project.detail);
          const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
          const hiddenCount = project.tags.length - visibleTags.length;
          return (
            <div
              key={project.num}
              onClick={hasDetail ? () => setOpenNum(project.num) : undefined}
              onKeyDown={
                hasDetail
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenNum(project.num);
                      }
                    }
                  : undefined
              }
              role={hasDetail ? "button" : undefined}
              tabIndex={hasDetail ? 0 : undefined}
              className={`grid items-start${hasDetail ? " click-row" : ""}`}
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
              <div className="row-date">{project.num}</div>

              <div>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <span className="row-title">{project.name}</span>
                  {project.status && (
                    <StatusBadge tone={statusTone(project.status)}>
                      {project.status}
                    </StatusBadge>
                  )}
                  {project.date && (
                    <span
                      className="mobile-hide-date row-date"
                      style={{ marginLeft: "auto" }}
                    >
                      {project.date}
                    </span>
                  )}
                </div>

                <div
                  className="row-desc"
                  style={{ marginTop: "4px", marginBottom: "8px" }}
                >
                  {project.desc}
                </div>

                <div className="flex flex-wrap" style={{ gap: "5px" }}>
                  {visibleTags.map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                  {hiddenCount > 0 && (
                    <TechTag>+{hiddenCount}</TechTag>
                  )}
                </div>
              </div>

              {hasDetail && (
                <div
                  style={{
                    fontSize: "var(--text-sm)",
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
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
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
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
                  <StatusBadge tone={statusTone(openProject.status)}>
                    {openProject.status}
                  </StatusBadge>
                )}
                {openProject.date && (
                  <span
                    className="row-date"
                    style={{ marginLeft: "auto" }}
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
                  <TechTag key={tag}>{tag}</TechTag>
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
                  className="prose"
                  style={{
                    fontSize: "var(--text-sm)",
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
                          fontSize: "var(--text-xs)",
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
