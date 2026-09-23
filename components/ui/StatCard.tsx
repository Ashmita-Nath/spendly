import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  change,
  trend,
  comparisonLabel = "vs last month",
  icon: Icon,
  accent = "indigo",
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  comparisonLabel?: string;
  icon: LucideIcon;
  accent?: "indigo" | "amber" | "cyan" | "emerald";
}) {
  const accentClasses: Record<string, string> = {
    indigo: "bg-indigo-50 text-brand-indigo",
    amber: "bg-amber-50 text-amber-600",
    cyan: "bg-cyan-50 text-brand-cyan",
    emerald: "bg-emerald-50 text-success",
  };
  const positive = trend === "up";
  return (
    <Card className="p-5 transition-shadow hover:shadow-pop">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-600">{label}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", accentClasses[accent])}>
          <Icon size={17} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">{value}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
            positive ? "bg-emerald-50 text-success" : "bg-red-50 text-danger"
          )}
        >
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
        <span className="text-ink-400">{comparisonLabel}</span>
      </div>
    </Card>
  );
}
