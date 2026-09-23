export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center" style={{ gap: "12px" }}>
      <span className="section-label">{label}</span>
      <span className="flex-1 section-divider" />
    </div>
  );
}
