// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import {
  Section,
  Stat,
  MiniBarChart,
  MiniLineChart,
  Donut,
  GhostButton,
} from "@/components/ui-kit";
import { REPORT_ORDERS_WEEK, REPORT_SERVICE_MIX, REPORT_ZONE, formatPKR } from "@/lib/mock-data";
import { Download, TrendingUp, Users, Star, Clock } from "lucide-react";

export function AdminReports() {
  return (
    <AdminShell
      title="Reports & analytics"
      subtitle="Deep insights across orders, revenue, customers, and zones"
      actions={
        <>
          <select className="h-10 px-4 rounded-xl bg-[color:var(--input)] border border-border text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
          <GhostButton className="h-10 py-0">
            <Download className="w-4 h-4" /> Export CSV
          </GhostButton>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          label="Revenue"
          value={formatPKR(203650)}
          hint="+18% vs last week"
          icon={TrendingUp}
        />
        <Stat label="Active customers" value="487" hint="6 new today" icon={Users} />
        <Stat label="Avg. rating" value="4.8 ★" hint="from 312 reviews" icon={Star} />
        <Stat label="Avg. response time" value="2m 14s" hint="Chat first reply" icon={Clock} />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <Section title="Revenue (last 7 days)">
          <MiniLineChart data={REPORT_ORDERS_WEEK} valueKey="revenue" color="var(--primary)" />
        </Section>
        <Section title="Orders per day">
          <MiniBarChart data={REPORT_ORDERS_WEEK} valueKey="orders" height={170} />
        </Section>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <Section title="Service popularity">
          <Donut data={REPORT_SERVICE_MIX} />
        </Section>
        <Section title="Orders by distance zone">
          <div className="space-y-4 mt-2">
            {REPORT_ZONE.map((z) => {
              const max = Math.max(...REPORT_ZONE.map((x) => x.orders));
              return (
                <div key={z.zone}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{z.zone}</span>
                    <span className="text-muted-foreground tabular-nums">{z.orders} orders</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[color:var(--input)] overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: (z.orders / max) * 100 + "%",
                        background: "var(--gradient-gold)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <div className="mt-6">
        <Section title="Detailed orders report">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr className="text-left">
                  <th className="py-3 px-3">Day</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Avg. value</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {REPORT_ORDERS_WEEK.map((r) => (
                  <tr key={r.day} className="border-t border-[color:var(--glass-border)]">
                    <td className="py-3 px-3 font-medium">{r.day}</td>
                    <td className="py-3 px-3">{r.orders}</td>
                    <td className="py-3 px-3 gold-text">{formatPKR(r.revenue)}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {formatPKR(Math.round(r.revenue / r.orders))}
                    </td>
                    <td className="py-3 px-3 text-[color:var(--success)]">
                      +{(Math.random() * 20 + 5).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
