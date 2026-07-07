// @ts-nocheck
import { useNavigate } from "@tanstack/react-router";
import { CustomerShell } from "@/components/customer-shell";
import { GoldButton, GhostButton, Field, Input, Textarea, Section } from "@/components/ui-kit";
import {
  SERVICES,
  ADDRESSES,
  TIME_SLOTS,
  chargeForDistance,
  formatPKR,
  MIN_ORDER,
  MAX_RADIUS_KM,
} from "@/lib/mock-data";
import { Minus, Plus, MapPin, Clock, Check, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function OrderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState({});
  const [addressId, setAddressId] = useState(ADDRESSES[0].id);
  const [slot, setSlot] = useState(TIME_SLOTS[0].id);
  const [notes, setNotes] = useState("");

  const address = ADDRESSES.find((a) => a.id === addressId);
  const inRange = address.km <= MAX_RADIUS_KM;

  const items = useMemo(
    () =>
      SERVICES.filter((s) => qty[s.id]).map((s) => ({
        ...s,
        q: qty[s.id],
        line: qty[s.id] * s.price,
      })),
    [qty],
  );
  const subtotal = items.reduce((s, i) => s + i.line, 0);
  const delivery = chargeForDistance(address.km);
  const total = subtotal + delivery;
  const meetsMin = subtotal >= MIN_ORDER;

  const inc = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + d) }));

  const confirm = () => {
    toast.success("Order placed! Tracking GL-10248");
    navigate({ to: "/orders/$id", params: { id: "GL-10248" } });
  };

  return (
    <CustomerShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
          Place an order
        </div>
        <h1 className="font-display text-4xl mt-2">Schedule your pickup</h1>

        {/* Stepper */}
        <div className="mt-8 flex items-center gap-2 sm:gap-4 overflow-x-auto">
          {["Services", "Address", "Time slot", "Review"].map((label, i) => {
            const n = i + 1;
            const done = step > n,
              active = step === n;
            return (
              <div key={label} className="flex items-center gap-2 sm:gap-4 shrink-0">
                <button
                  onClick={() => setStep(n)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition ${active ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]" : done ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full grid place-items-center text-[11px] ${done ? "bg-[color:var(--gold)] text-[color:var(--primary-foreground)]" : active ? "bg-[color:var(--gold)]/20 text-[color:var(--gold)]" : "bg-[color:var(--input)]"}`}
                  >
                    {done ? <Check className="w-3 h-3" /> : n}
                  </span>
                  {label}
                </button>
                {i < 3 && <div className="w-8 h-px bg-border" />}
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            {step === 1 && (
              <Section title="Select services">
                <div className="space-y-2">
                  {SERVICES.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[color:var(--input)]/40 hover:bg-[color:var(--input)] transition border border-transparent hover:border-[color:var(--gold)]/20"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.desc}</div>
                      </div>
                      <div className="text-sm gold-text font-medium whitespace-nowrap">
                        {formatPKR(s.price)}
                        <span className="text-[10px] text-muted-foreground"> / {s.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-background rounded-full p-1">
                        <button
                          onClick={() => inc(s.id, -1)}
                          className="w-7 h-7 grid place-items-center rounded-full hover:bg-[color:var(--secondary)]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {qty[s.id] || 0}
                        </span>
                        <button
                          onClick={() => inc(s.id, 1)}
                          className="w-7 h-7 grid place-items-center rounded-full hover:bg-[color:var(--gold)] hover:text-[color:var(--primary-foreground)] transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {step === 2 && (
              <Section title="Pickup address">
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADDRESSES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAddressId(a.id)}
                      className={`text-left p-4 rounded-xl border transition ${addressId === a.id ? "border-[color:var(--gold)] bg-[color:var(--gold)]/5" : "border-border bg-[color:var(--input)]/40 hover:border-border/80"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                        <span className="font-medium text-sm">{a.label}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{a.km} km</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {a.line}, {a.city}
                      </div>
                    </button>
                  ))}
                  <button className="p-4 rounded-xl border-2 border-dashed border-border hover:border-[color:var(--gold)]/50 text-sm text-muted-foreground transition">
                    + Add new address
                  </button>
                </div>

                <div className="mt-5 rounded-xl overflow-hidden border border-border h-56 relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 40%, oklch(0.78 0.12 85 / 0.15), transparent 50%), linear-gradient(135deg, oklch(0.22 0.02 252), oklch(0.18 0.02 252))",
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 224">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={"h" + i}
                        x1="0"
                        x2="400"
                        y1={i * 20}
                        y2={i * 20}
                        stroke="oklch(0.78 0.12 85)"
                        strokeWidth="0.5"
                      />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line
                        key={"v" + i}
                        x1={i * 22}
                        x2={i * 22}
                        y1="0"
                        y2="224"
                        stroke="oklch(0.78 0.12 85)"
                        strokeWidth="0.5"
                      />
                    ))}
                  </svg>
                  <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="w-10 h-10 rounded-full grid place-items-center text-[10px] font-bold"
                      style={{
                        background: "var(--gradient-gold)",
                        color: "var(--primary-foreground)",
                      }}
                    >
                      W
                    </div>
                    <div className="text-[10px] text-center mt-1 text-muted-foreground">
                      Warehouse
                    </div>
                  </div>
                  <div className="absolute top-1/3 right-1/4 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-[color:var(--card)] border-2 border-[color:var(--gold)] grid place-items-center">
                      <MapPin className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                    </div>
                    <div className="text-[10px] text-center mt-1">You</div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 glass rounded-lg p-3 text-xs flex items-center justify-between">
                    <span>Distance from warehouse</span>
                    <span className="font-medium gold-text">{address.km} km</span>
                  </div>
                </div>

                {!inRange && (
                  <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-[color:var(--destructive)]/10 border border-[color:var(--destructive)]/30 text-sm">
                    <AlertTriangle className="w-4 h-4 text-[color:var(--destructive)] mt-0.5" />
                    <div>We're not in your area yet! Coming soon to your neighbourhood.</div>
                  </div>
                )}
              </Section>
            )}

            {step === 3 && (
              <Section title="Pickup time">
                <div className="grid sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSlot(s.id)}
                      className={`p-5 rounded-xl border text-left transition ${slot === s.id ? "border-[color:var(--gold)] bg-[color:var(--gold)]/5" : "border-border bg-[color:var(--input)]/40"}`}
                    >
                      <Clock className="w-4 h-4 text-[color:var(--gold)] mb-3" />
                      <div className="font-medium">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.time}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-5">
                  <Field label="Special instructions (optional)">
                    <Textarea
                      rows={4}
                      placeholder="E.g. delicate fabric, no starch, ring twice…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </Field>
                </div>
              </Section>
            )}

            {step === 4 && (
              <Section title="Review your order">
                <div className="space-y-3">
                  {items.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No items selected.</div>
                  ) : (
                    items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between text-sm py-2 border-b border-[color:var(--glass-border)]"
                      >
                        <div>
                          <div>{it.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {it.q} × {formatPKR(it.price)} / {it.unit}
                          </div>
                        </div>
                        <div className="font-medium">{formatPKR(it.line)}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-5 pt-4 border-t border-[color:var(--glass-border)] grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">Pickup</div>
                    <div className="mt-1">{address.label}</div>
                    <div className="text-xs text-muted-foreground">{address.line}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">Slot</div>
                    <div className="mt-1">{TIME_SLOTS.find((s) => s.id === slot).label}</div>
                    <div className="text-xs text-muted-foreground">
                      {TIME_SLOTS.find((s) => s.id === slot).time}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">Payment</div>
                    <div className="mt-1">Cash on Delivery</div>
                  </div>
                </div>
                {notes && (
                  <div className="mt-4 text-sm">
                    <div className="text-xs text-muted-foreground uppercase mb-1">Instructions</div>
                    {notes}
                  </div>
                )}
              </Section>
            )}

            <div className="flex justify-between">
              <GhostButton onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                Back
              </GhostButton>
              {step < 4 ? (
                <GoldButton
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && items.length === 0}
                >
                  Continue
                </GoldButton>
              ) : (
                <GoldButton
                  onClick={confirm}
                  disabled={!inRange || !meetsMin || items.length === 0}
                >
                  Place order — {formatPKR(total)}
                </GoldButton>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-4">
                Order summary
              </div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground py-6 text-center">
                  Add services to see your total.
                </div>
              ) : (
                <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {it.q} × {it.name}
                      </span>
                      <span>{formatPKR(it.line)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-5 pt-5 border-t border-[color:var(--glass-border)] space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery ({address.km} km)</span>
                  <span>{delivery === 0 ? "Free" : formatPKR(delivery)}</span>
                </div>
                <div className="flex justify-between text-base font-display pt-2 border-t border-[color:var(--glass-border)] mt-2">
                  <span>Total</span>
                  <span className="gold-text text-xl">{formatPKR(total)}</span>
                </div>
              </div>
              {!meetsMin && items.length > 0 && (
                <div className="mt-4 text-xs text-[color:var(--warning)]">
                  Minimum order Rs. {MIN_ORDER}. Add Rs. {MIN_ORDER - subtotal} more.
                </div>
              )}
              <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
                Final amount may adjust after garments are weighed/counted at pickup.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </CustomerShell>
  );
}
