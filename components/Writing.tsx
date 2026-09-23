import { writing } from "@/data/writing";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Writing() {
  return (
    <div style={{ padding: "24px 28px" }}>
      <SectionHeader label="writing" />

      {/* items */}
      <div style={{ marginTop: "8px" }}>
        {writing.map((item) => (
          <div key={item.title} className="row">
            <div>
              <div className="flex items-center" style={{ gap: "8px" }}>
                <span className="row-title">{item.title}</span>
                <StatusBadge>{item.type}</StatusBadge>
              </div>
              <div className="row-meta" style={{ marginBottom: "2px" }}>
                {item.subtitle}
              </div>
              <div className="row-desc prose">{item.description}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="row-date">{item.date}</div>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "var(--text-2xs)",
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
