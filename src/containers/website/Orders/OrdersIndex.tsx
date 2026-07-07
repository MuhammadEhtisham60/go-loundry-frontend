// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/customer-shell";
import { ORDERS, formatPKR } from "@/lib/mock-data";
import { StatusBadge, GhostButton } from "@/components/ui-kit";
import { useState } from "react";

const tabs = [
  { id: "all", label: "All" },
  { id: "active", label: "In progress" },
  { id: "delivered", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export function OrdersListPage() {
  const [tab, setTab] = useState("all");
  const filtered = ORDERS.filter((o) => {
    if (tab === "all") return true;
    if (tab === "delivered") return o.status === "delivered";
    if (tab === "cancelled") return o.status === "cancelled";
    return o.status !== "delivered" && o.status !== "cancelled";
  });

  return (
    <CustomerShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">History</div>
        <h1 className="font-display text-4xl mt-2">Your orders</h1>

        <div className="mt-6 inline-flex glass rounded-full p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {filtered.map((o) => (
            <Link
              key={o.id}
              to="/orders/$id"
              params={{ id: o.id }}
              className="block glass rounded-2xl p-5 hover:border-[color:var(--gold)]/30 transition"
            >
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Order ID</div>
                  <div className="font-display text-lg">{o.id}</div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-border" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">
                    {o.items.map((i) => `${i.qty} × ${i.name}`).join(" • ")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(o.placedAt).toLocaleString("en-PK", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg gold-text">{formatPKR(o.total)}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 glass rounded-2xl">
              <div className="font-display text-xl">No orders yet</div>
              <p className="text-sm text-muted-foreground mt-1">
                Schedule your first pickup to get started.
              </p>
              <Link to="/order" className="inline-block mt-4">
                <GhostButton>Schedule pickup</GhostButton>
              </Link>
            </div>
          )}
        </div>
      </section>
    </CustomerShell>
  );
}
