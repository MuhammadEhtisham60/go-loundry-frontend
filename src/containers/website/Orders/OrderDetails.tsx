// @ts-nocheck
import { Link, useParams } from "@tanstack/react-router";
import { CustomerShell } from "@/components/customer-shell";
import { ORDERS, ORDER_STATUSES, formatPKR } from "@/lib/mock-data";
import { StatusBadge, GoldButton, GhostButton, Section } from "@/components/ui-kit";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const order = ORDERS.find((o) => o.id === id) || ORDERS[0];
  const [rating, setRating] = useState(order.rating || 0);

  const flow = ORDER_STATUSES.filter((s) => s.key !== "cancelled");
  const currentIdx = flow.findIndex((s) => s.key === order.status);

  return (
    <CustomerShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/orders" className="text-xs text-muted-foreground hover:text-foreground">
          ← All orders
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">Order</div>
            <h1 className="font-display text-4xl mt-1">{order.id}</h1>
            <div className="mt-1 text-sm text-muted-foreground">
              Placed {new Date(order.placedAt).toLocaleString("en-PK")}
            </div>
          </div>
          <StatusBadge status={order.status} size="lg" />
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            <Section title="Live tracking">
              <div className="relative pl-8">
                <div className="absolute left-3 top-3 bottom-3 w-px bg-border" />
                {flow.map((s, i) => {
                  const done = i <= currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={s.key} className="relative pb-5 last:pb-0">
                      <div
                        className={`absolute -left-[22px] top-0.5 w-5 h-5 rounded-full grid place-items-center ${done ? "" : "border border-border bg-[color:var(--input)]"}`}
                        style={done ? { background: "var(--gradient-gold)" } : {}}
                      >
                        {done && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--primary-foreground)]" />
                        )}
                        {active && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ background: "var(--gradient-gold)", opacity: 0.5 }}
                          />
                        )}
                      </div>
                      <div className={`text-sm font-medium ${done ? "" : "text-muted-foreground"}`}>
                        {s.label}
                      </div>
                      {active && (
                        <div className="text-xs text-muted-foreground mt-0.5">In progress now…</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Items">
              <div className="space-y-2">
                {order.items.map((it) => (
                  <div
                    key={it.serviceId}
                    className="flex justify-between py-2 border-b border-[color:var(--glass-border)] last:border-0 text-sm"
                  >
                    <div>
                      <div>{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.qty} × {formatPKR(it.price)} / {it.unit}
                      </div>
                    </div>
                    <div className="font-medium">{formatPKR(it.qty * it.price)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[color:var(--glass-border)] space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPKR(order.total - order.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>
                    {order.deliveryCharge === 0 ? "Free" : formatPKR(order.deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between font-display text-lg pt-2">
                  <span>Total ({order.payment})</span>
                  <span className="gold-text">{formatPKR(order.total)}</span>
                </div>
              </div>
            </Section>

            {order.status === "delivered" && (
              <Section title="Rate your service">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setRating(n);
                        toast.success("Thanks for the rating!");
                      }}
                    >
                      <Star
                        className={`w-8 h-8 transition ${n <= rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-muted-foreground hover:text-[color:var(--gold)]"}`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder="Tell us how we did…"
                  className="mt-3 w-full px-4 py-3 rounded-xl bg-[color:var(--input)] border border-border text-sm outline-none focus:border-[color:var(--gold)]/60"
                />
              </Section>
            )}
          </div>

          <aside className="space-y-4">
            <Section title="Pickup address">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[color:var(--gold)] mt-0.5" />
                <div>
                  <div className="font-medium">{order.address.label}</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {order.address.line}, {order.address.city}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {order.address.km} km from warehouse
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 text-sm">
                <Clock className="w-4 h-4 text-[color:var(--gold)]" />
                <div>{order.slot} slot</div>
              </div>
            </Section>

            <Section title="Your rider">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full grid place-items-center font-medium"
                  style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
                >
                  UR
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Umar Raza</div>
                  <div className="text-xs text-muted-foreground">+92 311 0000123</div>
                </div>
                <button className="w-9 h-9 rounded-full grid place-items-center bg-[color:var(--input)]">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </Section>

            <div className="grid grid-cols-2 gap-2">
              <Link to="/order" className="block">
                <GhostButton className="w-full">Re-order</GhostButton>
              </Link>
              <Link to="/chat" className="block">
                <GoldButton className="w-full">Get help</GoldButton>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </CustomerShell>
  );
}
