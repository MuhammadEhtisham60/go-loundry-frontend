// @ts-nocheck
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Sparkles,
  MapPin,
  MessageSquare,
  Star,
  BarChart3,
  Settings,
  Shield,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    label: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
      { to: "/admin/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/admin/services", label: "Services & Pricing", icon: Sparkles },
      { to: "/admin/zones", label: "Zones & Warehouse", icon: MapPin },
      { to: "/admin/chats", label: "Support Chats", icon: MessageSquare },
      { to: "/admin/ratings", label: "Ratings", icon: Star },
    ],
  },
  {
    label: "Insights",
    items: [{ to: "/admin/reports", label: "Reports", icon: BarChart3 }],
  },
  {
    label: "System",
    items: [
      { to: "/admin/users", label: "Users & Roles", icon: Shield },
      { to: "/admin/notifications", label: "Notifications", icon: Bell },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminShell({ children, title, subtitle, actions }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (it) =>
    it.exact ? pathname === it.to : pathname === it.to || pathname.startsWith(it.to + "/");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 bg-[color:var(--sidebar)] border-r border-[color:var(--sidebar-border)] transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-[color:var(--sidebar-border)]">
          <Link to="/admin" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md grid place-items-center"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary-foreground)]" />
            </div>
            <div>
              <div className="font-display text-lg leading-none">GoLaundry</div>
              <div className="text-[9px] tracking-[0.25em] text-muted-foreground uppercase mt-1">
                Back Office
              </div>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-5 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {sections.map((sec) => (
            <div key={sec.label}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {sec.label}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((it) => {
                  const active = isActive(it);
                  return (
                    <Link
                      key={it.to}
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition relative ${active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-[color:var(--muted)]"}`}
                    >
                      {active && (
                        <span
                          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                          style={{ background: "var(--gradient-gold)" }}
                        />
                      )}
                      <it.icon className={`w-4 h-4 ${active ? "text-[color:var(--gold)]" : ""}`} />
                      {it.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="px-3 pt-4 border-t border-[color:var(--sidebar-border)]">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-[color:var(--muted)]"
            >
              <LogOut className="w-4 h-4" /> Exit to App
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 glass border-b border-[color:var(--glass-border)]">
          <div className="h-16 px-4 sm:px-8 flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-xl truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 h-10 rounded-full bg-[color:var(--input)] w-72">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                className="bg-transparent text-sm flex-1 outline-none"
                placeholder="Search orders, customers…"
              />
              <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <button className="w-10 h-10 grid place-items-center rounded-full hover:bg-[color:var(--muted)] relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[color:var(--gold)] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div
                className="w-9 h-9 rounded-full grid place-items-center text-xs font-medium"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                IS
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-medium">Imran S.</div>
                <div className="text-[10px] text-muted-foreground">Super Admin</div>
              </div>
            </div>
          </div>
          {actions && <div className="px-4 sm:px-8 pb-4 flex flex-wrap gap-2">{actions}</div>}
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
