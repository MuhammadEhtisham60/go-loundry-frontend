// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GhostButton } from "@/components/ui-kit";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { Bell, CheckCheck } from "lucide-react";
import { toast } from "sonner";

export function AdminNotifs() {
  return (
    <AdminShell
      title="Notifications"
      subtitle="System events and alerts"
      actions={
        <GhostButton className="h-10 py-0" onClick={() => toast.success("All marked as read")}>
          <CheckCheck className="w-4 h-4" /> Mark all read
        </GhostButton>
      }
    >
      <Section>
        <div className="space-y-2">
          {NOTIFICATIONS.map((n) => {
            const tone =
              n.tone === "success"
                ? "var(--success)"
                : n.tone === "warning"
                  ? "var(--warning)"
                  : "var(--gold)";
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-4 rounded-xl transition ${n.unread ? "bg-[color:var(--gold)]/5 border border-[color:var(--gold)]/20" : "bg-[color:var(--input)]/40"}`}
              >
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center"
                  style={{ background: `color-mix(in oklab, ${tone} 18%, transparent)` }}
                >
                  <Bell className="w-4 h-4" style={{ color: tone }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{n.title}</div>
                    {n.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.desc}</div>
                </div>
                <div className="text-[11px] text-muted-foreground whitespace-nowrap">{n.at}</div>
              </div>
            );
          })}
        </div>
      </Section>
    </AdminShell>
  );
}
