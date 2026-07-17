// @ts-nocheck
import { useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Users, Shield } from "lucide-react";
import { UsersList } from "./components/users/UsersList";
import { RolesList } from "./components/roles/RolesList";

// ── Tab definitions ───────────────────────────────────────────────────────────

const TABS = [
  { key: "users", label: "Users", icon: Users },
  { key: "roles", label: "Roles",  icon: Shield },
] as const;

type Tab = (typeof TABS)[number]["key"];

// ── Main component ────────────────────────────────────────────────────────────

export function AdminUsers() {
  const [activeTab, setActiveTab] = useState<Tab>("users");

  return (
    <AdminShell
      title="Users & roles"
      subtitle="Manage back-office team members and their access permissions"
    >
      {/* ── Tab bar ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[color:var(--input)]/60 border border-[color:var(--glass-border)] w-fit mb-6">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-[color:var(--gold)] text-[color:var(--primary-foreground)] shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-[color:var(--secondary)]"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Tab panels ──────────────────────────────────────────── */}
      <div
        key={activeTab}
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
      >
        {activeTab === "users" && <UsersList />}
        {activeTab === "roles" && <RolesList />}
      </div>
    </AdminShell>
  );
}
