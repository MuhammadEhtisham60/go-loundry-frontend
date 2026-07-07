// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import {
  Stat,
  Section,
  StatusBadge,
  MiniBarChart,
  MiniLineChart,
  Donut,
  GhostButton,
} from "@/components/ui-kit";
import {
  ORDERS,
  CUSTOMERS,
  REPORT_ORDERS_WEEK,
  REPORT_SERVICE_MIX,
  formatPKR,
} from "@/lib/mock-data";
import { ShoppingBag, Users, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";

export function AdminDashboard() {
  const today = ORDERS.length;
  const revenue = ORDERS.filter((o) => o.status === "delivered").reduce((s, o) => s + o.total, 0);
  const newCust = CUSTOMERS.filter((c) => c.joined > "2026-05").length;

  return (
    <AdminShell title="Dashboard" subtitle="A snapshot of GoLaundry operations">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Orders today" value={today} hint="+12% vs yesterday" icon={ShoppingBag} />
        <Stat
          label="Revenue (week)"
          value={formatPKR(revenue)}
          hint="Estimated COD value"
          icon={TrendingUp}
        />
        <Stat label="New customers" value={newCust} hint="Last 30 days" icon={Users} />
        <Stat label="Open chats" value="3" hint="2 unread" icon={MessageSquare} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <Section
          title="Revenue trend"
          className="lg:col-span-2"
          action={
            <div className="flex gap-1">
              {["7d", "30d", "90d"].map((t, i) => (
                <button
                  key={t}
                  className={`text-xs px-3 py-1 rounded-full ${i === 0 ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]" : "text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        >
          <MiniLineChart data={REPORT_ORDERS_WEEK} valueKey="revenue" color="var(--primary)" />
          <div className="mt-4 grid grid-cols-3 text-sm pt-4 border-t border-[color:var(--glass-border)]">
            <div>
              <div className="text-xs text-muted-foreground">Avg order</div>
              <div className="font-display text-xl gold-text mt-1">{formatPKR(1180)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total orders</div>
              <div className="font-display text-xl mt-1">267</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Growth</div>
              <div className="font-display text-xl text-[color:var(--success)] mt-1">+18%</div>
            </div>
          </div>
        </Section>

        <Section title="Service mix">
          <Donut data={REPORT_SERVICE_MIX} />
        </Section>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <Section title="Orders by status" className="lg:col-span-2">
          <MiniBarChart data={REPORT_ORDERS_WEEK} valueKey="orders" labelKey="day" height={180} />
        </Section>
        <Section
          title="Live order queue"
          action={
            <Link
              to="/admin/orders"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          }
        >
          <div className="space-y-2">
            {ORDERS.slice(0, 4).map((o) => (
              <Link
                to="/admin/orders"
                key={o.id}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[color:var(--muted)] transition"
              >
                <div
                  className="w-9 h-9 rounded-lg grid place-items-center text-[10px] font-medium"
                  style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
                >
                  {o.id.slice(-3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{o.customerName}</div>
                  <div className="text-[11px] text-muted-foreground">{formatPKR(o.total)}</div>
                </div>
                <StatusBadge status={o.status} />
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-6">
        <Section
          title="Recent orders"
          action={
            <Link to="/admin/orders">
              <GhostButton>Open orders →</GhostButton>
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr className="text-left">
                  <th className="py-3 px-3 font-medium">Order</th>
                  <th className="py-3 px-3 font-medium">Customer</th>
                  <th className="py-3 px-3 font-medium">Items</th>
                  <th className="py-3 px-3 font-medium">Slot</th>
                  <th className="py-3 px-3 font-medium">Total</th>
                  <th className="py-3 px-3 font-medium">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-[color:var(--glass-border)] hover:bg-[color:var(--muted)] transition"
                  >
                    <td className="py-3 px-3 font-mono text-xs">{o.id}</td>
                    <td className="py-3 px-3">{o.customerName}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">
                      {o.items.reduce((s, i) => s + i.qty, 0)} items
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{o.slot}</td>
                    <td className="py-3 px-3 gold-text font-medium">{formatPKR(o.total)}</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground inline" />
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
