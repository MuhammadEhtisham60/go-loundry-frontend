// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GoldButton, Field, Input } from "@/components/ui-kit";
import { DELIVERY_TIERS, MAX_RADIUS_KM } from "@/lib/mock-data";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminZones() {
  const [tiers, setTiers] = useState(DELIVERY_TIERS);

  return (
    <AdminShell
      title="Zones & warehouse"
      subtitle="Configure delivery radius and distance-based charges"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Warehouse location">
          <div className="rounded-xl overflow-hidden border border-border h-72 relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.78 0.12 85 / 0.2), transparent 50%), linear-gradient(135deg, oklch(0.22 0.02 252), oklch(0.18 0.02 252))",
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 288">
              {Array.from({ length: 15 }).map((_, i) => (
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
                  y2="288"
                  stroke="oklch(0.78 0.12 85)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
            {/* radius circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {[60, 120, 180].map((r) => (
                <div
                  key={r}
                  className="absolute top-1/2 left-1/2 rounded-full border border-[color:var(--gold)]/30"
                  style={{ width: r * 2, height: r * 2, transform: "translate(-50%,-50%)" }}
                />
              ))}
              <div
                className="relative w-12 h-12 rounded-full grid place-items-center text-xs font-bold z-10"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 text-xs">
              <div className="text-muted-foreground">Service radius</div>
              <div className="font-display text-lg gold-text">{MAX_RADIUS_KM} km</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Latitude">
              <Input defaultValue="31.5204" />
            </Field>
            <Field label="Longitude">
              <Input defaultValue="74.3587" />
            </Field>
            <Field label="Address" hint="Warehouse street address">
              <Input defaultValue="Block 7, Industrial Estate, Lahore" className="col-span-2" />
            </Field>
            <Field label="Max service radius (km)">
              <Input type="number" defaultValue={MAX_RADIUS_KM} />
            </Field>
          </div>
          <div className="mt-4 flex justify-end">
            <GoldButton onClick={() => toast.success("Warehouse location updated")}>
              Save warehouse
            </GoldButton>
          </div>
        </Section>

        <Section
          title="Delivery charge tiers"
          action={
            <button
              onClick={() =>
                setTiers([
                  ...tiers,
                  {
                    from: tiers[tiers.length - 1].to,
                    to: tiers[tiers.length - 1].to + 5,
                    charge: 0,
                    label: "",
                  },
                ])
              }
              className="text-xs gold-text flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add tier
            </button>
          }
        >
          <div className="space-y-3">
            {tiers.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end p-4 rounded-xl bg-[color:var(--input)]/40"
              >
                <Field label="From (km)">
                  <Input type="number" defaultValue={t.from} />
                </Field>
                <Field label="To (km)">
                  <Input type="number" defaultValue={t.to} />
                </Field>
                <Field label="Charge (PKR)">
                  <Input type="number" defaultValue={t.charge} />
                </Field>
                <button
                  onClick={() => setTiers(tiers.filter((_, j) => j !== i))}
                  className="w-10 h-10 grid place-items-center rounded-lg text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-lg bg-[color:var(--gold)]/5 border border-[color:var(--gold)]/20 text-xs text-muted-foreground">
            Customers see the delivery charge in their order summary before confirming. Beyond{" "}
            {MAX_RADIUS_KM} km the order is rejected.
          </div>
          <div className="mt-4 flex justify-end">
            <GoldButton onClick={() => toast.success("Tiers updated")}>Save tiers</GoldButton>
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
