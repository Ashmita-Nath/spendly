"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Payment, PaymentMethod } from "@/types";

const methods: PaymentMethod[] = ["Corporate Card", "Bank Transfer", "UPI"];

const schema = z.object({
  payee: z.string().min(2, "Payee is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  method: z.enum(["Corporate Card", "Bank Transfer", "UPI", "Reimbursement"]),
});
type FormValues = z.infer<typeof schema>;

export function SchedulePaymentDrawer({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (payment: Payment) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { method: "Corporate Card" },
  });

  function onSubmit(values: FormValues) {
    onCreate({ id: `PAY-${Math.floor(700 + Math.random() * 400)}`, status: "Scheduled", ...values });
    reset();
    onClose();
  }

  return (
    <Drawer open={open} onClose={onClose} title="Schedule Payment" description="Queue a payment to a vendor or payee.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="payee">Payee</Label>
          <Input id="payee" placeholder="e.g. AWS" {...register("payee")} />
          {errors.payee ? <p className="mt-1 text-xs text-danger">{errors.payee.message}</p> : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" step="0.01" {...register("amount")} />
            {errors.amount ? <p className="mt-1 text-xs text-danger">{errors.amount.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="date">Payment date</Label>
            <Input id="date" type="date" {...register("date")} />
          </div>
        </div>
        <div>
          <Label htmlFor="method">Method</Label>
          <Select id="method" {...register("method")}>
            {methods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Schedule Payment
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
