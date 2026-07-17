// @ts-nocheck
import { useMemo, useState } from "react";
import { Edit3, Loader2, Plus, Trash2 } from "lucide-react";
import { GoldButton } from "@/components/ui-kit";
import { Avatar } from "../shared/Avatar";
import { RoleBadge } from "../shared/RoleBadge";
import { DeleteConfirmModal } from "../shared/DeleteConfirmModal";
import { InviteUserModal } from "./InviteUserModal";
import { EditUserModal } from "./EditUserModal";
import {
  useGetTeamMembersQuery,
  useDeleteTeamMemberMutation,
  useGetRolesQuery,
} from "@/services";
import type { TeamMember } from "@/services";
import { toast } from "sonner";

// ── helpers ──────────────────────────────────────────────────────────────────

function formatLastActive(ts: string | null) {
  if (!ts) return "Never";
  const d = new Date(ts);
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString();
}

// ── component ─────────────────────────────────────────────────────────────────

export function UsersList() {
  const [search, setSearch] = useState("");
  const [inviting, setInviting] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);

  const { data: membersRes, isLoading } = useGetTeamMembersQuery();
  const { data: rolesRes } = useGetRolesQuery();
  const [deleteMember, { isLoading: deleteLoading }] = useDeleteTeamMemberMutation();

  const members = membersRes?.data ?? [];
  const roles = rolesRes?.data ?? [];

  const filtered = useMemo(
    () =>
      search.trim()
        ? members.filter(
            (m) =>
              m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
              m.email?.toLowerCase().includes(search.toLowerCase()) ||
              m.role?.name?.toLowerCase().includes(search.toLowerCase())
          )
        : members,
    [members, search]
  );

  const handleDelete = async () => {
    if (!deletingMember) return;
    try {
      await deleteMember(deletingMember.id).unwrap();
      toast.success(`${deletingMember.full_name} removed`);
      setDeletingMember(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to remove member");
    }
  };

  return (
    <>
      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            className="w-full h-9 pl-9 pr-4 rounded-xl bg-[color:var(--input)] border border-[color:var(--glass-border)] text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[color:var(--gold)]/50"
            placeholder="Search members…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Invite button */}
        <GoldButton className="h-9 py-0" onClick={() => setInviting(true)}>
          <Plus className="w-4 h-4" />
          Invite user
        </GoldButton>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          {search ? "No members match your search." : "No team members yet. Invite someone!"}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr className="text-left">
                <th className="py-3 px-3 font-medium">User</th>
                <th className="py-3 px-3 font-medium">Role</th>
                <th className="py-3 px-3 font-medium">Last active</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="border-t border-[color:var(--glass-border)] hover:bg-[color:var(--secondary)]/30 transition-colors"
                >
                  {/* User */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={m.avatar_initials} name={m.full_name} />
                      <div>
                        <div className="font-medium">{m.full_name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3 px-3">
                    {m.role ? (
                      <RoleBadge name={m.role.name} />
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>

                  {/* Last active */}
                  <td className="py-3 px-3 text-muted-foreground text-xs">
                    {formatLastActive(m.last_active)}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    {m.invite_status === "pending" ? (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        Pending
                      </span>
                    ) : m.is_active ? (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-zinc-500/15 text-zinc-400 border border-zinc-500/30">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => setEditingMember(m)}
                        className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[color:var(--secondary)] text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit member"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingMember(m)}
                        className="w-8 h-8 rounded-lg grid place-items-center hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modals ──────────────────────────────────────────────── */}
      {inviting && (
        <InviteUserModal roles={roles} onClose={() => setInviting(false)} />
      )}

      {editingMember && (
        <EditUserModal
          member={editingMember}
          roles={roles}
          onClose={() => setEditingMember(null)}
        />
      )}

      {deletingMember && (
        <DeleteConfirmModal
          label={deletingMember.full_name}
          onConfirm={handleDelete}
          onClose={() => setDeletingMember(null)}
          isLoading={deleteLoading}
        />
      )}
    </>
  );
}
