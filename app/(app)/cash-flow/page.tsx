"use client";

import { Wallet, ArrowDownToLine, ArrowUpFromLine, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { SummaryStat } from "@/components/ui/SummaryStat";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { cashFlowSeries } from "@/data/misc";
import { formatINR, formatCompactINR } from "@/lib/utils";

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Cash Flow" subtitle="Historical and projected cash position across your accounts." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryStat label="Current Balance" value={formatINR(4215600)} icon={Wallet} />
        <SummaryStat label="Expected Inflow" value={formatINR(1842000)} icon={ArrowDownToLine} tone="success" />
        <SummaryStat label="Expected Outflow" value={formatINR(1284000)} icon={ArrowUpFromLine} tone="warning" />
        <SummaryStat label="Projected Balance" value={formatINR(4773000)} icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-sm font-semibold text-ink-900">Cash Flow Forecast</h3>
          <p className="mt-0.5 text-xs text-ink-400">Solid line is historical, dashed line is projected</p>
        </CardHeader>
        <CardContent className="h-80 pl-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="historicalFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
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
              <Tooltip formatter={(value: number) => formatCompactINR(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="historical"
                name="Historical"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#historicalFill)"
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="projected"
                name="Projected"
                stroke="#06B6D4"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
