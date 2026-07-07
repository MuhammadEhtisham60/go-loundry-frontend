// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, StatusBadge, GoldButton, GhostButton, Input, Select } from "@/components/ui-kit";
import { ORDERS, ORDER_STATUSES, formatPKR } from "@/lib/mock-data";
import { Search, Filter, Download, Eye, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [sel, setSel] = useState(null);

  const list = ORDERS.filter(
    (o) =>
      (!q ||
        o.id.toLowerCase().includes(q.toLowerCase()) ||
        o.customerName.toLowerCase().includes(q.toLowerCase())) &&
      (!status || o.status === status),
  );

  return (
    <AdminShell
      title="Order management"
      subtitle={`${list.length} orders matching your filters`}
      actions={
        <>
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9 h-10"
              placeholder="Search order ID or customer…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 w-44">
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </Select>
          <GhostButton className="h-10 py-0">
            <Filter className="w-4 h-4" /> More filters
          </GhostButton>
          <GhostButton className="h-10 py-0">
            <Download className="w-4 h-4" /> Export
          </GhostButton>
        </>
      }
    >
      <Section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr className="text-left">
                <th className="py-3 px-3 font-medium">
                  <input type="checkbox" className="accent-[color:var(--gold)]" />
                </th>
                <th className="py-3 px-3 font-medium">Order ID</th>
                <th className="py-3 px-3 font-medium">Customer</th>
                <th className="py-3 px-3 font-medium">Phone</th>
                <th className="py-3 px-3 font-medium">Items</th>
                <th className="py-3 px-3 font-medium">Distance</th>
                <th className="py-3 px-3 font-medium">Slot</th>
                <th className="py-3 px-3 font-medium">Total</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-[color:var(--glass-border)] hover:bg-[color:var(--muted)] transition"
                >
                  <td className="py-3 px-3">
                    <input type="checkbox" className="accent-[color:var(--gold)]" />
                  </td>
                  <td className="py-3 px-3 font-mono text-xs">{o.id}</td>
                  <td className="py-3 px-3">{o.customerName}</td>
                  <td className="py-3 px-3 text-muted-foreground">{o.phone}</td>
                  <td className="py-3 px-3 text-muted-foreground">
                    {o.items.reduce((s, i) => s + i.qty, 0)} pcs
                  </td>
                  <td className="py-3 px-3">{o.address.km} km</td>
                  <td className="py-3 px-3 text-muted-foreground">{o.slot}</td>
                  <td className="py-3 px-3 gold-text font-medium">{formatPKR(o.total)}</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSel(o)}
                      className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[color:var(--secondary)] ml-auto"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {sel && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSel(null)}
        >
          <div
            className="glass rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">
                  Order detail
                </div>
                <h2 className="font-display text-2xl mt-1">{sel.id}</h2>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(sel.placedAt).toLocaleString("en-PK")}
                </div>
              </div>
              <button
                onClick={() => setSel(null)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-[color:var(--input)]/40">
                <div className="text-xs text-muted-foreground mb-1">Customer</div>
                <div className="font-medium">{sel.customerName}</div>
                <div className="text-xs text-muted-foreground">{sel.phone}</div>
              </div>
              <div className="p-4 rounded-xl bg-[color:var(--input)]/40">
                <div className="text-xs text-muted-foreground mb-1">
                  Pickup ({sel.address.km} km)
                </div>
                <div className="font-medium">{sel.address.label}</div>
                <div className="text-xs text-muted-foreground">
                  {sel.address.line}, {sel.address.city}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Items
              </div>
              {sel.items.map((it) => (
                <div
                  key={it.serviceId}
                  className="flex justify-between py-2 text-sm border-b border-[color:var(--glass-border)] last:border-0"
                >
                  <span>
                    {it.qty} × {it.name}
                  </span>
                  <span>{formatPKR(it.qty * it.price)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-display text-lg mt-2 pt-3 border-t border-[color:var(--glass-border)]">
                <span>Total</span>
                <span className="gold-text">{formatPKR(sel.total)}</span>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Update status
              </div>
              <div className="flex flex-wrap gap-2">
                {ORDER_STATUSES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      toast.success(`Status → ${s.label}`);
                      setSel({ ...sel, status: s.key });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${sel.status === s.key ? "border-[color:var(--gold)] bg-[color:var(--gold)]/15" : "border-border hover:border-[color:var(--gold)]/40"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 flex justify-between gap-2">
              <GhostButton onClick={() => toast("Rider assigned")}>Assign rider</GhostButton>
              <div className="flex gap-2">
                <GhostButton onClick={() => toast.error("Order cancelled")}>
                  Cancel order
                </GhostButton>
                <GoldButton onClick={() => setSel(null)}>Save</GoldButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
