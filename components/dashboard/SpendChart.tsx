"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { spendOverview, SpendRange } from "@/data/transactions";
import { formatCompactINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

const RANGES: { key: SpendRange; label: string }[] = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "3m", label: "3M" },
  { key: "12m", label: "12M" },
];

export function SpendChart() {
  const [range, setRange] = useState<SpendRange>("3m");
  const data = [...spendOverview[range]];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Spend Overview</h3>
          <p className="mt-0.5 text-xs text-ink-400">Actual vs. approved vs. projected spend</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                range === r.key ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-900"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="approvedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => formatCompactINR(v)}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
              width={64}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatCompactINR(value), name]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#actualFill)"
            />
            <Area
              type="monotone"
              dataKey="approved"
              name="Approved"
              stroke="#06B6D4"
              strokeWidth={2}
              fill="url(#approvedFill)"
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="Projected"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
