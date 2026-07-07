// @ts-nocheck
import { CustomerShell } from "@/components/customer-shell";
import { CURRENT_USER, ADDRESSES, ORDERS, formatPKR } from "@/lib/mock-data";
import { Section, Field, Input, GoldButton, GhostButton } from "@/components/ui-kit";
import { MapPin, Bell, Shield, LogOut, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export function ProfilePage() {
  const u = CURRENT_USER;
  const totalSpend = ORDERS.filter((o) => o.status === "delivered").reduce(
    (s, o) => s + o.total,
    0,
  );

  return (
    <CustomerShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">Account</div>
        <h1 className="font-display text-4xl mt-2">Profile</h1>

        <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 text-center">
              <div
                className="w-20 h-20 rounded-full grid place-items-center mx-auto font-display text-2xl"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                {u.initials}
              </div>
              <div className="font-display text-xl mt-3">{u.name}</div>
              <div className="text-xs text-muted-foreground">{u.email}</div>
              <div className="mt-4 pt-4 border-t border-[color:var(--glass-border)] grid grid-cols-2 text-xs">
                <div>
                  <div className="font-display text-lg gold-text">{ORDERS.length}</div>
                  <div className="text-muted-foreground">Orders</div>
                </div>
                <div>
                  <div className="font-display text-lg gold-text">{formatPKR(totalSpend)}</div>
                  <div className="text-muted-foreground">Spent</div>
                </div>
              </div>
            </div>
            <nav className="glass rounded-2xl p-2 text-sm">
              {[
                { i: Bell, l: "Notifications" },
                { i: Shield, l: "Security" },
                { i: LogOut, l: "Sign out", danger: true },
              ].map((m) => (
                <button
                  key={m.l}
                  onClick={() => toast(m.l)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[color:var(--muted)] transition ${m.danger ? "text-[color:var(--destructive)]" : ""}`}
                >
                  <m.i className="w-4 h-4" /> {m.l}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <Section title="Personal information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name">
                  <Input defaultValue={u.name} />
                </Field>
                <Field label="Email">
                  <Input defaultValue={u.email} />
                </Field>
                <Field label="Phone">
                  <Input defaultValue={u.phone} />
                </Field>
                <Field label="Preferred language">
                  <Input defaultValue="English" disabled />
                </Field>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <GhostButton>Cancel</GhostButton>
                <GoldButton onClick={() => toast.success("Profile saved")}>Save changes</GoldButton>
              </div>
            </Section>

            <Section title="Saved addresses" action={<GhostButton>+ Add address</GhostButton>}>
              <div className="space-y-2">
                {ADDRESSES.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[color:var(--input)]/40"
                  >
                    <div
                      className="w-9 h-9 rounded-lg grid place-items-center"
                      style={{ background: "color-mix(in oklab, var(--gold) 18%, transparent)" }}
                    >
                      <MapPin className="w-4 h-4 text-[color:var(--gold)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{a.label}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {a.line}, {a.city}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {a.km} km
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Preferences">
              <div className="space-y-3">
                {[
                  {
                    l: "Promotional notifications",
                    d: "Get notified about offers and seasonal deals.",
                  },
                  { l: "SMS order updates", d: "Send key order updates via SMS." },
                  { l: "Order receipts via email", d: "Email a copy of every order summary." },
                ].map((p, i) => (
                  <div
                    key={p.l}
                    className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[color:var(--input)]/40"
                  >
                    <div>
                      <div className="text-sm font-medium">{p.l}</div>
                      <div className="text-xs text-muted-foreground">{p.d}</div>
                    </div>
                    <Switch defaultChecked={i !== 0} />
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>
    </CustomerShell>
  );
}

function Switch({ defaultChecked }) {
  return (
    <label className="inline-flex">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="w-11 h-6 rounded-full bg-[color:var(--input)] border border-border relative transition peer-checked:bg-[color:var(--gold)]/30 peer-checked:border-[color:var(--gold)]/60">
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition peer-checked:translate-x-5"
          style={{ background: "var(--gradient-gold)" }}
        />
      </span>
    </label>
  );
}
