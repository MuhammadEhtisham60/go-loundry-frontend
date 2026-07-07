// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Login from "./authcomponent/Login";
import SignUp from "./authcomponent/SignUp";
import ForgotPassword from "./authcomponent/ForgotPassword";

export function AuthPage() {
  const [tab, setTab] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("tab") || "login";
    }
    return "login";
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--background)" }} />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--primary)" }}
        />
        <div className="relative max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div
              className="w-10 h-10 rounded-full grid place-items-center"
              style={{ background: "var(--primary)" }}
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary-foreground)]" />
            </div>
            <span className="font-display text-2xl">
              Go<span className="gold-text">Laundry</span>
            </span>
          </Link>
          <h2 className="font-display text-5xl leading-[1.1]">
            Step into a <span className="gold-text">cleaner</span> ritual.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Sign in to schedule pickups, track every step, and rate your concierge — all in one
            elegant place.
          </p>
          <div className="mt-12 glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-2">
              Today's pickup window
            </div>
            <div className="font-display text-2xl">2:00 PM – 4:00 PM</div>
            <div className="text-xs text-muted-foreground mt-1">
              3 riders available in your area.
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="w-9 h-9 rounded-full grid place-items-center"
              style={{ background: "var(--primary)" }}
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary-foreground)]" />
            </div>
            <span className="font-display text-xl">
              Go<span className="gold-text">Laundry</span>
            </span>
          </Link>

          {tab !== "forgot" && (
            <div className="glass rounded-2xl p-1 inline-flex w-full mb-6">
              {["login", "signup"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"} cursor-pointer`}
                >
                  {t === "login" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl">
            {tab === "login" && "Welcome back"}
            {tab === "signup" && "Create your account"}
            {tab === "forgot" && "Reset password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {tab === "login" && "Enter your details to continue"}
            {tab === "signup" && "It takes less than a minute"}
            {tab === "forgot" && "6 digit code sent to mail"}
          </p>

          <div className="mt-6">
            {tab === "login" && <Login setTab={setTab} />}
            {tab === "signup" && <SignUp setTab={setTab} />}
            {tab === "forgot" && <ForgotPassword setTab={setTab} />}
          </div>

          {tab !== "forgot" && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border" />
                OR
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-11 rounded-xl border border-border text-sm hover:bg-[color:var(--muted)] transition flex items-center justify-center gap-2">
                  Google
                </button>
                <button className="h-11 rounded-xl border border-border text-sm hover:bg-[color:var(--muted)] transition flex items-center justify-center gap-2">
                  Facebook
                </button>
              </div>
            </>
          )}
          <p className="mt-6 text-xs text-center text-muted-foreground">
            By continuing you agree to our <a className="gold-text">Terms</a> &{" "}
            <a className="gold-text">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
