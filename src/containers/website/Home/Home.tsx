// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/customer-shell";
import { GoldButton, GhostButton } from "@/components/ui-kit";
import { ArrowRight, Truck, Sparkles, Clock, Shield, MapPin, Star, Check } from "lucide-react";
import heroImg from "@/assets/hero-laundry.jpg";
import ironImg from "@/assets/service-iron.jpg";
import washImg from "@/assets/service-wash.jpg";
import drycleanImg from "@/assets/service-dryclean.jpg";

export function Home() {
  return (
    <CustomerShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--success)]" />
              <span className="text-muted-foreground">
                Now serving across Lahore, Karachi & Islamabad
              </span>
            </div>
            <h1 className="mt-6 font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Luxury laundry,
              <br />
              <span className="gold-text">collected & delivered.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Book in seconds. We pick up from your door, give every garment the care it deserves,
              and bring it back pressed, folded, and pristine. Pay in cash on delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" search={{ tab: "signup" }}>
                <GoldButton>
                  Sign up <ArrowRight className="w-4 h-4" />
                </GoldButton>
              </Link>
              <Link to="/services">
                <GhostButton>Browse services</GhostButton>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "12k+", l: "Happy customers" },
                { v: "4.9★", l: "Avg. rating" },
                { v: "<24h", l: "Turnaround" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl gold-text">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-8 rounded-[3rem] opacity-30 blur-3xl"
              style={{ background: "var(--gradient-gold)" }}
            />
            <div className="relative rounded-[2rem] overflow-hidden glass float">
              <img
                src={heroImg}
                alt="Premium folded laundry on dark marble"
                width={1600}
                height={1200}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Truck className="w-4 h-4 text-[color:var(--primary-foreground)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">Next pickup • 2:30 PM</div>
                  <div className="text-xs text-muted-foreground">Rider 8 min away</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
                  On the way
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
            How it works
          </div>
          <h2 className="font-display text-4xl mt-3">Four taps. One concierge experience.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              i: Sparkles,
              t: "Pick services",
              d: "Browse our catalogue and select what you need.",
            },
            {
              i: MapPin,
              t: "Set address",
              d: "Pin your location. We verify service area instantly.",
            },
            { i: Clock, t: "Choose a slot", d: "Morning, afternoon, or evening — whatever fits." },
            { i: Truck, t: "Sit back", d: "Track every step. Pay cash on delivery." },
          ].map((s, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:border-[color:var(--gold)]/30 transition group"
            >
              <div
                className="w-12 h-12 rounded-xl grid place-items-center mb-4"
                style={{ background: "color-mix(in oklab, var(--gold) 18%, transparent)" }}
              >
                <s.i className="w-5 h-5 text-[color:var(--gold)]" />
              </div>
              <div className="font-display text-xl mb-1">{s.t}</div>
              <div className="text-sm text-muted-foreground">{s.d}</div>
              <div className="mt-4 text-xs text-muted-foreground opacity-50">Step 0{i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Services
            </div>
            <h2 className="font-display text-4xl mt-3">Treated with intention.</h2>
          </div>
          <Link
            to="/services"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              img: ironImg,
              t: "Iron & Press",
              d: "Crisp, hotel-grade finishing for every garment.",
              p: "From Rs. 60 / piece",
            },
            {
              img: washImg,
              t: "Wash & Fold",
              d: "Sorted, washed, dried, and folded by hand.",
              p: "From Rs. 250 / kg",
            },
            {
              img: drycleanImg,
              t: "Dry Cleaning",
              d: "Gentle solvent care for silks, suits & sarees.",
              p: "From Rs. 350 / piece",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="group glass rounded-2xl overflow-hidden hover:border-[color:var(--gold)]/30 transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-5">
                <div className="font-display text-xl">{s.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs gold-text font-medium tracking-wider">{s.p}</span>
                  <Link to="/order" className="text-xs hover:text-[color:var(--gold)] transition">
                    Order →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass rounded-3xl p-8 sm:p-12 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: "var(--gradient-gold)" }}
          />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Why GoLaundry
            </div>
            <h2 className="font-display text-4xl mt-3">A standard worth dressing up for.</h2>
            <p className="mt-4 text-muted-foreground">
              Every order is logged, photographed at intake, and tracked through our warehouse — so
              nothing ever goes missing, and nothing ever goes wrong.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Distance-fair delivery — free under 5 km",
                "Photo intake to protect your favourite garments",
                "Live order tracking & in-app support chat",
                "Cash on delivery, zero hidden charges",
              ].map((p) => (
                <div key={p} className="flex items-center gap-3 text-sm">
                  <span
                    className="w-5 h-5 rounded-full grid place-items-center"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <Check className="w-3 h-3 text-[color:var(--primary-foreground)]" />
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {[
              { i: Shield, t: "Insured care", d: "Up to Rs. 5,000 per garment." },
              { i: Clock, t: "Same-day express", d: "Add to any order." },
              { i: Star, t: "4.9 / 5", d: "Across 12,000+ orders." },
              { i: Truck, t: "Free pickup", d: "Within 5 km radius." },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl p-5 bg-[color:var(--card)]/60 border border-[color:var(--glass-border)]"
              >
                <c.i className="w-5 h-5 text-[color:var(--gold)]" />
                <div className="font-display text-lg mt-3">{c.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">Reviews</div>
          <h2 className="font-display text-4xl mt-3">Loved across the city.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              n: "Ayesha K.",
              r: "DHA Lahore",
              q: "My silk sarees came back like new. The packaging itself feels like a gift.",
            },
            {
              n: "Hamza I.",
              r: "Gulberg",
              q: "Riders are always on time. The app is honestly nicer than most banks.",
            },
            {
              n: "Sana R.",
              r: "Model Town",
              q: "Cancelled my old laundry guy after one order. Won't go back.",
            },
          ].map((t) => (
            <div key={t.n} className="glass rounded-2xl p-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[color:var(--gold)] text-[color:var(--gold)]"
                  />
                ))}
              </div>
              <p className="mt-4 font-display text-lg leading-snug">"{t.q}"</p>
              <div className="mt-4 text-xs">
                <div className="font-medium">{t.n}</div>
                <div className="text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-display text-5xl">
          Ready for a closet that <span className="gold-text">behaves</span>?
        </h2>
        <p className="mt-4 text-muted-foreground">Your first pickup is on us — within 5 km.</p>
        <div className="mt-8 inline-flex flex-wrap gap-3 justify-center">
          <Link to="/auth" search={{ tab: "signup" }}>
            <GoldButton>
              Sign up <ArrowRight className="w-4 h-4" />
            </GoldButton>
          </Link>
          <Link to="/services">
            <GhostButton>Browse services</GhostButton>
          </Link>
        </div>
      </section>
    </CustomerShell>
  );
}
