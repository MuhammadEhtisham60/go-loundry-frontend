// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GoldButton, GhostButton, Field, Input, Select } from "@/components/ui-kit";
import { STAFF, ROLES } from "@/lib/mock-data";
import { Plus, Edit3, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminUsers() {
  const [inviting, setInviting] = useState(false);

  return (
    <AdminShell
      title="Users & roles"
      subtitle="Manage back office team members and their access"
      actions={
        <GoldButton className="h-10 py-0" onClick={() => setInviting(true)}>
          <Plus className="w-4 h-4" /> Invite user
        </GoldButton>
      }
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <Section title="Team members">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr className="text-left">
                  <th className="py-3 px-3 font-medium">User</th>
                  <th className="py-3 px-3 font-medium">Role</th>
                  <th className="py-3 px-3 font-medium">Last active</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {STAFF.map((u) => (
                  <tr key={u.id} className="border-t border-[color:var(--glass-border)]">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full grid place-items-center text-xs font-medium"
                          style={{
                            background: "var(--gradient-gold)",
                            color: "var(--primary-foreground)",
                          }}
                        >
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div>{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)] border border-[color:var(--gold)]/30">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{u.lastActive}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toast("Edit user")}
                        className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[color:var(--secondary)] ml-auto"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Roles & permissions">
          <div className="space-y-3">
            {ROLES.map((r) => (
              <div key={r.name} className="p-4 rounded-xl bg-[color:var(--input)]/40">
                <div className="font-display text-lg gold-text">{r.name}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.perms.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-background border border-border"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {inviting && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setInviting(false)}
        >
          <div
            className="glass rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-2xl">Invite team member</h2>
              <button
                onClick={() => setInviting(false)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Full name">
                <Input placeholder="Jane Smith" />
              </Field>
              <Field label="Email">
                <Input type="email" placeholder="jane@golaundry.pk" />
              </Field>
              <Field label="Role">
                <Select>
                  {ROLES.map((r) => (
                    <option key={r.name}>{r.name}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <GhostButton onClick={() => setInviting(false)}>Cancel</GhostButton>
              <GoldButton
                onClick={() => {
                  toast.success("Invitation sent");
                  setInviting(false);
                }}
              >
                <Check className="w-4 h-4" /> Send invite
              </GoldButton>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
