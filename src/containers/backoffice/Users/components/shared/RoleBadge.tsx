// @ts-nocheck
const ROLE_COLORS: Record<string, string> = {
  "Super Admin":
    "bg-[color:var(--gold)]/15 text-[color:var(--gold)] border-[color:var(--gold)]/30",
  Admin: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Support Agent": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

interface RoleBadgeProps {
  name: string;
}

export function RoleBadge({ name }: RoleBadgeProps) {
  const cls =
    ROLE_COLORS[name] ?? "bg-purple-500/15 text-purple-400 border-purple-500/30";
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-full border ${cls}`}>
      {name}
    </span>
  );
}
