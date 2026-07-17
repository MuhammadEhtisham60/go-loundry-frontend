// @ts-nocheck
import { Loader2, RefreshCw } from "lucide-react";
import { useGetPermissionsQuery } from "@/services";
import type { Permission } from "@/services";

interface RolePermissionFormProps {
  selectedCodes: Set<string>;
  onToggle: (code: string) => void;
}

export function RolePermissionForm({ selectedCodes, onToggle }: RolePermissionFormProps) {
  const {
    data: permsRes,
    isLoading,
    isError,
    refetch,
  } = useGetPermissionsQuery();

  const allPermissions: Permission[] =
    permsRes?.data ?? (Array.isArray(permsRes) ? permsRes : []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Loading permissions…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 py-3 text-xs text-red-400">
        <span>Failed to load permissions.</span>
        <button
          type="button"
          onClick={() => refetch()}
          className="underline underline-offset-2 hover:opacity-80 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  if (allPermissions.length === 0) {
    return (
      <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
        <span>No permissions found.</span>
        <button
          type="button"
          onClick={() => refetch()}
          className="underline underline-offset-2 hover:opacity-80 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allPermissions.map((p) => {
        const active = selectedCodes.has(p.code);
        return (
          <button
            key={p.code}
            type="button"
            onClick={() => onToggle(p.code)}
            className={`text-[11px] uppercase tracking-widest px-2.5 py-1.5 rounded-full border transition-colors ${
              active
                ? "bg-[color:var(--gold)] text-[color:var(--primary-foreground)] border-transparent"
                : "border-border hover:border-[color:var(--gold)]/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
