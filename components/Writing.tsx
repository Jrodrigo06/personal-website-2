import { writing } from "@/data/writing";

export default function Writing() {
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
          writing
        </span>
        <span
          className="flex-1"
          style={{ height: "0.5px", background: "var(--border)" }}
        />
      </div>

      {/* items */}
      <div style={{ marginTop: "8px" }}>
        {writing.map((item, i) => (
          <div
            key={item.title}
            className="grid items-start"
            style={{
              gridTemplateColumns: "1fr auto",
              gap: "16px",
              padding: "11px 0",
              borderBottom:
                i === writing.length - 1
                  ? "none"
                  : "0.5px solid var(--border-sub)",
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: "8px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-h2)",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--badge-text)",
                    background: "var(--badge-bg)",
                    border: "0.5px solid var(--badge-border)",
                    borderRadius: "20px",
                    padding: "1px 8px",
                  }}
                >
                  {item.type}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-body)",
                  marginBottom: "2px",
                }}
              >
                {item.subtitle}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-ghost)",
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "var(--text-ghost)",
                }}
              >
                {item.date}
              </div>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  color: "var(--text-accent)",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                read ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
