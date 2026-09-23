import { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export function SummaryStat({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-slate-50 text-ink-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", toneClasses[tone])}>
            <Icon className="h-4.5 w-4.5" size={18} />
          </div>
        ) : null}
        <div>
          <p className="text-xs font-medium text-ink-400">{label}</p>
          <p className="text-lg font-semibold text-ink-900">{value}</p>
        </div>
      </div>
    </Card>
  );
}
