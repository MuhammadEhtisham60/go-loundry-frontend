// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { Field, Input, Select, GoldButton, GhostButton } from "@/components/ui-kit";
import { X, Check, Loader2, Mail } from "lucide-react";
import { useInviteTeamMemberMutation } from "@/services";
import type { Role } from "@/services";

interface InviteUserModalProps {
  roles: Role[];
  onClose: () => void;
}

const USER_TYPES = [
  { value: "admin",       label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
  { value: "user",        label: "Standard User" },
] as const;

export function InviteUserModal({ roles, onClose }: InviteUserModalProps) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role_id: "",
    user_type: "admin",
  });
  const [inviteUser, { isLoading }] = useInviteTeamMemberMutation();

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.role_id) {
      toast.error("Full name, email and role are required");
      return;
    }
    try {
      const payload: any = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        role_id: Number(form.role_id),
        user_type: form.user_type,
      };
      if (form.phone.trim()) payload.phone = form.phone.trim();

      await inviteUser(payload).unwrap();
      toast.success(`Account created — credentials sent to ${form.email}`);
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create user");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-gray-500/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-[#35b3dc]/10 border border-[#35b3dc]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-display text-2xl">Create team member</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              A password will be auto-generated and emailed.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Form ──────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name">
            <Input
              placeholder="John Doe"
              value={form.full_name}
              onChange={set("full_name")}
              required
            />
          </Field>

          <Field label="Email address">
            <Input
              type="email"
              placeholder="john@golaundry.pk"
              value={form.email}
              onChange={set("email")}
              required
            />
          </Field>

          <Field label="Phone (optional)">
            <Input
              type="tel"
              placeholder="03000000000"
              value={form.phone}
              onChange={set("phone")}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Role">
              <Select value={form.role_id} onChange={set("role_id")} required>
                <option value="" disabled>Select role…</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </Select>
            </Field>

            <Field label="User type">
              <Select value={form.user_type} onChange={set("user_type")}>
                {USER_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </Select>
            </Field>
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[color:var(--gold)]/8 border border-[color:var(--gold)]/20 text-xs text-[color:var(--gold)]">
            <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Login credentials will be sent to <strong>{form.email || "their email"}</strong>. The user can log in immediately.
            </span>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
            <GoldButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Create & send credentials
            </GoldButton>
          </div>
        </form>
      </div>
    </div>
  );
}
