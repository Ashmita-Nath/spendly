"use client";

import { useMemo, useState } from "react";
import { Plus, FileText, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SummaryStat } from "@/components/ui/SummaryStat";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AddBillDrawer, BillDetailsDrawer } from "@/components/bills/BillDrawer";
import { useToast } from "@/components/ui/Toast";
import { bills as initialBills } from "@/data/bills";
import { Bill } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";

export default function BillsPage() {
  const { push } = useToast();
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Bill | null>(null);

  const totals = useMemo(() => {
    const total = bills.reduce((s, b) => s + b.amount, 0);
    const dueSoon = bills.filter((b) => b.status === "Due Soon").reduce((s, b) => s + b.amount, 0);
    const overdue = bills.filter((b) => b.status === "Overdue").reduce((s, b) => s + b.amount, 0);
    const paid = bills.filter((b) => b.status === "Paid").reduce((s, b) => s + b.amount, 0);
    return { total, dueSoon, overdue, paid };
  }, [bills]);

  function markPaid(id: string) {
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Paid" } : b)));
    setSelected(null);
    push("Bill marked as paid.");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bills"
        subtitle="Stay on top of vendor invoices before they're due."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Add Bill
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryStat label="Total Bills" value={formatINR(totals.total)} icon={FileText} />
        <SummaryStat label="Due Soon" value={formatINR(totals.dueSoon)} icon={Clock} tone="warning" />
        <SummaryStat label="Overdue" value={formatINR(totals.overdue)} icon={AlertTriangle} tone="danger" />
        <SummaryStat label="Paid" value={formatINR(totals.paid)} icon={CheckCircle2} tone="success" />
      </div>

      <Card>
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-ink-400">
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3 font-medium text-ink-900">{b.vendor}</td>
                  <td className="px-5 py-3 text-ink-600">{b.invoice}</td>
                  <td className="px-5 py-3 text-ink-900">{formatINR(b.amount)}</td>
                  <td className="px-5 py-3 text-ink-600">{formatDate(b.dueDate)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AddBillDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={(bill) => {
          setBills((prev) => [bill, ...prev]);
          push("Bill added.");
        }}
      />
      <BillDetailsDrawer bill={selected} onClose={() => setSelected(null)} onMarkPaid={markPaid} />
    </div>
  );
}
