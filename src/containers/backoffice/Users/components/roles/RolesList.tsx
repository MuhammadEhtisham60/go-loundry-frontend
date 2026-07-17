// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { extractApiError } from "@/lib/apiError";
import { Edit3, Loader2, Plus, Shield, Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "../shared/DeleteConfirmModal";
import { RoleEditorModal } from "./RoleEditorModal";
import { useGetRolesQuery, useDeleteRoleMutation } from "@/services";
import type { Role } from "@/services";

export function RolesList() {
  const [editingRole, setEditingRole] = useState<Role | null | "new">(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const { data: rolesRes, isLoading } = useGetRolesQuery();
  const [deleteRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();

  const roles = rolesRes?.data ?? [];

  const handleDelete = async () => {
    if (!deletingRole) return;
    try {
      await deleteRole(deletingRole.id).unwrap();
      toast.success(`"${deletingRole.name}" role deleted`);
      setDeletingRole(null);
    } catch (err) {
      toast.error(extractApiError(err, "Cannot delete — users may still be assigned to this role"));
    }
  };

  return (
    <>
      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          {roles.length} role{roles.length !== 1 ? "s" : ""} defined
        </p>
        <button
          onClick={() => setEditingRole("new")}
          className="text-xs flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[color:var(--gold)]/10 text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20 transition-colors font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          New role
        </button>
      </div>

      {/* ── List ────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-[color:var(--primary)]" />
        </div>
      ) : roles.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          No roles yet. Create your first role.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-[color:var(--input)]/40 border border-[color:var(--glass-border)] group relative hover:border-[color:var(--gold)]/30 transition-colors"
            >
              {/* Role header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[color:var(--gold)] shrink-0" />
                  <span className="font-display text-base gold-text">{r.name}</span>
                </div>

                {/* Action buttons — appear on hover */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingRole(r)}
                    className="w-7 h-7 rounded-lg grid place-items-center hover:bg-[color:var(--secondary)] text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit role"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setDeletingRole(r)}
                    className="w-7 h-7 rounded-lg grid place-items-center hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                    title="Delete role"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Permission pills */}
              {r.permissions.length === 0 ? (
                <p className="text-[10px] text-muted-foreground italic">No permissions assigned</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {r.permissions.map((p) => (
                    <span
                      key={p.code}
                      className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-background border border-border"
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Permission count badge */}
              <div className="absolute top-3 right-10 opacity-0 group-hover:opacity-0">
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modals ──────────────────────────────────────────────── */}
      {editingRole && (
        <RoleEditorModal
          role={editingRole === "new" ? undefined : editingRole}
          onClose={() => setEditingRole(null)}
        />
      )}

      {deletingRole && (
        <DeleteConfirmModal
          label={deletingRole.name}
          onConfirm={handleDelete}
          onClose={() => setDeletingRole(null)}
          isLoading={deleteLoading}
        />
      )}
    </>
  );
}
