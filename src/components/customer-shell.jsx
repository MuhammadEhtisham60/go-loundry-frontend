// @ts-nocheck
import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Home, ListOrdered, MessageCircle, User, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/orders", label: "Orders", icon: ListOrdered },
  { to: "/chat", label: "Support", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
];

export function CustomerShell({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onAdmin = pathname.startsWith("/admin");
  if (onAdmin) return children;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 glass border-b border-[color:var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-full grid place-items-center"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary-foreground)]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg">
                Go<span className="gold-text">Laundry</span>
              </div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                Clean, Delivered
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-full text-sm transition ${active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-[color:var(--muted)]"}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button className="w-10 h-10 grid place-items-center rounded-full hover:bg-[color:var(--muted)] relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[color:var(--gold)] rounded-full"></span>
            </button>
            <Link
              to="/auth"
              search={{ tab: "signup" }}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-elegant hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden w-10 h-10 grid place-items-center"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[color:var(--glass-border)] px-4 py-4 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[color:var(--muted)]"
              >
                <n.icon className="w-4 h-4 text-[color:var(--gold)]" />
                {n.label}
              </Link>
            ))}
            <Link
              to="/auth"
              search={{ tab: "signup" }}
              onClick={() => setOpen(false)}
              className="block text-center mt-3 px-5 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-elegant hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[color:var(--glass-border)] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-display text-2xl mb-2">
              Go<span className="gold-text">Laundry</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Premium on-demand laundry service across Lahore, Karachi, and Islamabad.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-3">
              Services
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Wash & Iron</li>
              <li>Dry Cleaning</li>
              <li>Express Service</li>
              <li>Shoe Cleaning</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-3">
              Company
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/services">Pricing</Link>
              </li>
              <li>
                <Link to="/chat">Support</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-3">
              Contact
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>0800-LAUNDRY</li>
              <li>hello@golaundry.pk</li>
              <li>Mon–Sun, 8am–10pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[color:var(--glass-border)] py-6 text-center text-xs text-muted-foreground">
          © 2026 GoLaundry • Made with care in Pakistan
        </div>
      </footer>
    </div>
  );
}
