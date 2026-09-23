import type { OrgGroup } from "@/data/experience";
import StatusBadge from "@/components/ui/StatusBadge";

export default function OrgGroupRow({ group }: { group: OrgGroup }) {
  return (
    <div>
      {/* org header row — same shape as a flat experience row */}
      <div
        className="grid items-start"
        style={{ gridTemplateColumns: "1fr auto", gap: "16px", padding: "11px 0" }}
      >
        <div>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span className="row-title">{group.org}</span>
            {group.badge && <StatusBadge>{group.badge}</StatusBadge>}
          </div>
          {group.location && <div className="row-meta">{group.location}</div>}
        </div>
        <div className="mobile-hide-date row-date">{group.dateRange}</div>
      </div>

      {/* nested sub-roles — indent + hairline left border, no dots/connector */}
      <div style={{ marginTop: "2px" }}>
        {group.roles.map((role) => (
          <div key={role.role} className="org-role">
            <div
              className="flex items-center justify-between"
              style={{ gap: "12px" }}
            >
              <div className="flex items-center" style={{ gap: "8px" }}>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-h2)" }}>
                  {role.role}
                </span>
                {role.current && <StatusBadge>current</StatusBadge>}
              </div>
              <span className="mobile-hide-date row-date">{role.date}</span>
            </div>
            <div className="row-desc" style={{ marginTop: "3px" }}>
              {role.oneliner}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
