"use client";

import { useMemo, useState } from "react";
import { Plus, CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SummaryStat } from "@/components/ui/SummaryStat";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SchedulePaymentDrawer } from "@/components/payments/SchedulePaymentDrawer";
import { useToast } from "@/components/ui/Toast";
import { payments as initialPayments } from "@/data/payments";
import { Payment } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";

function groupByDate(payments: Payment[]) {
  const sorted = [...payments].sort((a, b) => a.date.localeCompare(b.date));
  const groups = new Map<string, Payment[]>();
  sorted.forEach((p) => {
    const list = groups.get(p.date) ?? [];
    list.push(p);
    groups.set(p.date, list);
  });
  return Array.from(groups.entries());
}

export default function PaymentsPage() {
  const { push } = useToast();
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [open, setOpen] = useState(false);

  const totals = useMemo(() => {
    const paid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const scheduled = payments.filter((p) => p.status === "Scheduled").reduce((s, p) => s + p.amount, 0);
    const processing = payments.filter((p) => p.status === "Processing").reduce((s, p) => s + p.amount, 0);
    const failed = payments.filter((p) => p.status === "Failed").reduce((s, p) => s + p.amount, 0);
    return { paid, scheduled, processing, failed };
  }, [payments]);

  const timeline = groupByDate(payments.filter((p) => p.status !== "Paid"));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        subtitle="A single view of everything paid, scheduled, or in flight."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Schedule Payment
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryStat label="Paid This Month" value={formatINR(totals.paid)} icon={CheckCircle2} tone="success" />
        <SummaryStat label="Scheduled" value={formatINR(totals.scheduled)} icon={Clock} tone="warning" />
        <SummaryStat label="Processing" value={formatINR(totals.processing)} icon={Loader2} />
        <SummaryStat label="Failed" value={formatINR(totals.failed)} icon={XCircle} tone="danger" />
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-ink-900">Payment timeline</h3>
        <div className="space-y-6">
          {timeline.map(([date, items]) => (
            <div key={date} className="flex gap-4">
              <div className="w-24 shrink-0 text-xs font-medium text-ink-400">{formatDate(date)}</div>
              <div className="flex-1 space-y-2 border-l border-slate-100 pl-4">
                {items.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink-900">{p.payee}</p>
                      <p className="text-xs text-ink-400">{p.method}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-ink-900">{formatINR(p.amount)}</p>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SchedulePaymentDrawer
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(payment) => {
          setPayments((prev) => [payment, ...prev]);
          push("Payment scheduled.");
        }}
      />
    </div>
  );
}
