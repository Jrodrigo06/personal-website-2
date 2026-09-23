import { experience, leadership, generate, type Experience } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import OrgGroupRow from "@/components/OrgGroupRow";

function ItemList({ items }: { items: Experience[] }) {
  return (
    <div style={{ marginTop: "8px" }}>
      {items.map((item, i) => (
        <div
          key={`${item.org}-${i}`}
          className="row"
        >
          <div>
            <div className="flex items-center" style={{ gap: "8px" }}>
              <span className="row-title">{item.role}</span>
              {item.badge && <StatusBadge>{item.badge}</StatusBadge>}
            </div>
            <div
              className="row-meta"
              style={{ marginBottom: item.oneliner ? "3px" : 0 }}
            >
              {item.org}
              {item.location ? ` · ${item.location}` : ""}
            </div>
            {item.oneliner && <div className="row-desc">{item.oneliner}</div>}
          </div>

          <div className="mobile-hide-date row-date">{item.date}</div>
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
        <div style={{ marginTop: "8px" }}>
          <OrgGroupRow group={generate} />
          <ItemList items={leadership} />
        </div>
      </div>
    </div>
  );
}
