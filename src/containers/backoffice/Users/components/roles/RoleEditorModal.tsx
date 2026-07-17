// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { Field, Input, GoldButton, GhostButton } from "@/components/ui-kit";
import { X, Check, Loader2 } from "lucide-react";
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/services";
import { RolePermissionForm } from "./RolePermissionForm";
import type { Role } from "@/services";
import { extractApiError } from "@/lib/apiError";

interface RoleEditorModalProps {
  role?: Role;           // undefined = create mode
  onClose: () => void;
}

export function RoleEditorModal({ role, onClose }: RoleEditorModalProps) {
  const isEdit = !!role;
  const [name, setName] = useState(role?.name ?? "");
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(
    new Set(role?.permissions.map((p) => p.code) ?? [])
  );

  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const isLoading = isCreating || isUpdating;

  const handleToggle = (code: string) =>
    setSelectedCodes((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Role name is required");
      return;
    }
    if (selectedCodes.size === 0) {
      toast.error("Select at least one permission");
      return;
    }
    try {
      const payload = { name: name.trim(), permission_codes: [...selectedCodes] };
      if (isEdit) {
        await updateRole({ id: role.id, payload }).unwrap();
        toast.success("Role updated");
      } else {
        await createRole(payload).unwrap();
        toast.success("Role created");
      }
      onClose();
    } catch (err) {
      toast.error(extractApiError(err, "Failed to save role"));
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
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-display text-2xl">
            {isEdit ? "Edit role" : "Create role"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Role name">
            <Input
              placeholder="e.g. Custom Editor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Permissions
            </p>
            {/* ← isolated form sub-component */}
            <RolePermissionForm
              selectedCodes={selectedCodes}
              onToggle={handleToggle}
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
            <GoldButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {isEdit ? "Update role" : "Create role"}
            </GoldButton>
          </div>
        </form>
      </div>
    </div>
  );
}
