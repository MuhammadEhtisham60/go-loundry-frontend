// @ts-nocheck
interface AvatarProps {
  initials?: string;
  name: string;
}

export function Avatar({ initials, name }: AvatarProps) {
  const letters =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div
      className="w-9 h-9 rounded-full grid place-items-center text-xs font-semibold shrink-0"
      style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
    >
      {letters}
    </div>
  );
}
