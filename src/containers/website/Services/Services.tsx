// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/customer-shell";
import { GoldButton, Input } from "@/components/ui-kit";
import { SERVICES, formatPKR } from "@/lib/mock-data";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export function ServicesPage() {
  const [q, setQ] = useState("");
  const filtered = SERVICES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <CustomerShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">Catalogue</div>
        <h1 className="font-display text-5xl mt-3">Every fabric. Every finish.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Transparent pricing. Choose what you need and we'll handle the rest.
        </p>

        <div className="mt-8 max-w-md relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-11"
            placeholder="Search a service…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <div
              key={s.id}
              className="glass rounded-2xl p-5 hover:border-[color:var(--gold)]/30 transition group fade-in-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl grid place-items-center"
                  style={{ background: "color-mix(in oklab, var(--gold) 18%, transparent)" }}
                >
                  <Sparkles className="w-4 h-4 text-[color:var(--gold)]" />
                </div>
                {s.popular && (
                  <span className="text-[10px] tracking-widest uppercase gold-text font-medium">
                    Popular
                  </span>
                )}
              </div>
              <div className="font-display text-xl mt-4">{s.name}</div>
              <div className="text-sm text-muted-foreground mt-1 min-h-[40px]">{s.desc}</div>
              <div className="mt-5 pt-5 border-t border-[color:var(--glass-border)] flex items-center justify-between">
                <div>
                  <div className="font-display text-xl gold-text">{formatPKR(s.price)}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    per {s.unit}
                  </div>
                </div>
                <Link
                  to="/order"
                  className="w-9 h-9 rounded-full grid place-items-center bg-[color:var(--input)] hover:bg-[color:var(--gold)] hover:text-[color:var(--primary-foreground)] transition"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl">Need something custom?</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Bridal wear, leather, designer pieces — our concierge will handle it.
          </p>
          <Link to="/chat" className="inline-block mt-5">
            <GoldButton>Chat with concierge</GoldButton>
          </Link>
        </div>
      </section>
    </CustomerShell>
  );
}
