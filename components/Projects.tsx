"use client";

import { useState } from "react";
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

export default function Projects() {
  const [openNum, setOpenNum] = useState<string | null>(null);

  return (
    <div
      style={{
        padding: "24px 28px",
        borderBottom: "0.5px solid var(--border-sub)",
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
        {projects.map((project) => {
          const isOpen = openNum === project.num;
          return (
            <div
              key={project.num}
              style={{ borderBottom: "0.5px solid var(--border-sub)" }}
            >
              {/* clickable row */}
              <div
                onClick={() => setOpenNum(isOpen ? null : project.num)}
                className="grid items-start"
                style={{
                  gridTemplateColumns: "24px 1fr 16px",
                  gap: "14px",
                  padding: "13px 0",
                  cursor: "pointer",
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
                      <span
                        key={tag}
                        style={{
                          fontSize: "10px",
                          color: "var(--tag-text)",
                          background: "var(--tag-bg)",
                          border: "0.5px solid var(--tag-border)",
                          borderRadius: "8px",
                          padding: "2px 7px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-ghost)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ↗
                </div>
              </div>

              {/* expandable detail panel */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "24px 1fr 16px",
                      gap: "14px",
                      paddingBottom: "13px",
                    }}
                  >
                    <div />
                    <div>
                      {project.detail && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--text-body)",
                            lineHeight: 1.55,
                          }}
                        >
                          {project.detail}
                        </div>
                      )}
                      {(project.paper || project.link) && (
                        <div
                          className="flex"
                          style={{ gap: "16px", marginTop: "10px" }}
                        >
                          {project.paper && (
                            <a
                              href={project.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "11px",
                                color: "var(--text-accent)",
                              }}
                            >
                              read paper ↗
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "11px",
                                color: "var(--text-accent)",
                              }}
                            >
                              view on github ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <div />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
