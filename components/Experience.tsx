import { experience, leadership, type Experience } from "@/data/experience";

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center" style={{ gap: "12px" }}>
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--text-ghost)",
        }}
      >
        {label}
      </span>
      <span
        className="flex-1"
        style={{ height: "0.5px", background: "var(--border)" }}
      />
    </div>
  );
}

function ItemList({ items }: { items: Experience[] }) {
  return (
    <div style={{ marginTop: "8px" }}>
      {items.map((item, i) => (
        <div
          key={`${item.org}-${i}`}
          className="grid items-start"
          style={{
            gridTemplateColumns: "1fr auto",
            gap: "16px",
            padding: "11px 0",
            borderBottom:
              i === items.length - 1
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
                {item.role}
              </span>
              {item.badge && (
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
                  {item.badge}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-body)",
                marginTop: "2px",
                marginBottom: item.oneliner ? "3px" : 0,
              }}
            >
              {item.org}
              {item.location ? ` · ${item.location}` : ""}
            </div>
            {item.oneliner && (
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-ghost)",
                  lineHeight: 1.5,
                }}
              >
                {item.oneliner}
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <div
      style={{
        padding: "24px 28px",
      }}
    >
      <SectionHeader label="experience" />
      <ItemList items={experience} />

      <div style={{ marginTop: "24px" }}>
        <SectionHeader label="leadership" />
        <ItemList items={leadership} />
      </div>
    </div>
  );
}
