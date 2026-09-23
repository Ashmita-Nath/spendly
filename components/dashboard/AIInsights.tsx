import { Sparkles, TrendingUp, AlertTriangle, PiggyBank, Plane } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    text: "Software spending increased 18% this month, driven mostly by AWS and Adobe renewals.",
  },
  {
    icon: AlertTriangle,
    text: "3 recurring subscriptions have not been used in the last 30 days.",
  },
  {
    icon: PiggyBank,
    text: "You could save approximately ₹42,500/month by reviewing unused subscriptions.",
  },
  {
    icon: Plane,
    text: "Travel expenses are 12% above your monthly average — mostly client visit flights.",
  },
];

export function AIInsights() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-5 shadow-card">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-indigo to-brand-violet text-white">
          <Sparkles size={15} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Spendly AI Insights</h3>
          <p className="text-xs text-ink-400">AI-powered insight, based on this month&apos;s activity (demo data)</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-white bg-white/70 p-3 text-sm text-ink-600 backdrop-blur-sm"
            >
              <Icon size={15} className="mt-0.5 shrink-0 text-brand-violet" />
              {insight.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
