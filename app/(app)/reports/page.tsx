"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { categorySpend } from "@/data/transactions";
import { formatCompactINR } from "@/lib/utils";

const REPORTS = [
  { title: "Monthly Spend", description: "Total spend broken down by month." },
  { title: "Department Spend", description: "Spend by team — Engineering, Sales, Marketing, Ops." },
  { title: "Vendor Spend", description: "Top vendors ranked by year-to-date spend." },
  { title: "Expense Trends", description: "Month-over-month trend across expense categories." },
  { title: "Cash Flow", description: "Historical and projected cash position." },
  { title: "Budget vs Actual", description: "How each department is tracking against budget." },
];

const departmentSpend = [
  { department: "Engineering", value: 980000 },
  { department: "Sales", value: 640000 },
  { department: "Marketing", value: 512000 },
  { department: "Operations", value: 350450 },
];

export default function ReportsPage() {
  const { push } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Ready-made views into how your business is spending."
        actions={
          <Button variant="secondary" onClick={() => push("Report export started.", "info")}>
            <Download size={16} /> Export Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-ink-900">Spend by Category</h3>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySpend} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tickFormatter={(v) => formatCompactINR(v)} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" width={80} tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatCompactINR(v)} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-ink-900">Department Spend</h3>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentSpend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => formatCompactINR(v)} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={60} />
                <Tooltip formatter={(v: number) => formatCompactINR(v)} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">All reports</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r) => (
            <Card key={r.title} className="p-4 transition-shadow hover:shadow-pop">
              <p className="text-sm font-medium text-ink-900">{r.title}</p>
              <p className="mt-1 text-xs text-ink-400">{r.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 -ml-2"
                onClick={() => push(`${r.title} report is ready to view.`, "info")}
              >
                View report
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
