export type StatusTone = "accent" | "amber" | "muted";

export default function StatusBadge({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
