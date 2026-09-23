"use client";

import { useMemo, useState } from "react";
import { Clock, CheckCircle2, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SummaryStat } from "@/components/ui/SummaryStat";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Drawer } from "@/components/ui/Drawer";
import { reimbursements as initial } from "@/data/misc";
import { Reimbursement } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";

export default function ReimbursementsPage() {
  const [items] = useState<Reimbursement[]>(initial);
  const [selected, setSelected] = useState<Reimbursement | null>(null);

  const totals = useMemo(() => {
    const pending = items.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
    const approved = items.filter((i) => i.status === "Approved").reduce((s, i) => s + i.amount, 0);
    const paid = items.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
    return { pending, approved, paid };
  }, [items]);

  return (
    <div className="space-y-6">
      <PageHeader title="Reimbursements" subtitle="Employee out-of-pocket expenses awaiting repayment." />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryStat label="Pending" value={formatINR(totals.pending)} icon={Clock} tone="warning" />
        <SummaryStat label="Approved" value={formatINR(totals.approved)} icon={CheckCircle2} tone="success" />
        <SummaryStat label="Paid" value={formatINR(totals.paid)} icon={Wallet} />
      </div>

      <Card>
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-ink-400">
                <th className="px-5 py-3 font-medium">Employee</th>
                <th className="px-5 py-3 font-medium">Expense</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3 font-medium text-ink-900">{r.employee}</td>
                  <td className="px-5 py-3 text-ink-600">{r.expense}</td>
                  <td className="px-5 py-3 text-ink-900">{formatINR(r.amount)}</td>
                  <td className="px-5 py-3 text-ink-600">{formatDate(r.submitted)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.employee ?? ""}
        description={selected?.expense}
      >
        {selected ? (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-400">Amount</dt>
              <dd className="font-medium text-ink-900">{formatINR(selected.amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Submitted</dt>
              <dd className="text-ink-900">{formatDate(selected.submitted)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Status</dt>
              <dd>
                <StatusBadge status={selected.status} />
              </dd>
            </div>
          </dl>
        ) : null}
      </Drawer>
    </div>
  );
}
