"use client";

import { useMemo, useState } from "react";
import { Plus, Download, Search, Receipt, Clock, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SummaryStat } from "@/components/ui/SummaryStat";
import { Input, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddExpenseDrawer } from "@/components/expenses/AddExpenseDrawer";
import { useToast } from "@/components/ui/Toast";
import { expenses as initialExpenses } from "@/data/expenses";
import { Expense } from "@/types";
import { formatINR, formatShortDate } from "@/lib/utils";

const PAGE_SIZE = 8;

export default function ExpensesPage() {
  const { push } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...Array.from(new Set(expenses.map((e) => e.category)))];

  const totals = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const pending = expenses.filter((e) => e.status === "Pending").reduce((s, e) => s + e.amount, 0);
    const approved = expenses.filter((e) => e.status === "Approved").reduce((s, e) => s + e.amount, 0);
    const rejected = expenses.filter((e) => e.status === "Rejected").reduce((s, e) => s + e.amount, 0);
    return { total, pending, approved, rejected };
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesQuery =
        e.merchant.toLowerCase().includes(query.toLowerCase()) ||
        e.employee.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || e.category === category;
      const matchesStatus = status === "All" || e.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [expenses, query, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        subtitle="Track, review and manage business spending."
        actions={
          <>
            <Button variant="secondary" onClick={() => push("Export started — a CSV will download shortly.", "info")}>
              <Download size={16} /> Export
            </Button>
            <Button onClick={() => setDrawerOpen(true)}>
              <Plus size={16} /> Add Expense
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryStat label="Total Expenses" value={formatINR(totals.total)} icon={Receipt} />
        <SummaryStat label="Pending" value={formatINR(totals.pending)} icon={Clock} tone="warning" />
        <SummaryStat label="Approved" value={formatINR(totals.approved)} icon={CheckCircle2} tone="success" />
        <SummaryStat label="Rejected" value={formatINR(totals.rejected)} icon={XCircle} tone="danger" />
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-ink-900">All expenses</h3>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search merchant or employee…"
                className="w-44 pl-8 sm:w-60"
              />
            </div>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-32"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-32"
            >
              {["All", "Approved", "Pending", "Rejected"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>

        {paged.length === 0 ? (
          <EmptyState title="No expenses found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <div className="overflow-x-auto scroll-thin">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-ink-400">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Merchant</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((e) => (
                    <tr key={e.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                      <td className="px-5 py-3 text-ink-900">{e.employee}</td>
                      <td className="px-5 py-3 font-medium text-ink-900">{e.merchant}</td>
                      <td className="px-5 py-3 text-ink-600">{e.category}</td>
                      <td className="px-5 py-3 text-ink-900">{formatINR(e.amount)}</td>
                      <td className="px-5 py-3 text-ink-600">{formatShortDate(e.date)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={e.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-xs text-ink-400">
              <span>
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-slate-200 px-2.5 py-1 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-md border border-slate-200 px-2.5 py-1 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </Card>

      <AddExpenseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={(expense) => {
          setExpenses((prev) => [expense, ...prev]);
          push("Expense added and sent for approval.");
        }}
      />
    </div>
  );
}
