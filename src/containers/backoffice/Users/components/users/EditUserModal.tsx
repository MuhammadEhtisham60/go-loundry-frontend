// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { Field, Input, Select, GoldButton, GhostButton } from "@/components/ui-kit";
import { X, Check, Loader2 } from "lucide-react";
import { useUpdateTeamMemberMutation } from "@/services";
import type { TeamMember, Role } from "@/services";

interface EditUserModalProps {
  member: TeamMember;
  roles: Role[];
  onClose: () => void;
}

export function EditUserModal({ member, roles, onClose }: EditUserModalProps) {
  const [form, setForm] = useState({
    full_name: member.full_name,
    email: member.email,
    role_id: String(member.role?.id ?? ""),
    is_active: member.is_active,
  });
  const [updateMember, { isLoading }] = useUpdateTeamMemberMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMember({
        id: member.id,
        payload: {
          full_name: form.full_name,
          email: form.email,
          role_id: Number(form.role_id),
          is_active: form.is_active,
        },
      }).unwrap();
      toast.success("Team member updated");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update member");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass rounded-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-display text-2xl">Edit member</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name">
            <Input
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            />
          </Field>

          <Field label="Email address">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </Field>

          <Field label="Role">
            <Select
              value={form.role_id}
              onChange={(e) => setForm((f) => ({ ...f, role_id: e.target.value }))}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </Select>
          </Field>

          <Field label="Status">
            <Select
              value={String(form.is_active)}
              onChange={(e) =>
                setForm((f) => ({ ...f, is_active: e.target.value === "true" }))
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </Field>

          <div className="mt-5 flex justify-end gap-2">
            <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
            <GoldButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Save changes
            </GoldButton>
          </div>
        </form>
      </div>
    </div>
  );
}
