// @ts-nocheck
import { useId } from "react";
import { ORDER_STATUSES, statusMeta } from "@/lib/mock-data";

export function StatusBadge({ status, size = "sm" }) {
  const meta = statusMeta(status);
  const tone = meta.tone;
  const toneCls =
    tone === "success"
      ? "bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/30"
      : tone === "destructive"
        ? "bg-[color:var(--destructive)]/15 text-[color:var(--destructive)] border-[color:var(--destructive)]/30"
        : "bg-[color:var(--gold)]/15 text-[color:var(--gold)] border-[color:var(--gold)]/30";
  const sizeCls = size === "lg" ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${toneCls} ${sizeCls}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}

export function Stat({ label, value, hint = null, icon: Icon = null, accent = null }) {
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-[color:var(--gold)]/30 transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="font-display text-3xl mt-2">{value}</div>
          {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl grid place-items-center"
            style={{ background: accent || "color-mix(in oklab, var(--gold) 18%, transparent)" }}
          >
            <Icon className="w-4 h-4 text-[color:var(--gold)]" />
          </div>
        )}
      </div>
      <div
        className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition"
        style={{ background: "var(--gradient-gold)" }}
      />
    </div>
  );
}

export function Section({ title = null, action = null, children, className = "" }) {
  return (
    <section className={`glass rounded-2xl p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="font-display text-lg">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function GoldButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[color:var(--primary-foreground)] transition hover:opacity-90 active:scale-[0.98] ${className}`}
      style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm border border-border hover:bg-[color:var(--muted)] transition ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint = null, children }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </label>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full h-11 px-4 rounded-xl bg-[color:var(--input)] border border-border text-sm outline-none focus:border-[color:var(--gold)]/60 focus:ring-2 focus:ring-[color:var(--gold)]/20 transition ${props.className || ""}`}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 rounded-xl bg-[color:var(--input)] border border-border text-sm outline-none focus:border-[color:var(--gold)]/60 focus:ring-2 focus:ring-[color:var(--gold)]/20 transition ${props.className || ""}`}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`w-full h-11 px-4 rounded-xl bg-[color:var(--input)] border border-border text-sm outline-none focus:border-[color:var(--gold)]/60 transition ${props.className || ""}`}
    />
  );
}

export function ProgressBar({ value, max = 100 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-2 rounded-full bg-[color:var(--input)] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: pct + "%", background: "var(--gradient-gold)" }}
      />
    </div>
  );
}

export function MiniBarChart({ data, valueKey = "orders", labelKey = "day", height = 140 }) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => {
        const h = (d[valueKey] / max) * (height - 30);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition">
              {d[valueKey]}
            </div>
            <div
              className="w-full rounded-md transition hover:opacity-90"
              style={{
                height: h,
                background: "var(--gradient-gold)",
                boxShadow: "0 0 12px -2px oklch(0.78 0.12 85 / 0.4)",
              }}
            />
            <div className="text-[10px] text-muted-foreground">{d[labelKey]}</div>
          </div>
        );
      })}
    </div>
  );
}

export function MiniLineChart({ data, valueKey = "revenue", color }) {
  const chartId = useId();
  const max = Math.max(...data.map((d) => d[valueKey]));
  const min = Math.min(...data.map((d) => d[valueKey]));
  const w = 600,
    h = 160,
    pad = 20;
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = pad + (i * (w - pad * 2)) / (data.length - 1);
    const y = h - pad - ((d[valueKey] - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const area = path + ` L${points[points.length - 1][0]},${h - pad} L${points[0][0]},${h - pad} Z`;

  const strokeColor = color || "oklch(0.86 0.1 90)";
  const stopColor = color || "oklch(0.78 0.12 85)";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <defs>
        <linearGradient id={chartId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stopColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${chartId})`} />
      <path d={path} stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={strokeColor} />
      ))}
    </svg>
  );
}

export function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = [
    "rgb(54, 179, 221)",
    "rgba(54, 221, 68, 0.8)",
    "rgba(182, 54, 221, 0.6)",
    "rgba(235, 65, 53, 0.61)",
    "rgba(49, 48, 49, 0.44)",
  ];
  let cum = 0;
  const r = 60,
    c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--muted)" strokeWidth="22" />
        {data.map((d, i) => {
          const pct = d.value / total;
          const dash = pct * c;
          const offset = c - cum * c;
          cum += pct;
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="22"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <div className="space-y-2 text-sm flex-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: colors[i % colors.length] }}
            />
            <span className="flex-1">{d.name}</span>
            <span className="text-muted-foreground tabular-nums">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
