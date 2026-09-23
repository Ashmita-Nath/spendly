"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Zap, PieChart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

const DEMO_EMAIL = "demo@spendly.app";
const DEMO_PASSWORD = "demo123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Use the demo credentials shown below to sign in.");
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className="flex min-h-screen bg-ink-800">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px 600px at -10% -10%, rgba(99,102,241,0.35), transparent), radial-gradient(900px 500px at 110% 110%, rgba(6,182,212,0.25), transparent)",
          }}
        />
        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-indigo to-brand-violet text-white">
            <Sparkles size={18} />
          </div>
          <span className="text-lg font-semibold text-white">Spendly</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-semibold leading-tight text-white">
            Smart spending.
            <br />
            Clear decisions.
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Spendly brings expenses, bills, approvals and cash flow into one place, with AI-powered
            insight into where your business spend is actually going.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Zap, text: "Approve expenses and bills in seconds" },
              { icon: PieChart, text: "See spend by category and vendor at a glance" },
              { icon: ShieldCheck, text: "Bank-level visibility across every account" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <item.icon size={15} className="text-brand-cyan" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">© 2026 Spendly Labs. Portfolio demo project.</p>
      </div>

      <div className="flex w-full items-center justify-center bg-surface p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-indigo to-brand-violet text-white">
              <Sparkles size={16} />
            </div>
            <span className="text-base font-semibold text-ink-900">Spendly</span>
          </div>

          <h2 className="text-2xl font-semibold text-ink-900">Welcome back</h2>
          <p className="mt-1 text-sm text-ink-600">Manage your business spending smarter.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Signing in…" : "Continue"}
              {!loading ? <ArrowRight size={16} /> : null}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-ink-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <Button variant="secondary" size="lg" className="w-full" type="button">
            Continue with Google
          </Button>

          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-ink-600">
            <p className="font-medium text-ink-900">Demo credentials (prefilled)</p>
            <p className="mt-1">Email: demo@spendly.app</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
