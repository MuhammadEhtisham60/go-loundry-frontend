// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, Stat, GhostButton } from "@/components/ui-kit";
import { RATINGS } from "@/lib/mock-data";
import { Star, Download } from "lucide-react";

export function AdminRatings() {
  const avg = (RATINGS.reduce((s, r) => s + r.stars, 0) / RATINGS.length).toFixed(2);
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: RATINGS.filter((r) => r.stars === n).length,
  }));
  const total = RATINGS.length;

  return (
    <AdminShell
      title="Ratings & feedback"
      subtitle="Customer satisfaction across all completed orders"
      actions={
        <GhostButton className="h-10 py-0">
          <Download className="w-4 h-4" /> Export
        </GhostButton>
      }
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Stat label="Average rating" value={`${avg} ★`} hint={`${total} reviews`} icon={Star} />
        <Stat
          label="5★ share"
          value={`${Math.round((dist[0].count / total) * 100)}%`}
          icon={Star}
        />
        <Stat label="Response rate" value="68%" hint="Customers who rate" icon={Star} />
      </div>
      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <Section title="Distribution">
          {dist.map((d) => (
            <div key={d.n} className="flex items-center gap-3 mb-2 text-sm">
              <span className="w-10 inline-flex items-center gap-1">
                {d.n} <Star className="w-3 h-3 fill-[color:var(--gold)] text-[color:var(--gold)]" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-[color:var(--input)] overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: (d.count / total) * 100 + "%",
                    background: "var(--gradient-gold)",
                  }}
                />
              </div>
              <span className="w-8 text-right text-muted-foreground tabular-nums">{d.count}</span>
            </div>
          ))}
        </Section>
        <Section title="Recent reviews" className="lg:col-span-2">
          <div className="space-y-3">
            {RATINGS.map((r) => (
              <div key={r.orderId} className="p-4 rounded-xl bg-[color:var(--input)]/40">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{r.customer}</div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r.stars ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">"{r.remark}"</p>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  {r.orderId} • {new Date(r.date).toLocaleDateString("en-PK")}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
