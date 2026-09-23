"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { transactions } from "@/data/transactions";
import { formatINR, formatShortDate } from "@/lib/utils";

const PAGE_SIZE = 6;

export function TransactionsTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...Array.from(new Set(transactions.map((t) => t.category)))];
  const statuses = ["All", "Approved", "Pending", "Rejected"];

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesQuery = t.merchant.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || t.category === category;
      const matchesStatus = status === "All" || t.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [query, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-ink-900">Recent Transactions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search merchant…"
              className="w-40 pl-8 sm:w-52"
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
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
      </CardHeader>

      {paged.length === 0 ? (
        <EmptyState title="No transactions match your filters" description="Try a different merchant, category, or status." />
      ) : (
        <>
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs text-ink-400">
                  <th className="px-5 py-3 font-medium">Merchant</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-medium text-ink-900">{t.merchant}</td>
                    <td className="px-5 py-3 text-ink-600">{t.category}</td>
                    <td className="px-5 py-3 text-ink-900">{formatINR(t.amount)}</td>
                    <td className="px-5 py-3 text-ink-600">{formatShortDate(t.date)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-5 py-3 text-ink-600">{t.method}</td>
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
  );
}
