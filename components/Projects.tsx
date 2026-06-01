import { projects } from "@/data/projects";

export default function Projects() {
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
        {projects.map((project) => (
          <div
            key={project.num}
            className="grid items-start"
            style={{
              gridTemplateColumns: "24px 1fr 16px",
              gap: "14px",
              padding: "13px 0",
              borderBottom: "0.5px solid var(--border-sub)",
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
                      color:
                        project.status === "shipped"
                          ? "var(--badge-text)"
                          : "var(--badge-amber)",
                      background: "var(--badge-bg)",
                      border: "0.5px solid var(--badge-border)",
                      borderRadius: "20px",
                      padding: "1px 8px",
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

            <div style={{ fontSize: "13px", color: "var(--text-ghost)" }}>↗</div>
          </div>
        ))}
      </div>
    </div>
  );
}
