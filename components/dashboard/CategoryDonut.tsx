"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { categorySpend } from "@/data/transactions";
import { formatCompactINR } from "@/lib/utils";

export function CategoryDonut() {
  const total = categorySpend.reduce((sum, c) => sum + c.value, 0);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-sm font-semibold text-ink-900">Spend by Category</h3>
        <p className="mt-0.5 text-xs text-ink-400">This month, across {categorySpend.length} categories</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySpend}
                dataKey="value"
                nameKey="category"
                innerRadius={58}
                outerRadius={80}
                paddingAngle={2}
                strokeWidth={0}
              >
                {categorySpend.map((c) => (
                  <Cell key={c.category} fill={c.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCompactINR(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-ink-400">Total</span>
            <span className="text-base font-semibold text-ink-900">{formatCompactINR(total)}</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {categorySpend.map((c) => (
            <div key={c.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-ink-600">{c.category}</span>
              </div>
              <span className="font-medium text-ink-900">{formatCompactINR(c.value)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
