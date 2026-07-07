// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GhostButton, GoldButton, Field, Input, Select } from "@/components/ui-kit";
import { SERVICES, formatPKR } from "@/lib/mock-data";
import { Plus, Edit3, GripVertical, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminServices() {
  const [items, setItems] = useState(SERVICES);
  const [editing, setEditing] = useState(null);

  return (
    <AdminShell
      title="Services & pricing"
      subtitle="Add, edit, and reorder services shown in the customer app"
      actions={
        <GoldButton
          className="h-10 py-0"
          onClick={() =>
            setEditing({ id: "", name: "", desc: "", unit: "piece", price: 0, active: true })
          }
        >
          <Plus className="w-4 h-4" /> Add service
        </GoldButton>
      }
    >
      <Section>
        <div className="space-y-2">
          {items.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-[color:var(--input)]/40 hover:bg-[color:var(--input)] transition"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground truncate">{s.desc}</div>
              </div>
              <div className="text-sm gold-text font-medium whitespace-nowrap">
                {formatPKR(s.price)}{" "}
                <span className="text-[10px] text-muted-foreground">/ {s.unit}</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={s.active}
                  className="sr-only peer"
                  onChange={() => toast(`${s.name} ${s.active ? "disabled" : "enabled"}`)}
                />
                <span className="w-10 h-5 rounded-full bg-[color:var(--input)] border border-border peer-checked:bg-[color:var(--gold)]/30 peer-checked:border-[color:var(--gold)]/60 relative transition">
                  <span
                    className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition peer-checked:translate-x-5"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                </span>
              </label>
              <button
                onClick={() => setEditing(s)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {editing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            className="glass rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-2xl">
                {editing.id ? "Edit service" : "New service"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Service name">
                <Input defaultValue={editing.name} />
              </Field>
              <Field label="Description">
                <Input defaultValue={editing.desc} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit">
                  <Select defaultValue={editing.unit}>
                    <option>piece</option>
                    <option>kg</option>
                    <option>pair</option>
                    <option>order</option>
                  </Select>
                </Field>
                <Field label="Price (PKR)">
                  <Input type="number" defaultValue={editing.price} />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <GhostButton onClick={() => setEditing(null)}>Cancel</GhostButton>
              <GoldButton
                onClick={() => {
                  toast.success("Service saved");
                  setEditing(null);
                }}
              >
                Save
              </GoldButton>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
