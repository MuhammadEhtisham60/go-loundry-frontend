// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, Field, Input, GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";

const groups = [
  {
    title: "Brand & business",
    fields: [
      { l: "Business name", v: "GoLaundry Pvt. Ltd." },
      { l: "Support email", v: "support@golaundry.pk" },
      { l: "Support phone", v: "0800-LAUNDRY" },
      { l: "Currency", v: "PKR (Rs.)" },
    ],
  },
  {
    title: "Operations",
    fields: [
      { l: "Service hours", v: "8:00 AM – 10:00 PM" },
      { l: "Minimum order (PKR)", v: "500" },
      { l: "Max service radius (km)", v: "15" },
      { l: "Express surcharge (PKR)", v: "300" },
    ],
  },
  {
    title: "Notifications",
    fields: [
      { l: "Twilio Account SID", v: "ACxxxxxxxxxxxxxxxx" },
      { l: "FCM server key", v: "AAAA••••••••••••" },
      { l: "From SMS sender ID", v: "GoLaundry" },
      { l: "Push title prefix", v: "GoLaundry" },
    ],
  },
];

export function AdminSettings() {
  return (
    <AdminShell title="Settings" subtitle="Configure your business, operations, and integrations">
      <div className="space-y-6 max-w-4xl">
        {groups.map((g) => (
          <Section key={g.title} title={g.title}>
            <div className="grid sm:grid-cols-2 gap-4">
              {g.fields.map((f) => (
                <Field key={f.l} label={f.l}>
                  <Input defaultValue={f.v} />
                </Field>
              ))}
            </div>
          </Section>
        ))}

        <Section title="Toggles">
          {[
            {
              l: "Allow order cancellation by customer",
              d: "Customers can cancel before pickup is scheduled.",
              on: true,
            },
            {
              l: "Require photo at pickup",
              d: "Staff captures garment photos during pickup.",
              on: true,
            },
            {
              l: "SMS fallback for push notifications",
              d: "Send key updates via SMS if push fails.",
              on: true,
            },
            { l: "Promotional notifications", d: "Allow opt-in promotional pushes.", on: false },
          ].map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 py-3 border-b border-[color:var(--glass-border)] last:border-0"
            >
              <div>
                <div className="text-sm font-medium">{t.l}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.d}</div>
              </div>
              <label className="inline-flex">
                <input type="checkbox" defaultChecked={t.on} className="peer sr-only" />
                <span className="w-11 h-6 rounded-full bg-[color:var(--input)] border border-border relative transition peer-checked:bg-[color:var(--gold)]/30 peer-checked:border-[color:var(--gold)]/60">
                  <span
                    className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition peer-checked:translate-x-5"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                </span>
              </label>
            </div>
          ))}
        </Section>

        <div className="flex justify-end">
          <GoldButton onClick={() => toast.success("Settings saved")}>Save all changes</GoldButton>
        </div>
      </div>
    </AdminShell>
  );
}
