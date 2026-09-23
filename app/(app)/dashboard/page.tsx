"use client";

import { useState } from "react";
import { Wallet, Clock, CalendarClock, Landmark, Calendar } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { SpendChart } from "@/components/dashboard/SpendChart";
import { CategoryDonut } from "@/components/dashboard/CategoryDonut";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Select } from "@/components/ui/Input";

const DATE_RANGES = ["Today", "This week", "This month", "This quarter"];

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("This month");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Good morning, Ashmita 👋</h1>
          <p className="mt-1 text-sm text-ink-600">
            Here&apos;s what&apos;s happening with your business spending today.
          </p>
        </div>
        <div className="relative">
          <Calendar size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-40 pl-8">
            {DATE_RANGES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Spend"
          value="₹24.82L"
          change="+12.4%"
          trend="up"
          icon={Wallet}
          accent="indigo"
        />
        <StatCard
          label="Pending Approvals"
          value="₹3.43L"
          change="+4.1%"
          trend="up"
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Upcoming Payments"
          value="₹8.72L"
          change="-6.8%"
          trend="down"
          icon={CalendarClock}
          accent="cyan"
        />
        <StatCard
          label="Available Cash"
          value="₹42.16L"
          change="+9.2%"
          trend="up"
          icon={Landmark}
          accent="emerald"
        />
      </div>

      <AIInsights />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SpendChart />
        </div>
        <div className="lg:col-span-2">
          <CategoryDonut />
        </div>
      </div>

      <TransactionsTable />
    </div>
  );
}
