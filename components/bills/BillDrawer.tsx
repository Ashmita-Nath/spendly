"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Bill } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";

const schema = z.object({
  vendor: z.string().min(2, "Vendor is required"),
  invoice: z.string().min(2, "Invoice number is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  dueDate: z.string().min(1, "Due date is required"),
});
type FormValues = z.infer<typeof schema>;

export function AddBillDrawer({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (bill: Bill) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    onCreate({ id: `BILL-${Math.floor(500 + Math.random() * 400)}`, status: "Pending", ...values });
    reset();
    onClose();
  }

  return (
    <Drawer open={open} onClose={onClose} title="Add Bill" description="Record a new vendor bill to track.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="vendor">Vendor</Label>
          <Input id="vendor" placeholder="e.g. AWS" {...register("vendor")} />
          {errors.vendor ? <p className="mt-1 text-xs text-danger">{errors.vendor.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="invoice">Invoice number</Label>
          <Input id="invoice" placeholder="INV-00000" {...register("invoice")} />
          {errors.invoice ? <p className="mt-1 text-xs text-danger">{errors.invoice.message}</p> : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" step="0.01" {...register("amount")} />
            {errors.amount ? <p className="mt-1 text-xs text-danger">{errors.amount.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="dueDate">Due date</Label>
            <Input id="dueDate" type="date" {...register("dueDate")} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Add Bill
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

export function BillDetailsDrawer({
  bill,
  onClose,
  onMarkPaid,
}: {
  bill: Bill | null;
  onClose: () => void;
  onMarkPaid: (id: string) => void;
}) {
  return (
    <Drawer open={!!bill} onClose={onClose} title={bill?.vendor ?? ""} description={bill?.invoice}>
      {bill ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="text-xs text-ink-400">Amount due</p>
              <p className="text-xl font-semibold text-ink-900">{formatINR(bill.amount)}</p>
            </div>
            <StatusBadge status={bill.status} />
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-400">Vendor</dt>
              <dd className="text-ink-900">{bill.vendor}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Invoice</dt>
              <dd className="text-ink-900">{bill.invoice}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Due date</dt>
              <dd className="text-ink-900">{formatDate(bill.dueDate)}</dd>
            </div>
          </dl>
          {bill.status !== "Paid" ? (
            <Button className="w-full" onClick={() => onMarkPaid(bill.id)}>
              Mark as paid
            </Button>
          ) : null}
        </div>
      ) : null}
    </Drawer>
  );
}
