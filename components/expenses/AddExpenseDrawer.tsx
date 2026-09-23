"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadCloud } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Expense, Category, PaymentMethod } from "@/types";

const categories: Category[] = ["Software", "Travel", "Marketing", "Operations", "Payroll", "Office", "Other"];
const methods: PaymentMethod[] = ["Corporate Card", "Bank Transfer", "UPI", "Reimbursement"];

const schema = z.object({
  merchant: z.string().min(2, "Merchant is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum(["Software", "Travel", "Marketing", "Operations", "Payroll", "Office", "Other"]),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(3, "Add a short description"),
  method: z.enum(["Corporate Card", "Bank Transfer", "UPI", "Reimbursement"]),
});

type FormValues = z.infer<typeof schema>;

export function AddExpenseDrawer({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (expense: Expense) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      merchant: "",
      amount: undefined,
      category: "Software",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      method: "Corporate Card",
    },
  });

  function onSubmit(values: FormValues) {
    const newExpense: Expense = {
      id: `EXP-${Math.floor(2300 + Math.random() * 400)}`,
      employee: "Ashmita Nath",
      status: "Pending",
      ...values,
    };
    onCreate(newExpense);
    reset();
    onClose();
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Add Expense"
      description="Log a new business expense for approval."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="merchant">Merchant</Label>
          <Input id="merchant" placeholder="e.g. AWS" {...register("merchant")} />
          {errors.merchant ? <p className="mt-1 text-xs text-danger">{errors.merchant.message}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" step="0.01" placeholder="0.00" {...register("amount")} />
            {errors.amount ? <p className="mt-1 text-xs text-danger">{errors.amount.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select id="category" {...register("category")}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="method">Payment method</Label>
            <Select id="method" {...register("method")}>
              {methods.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={3} placeholder="What was this for?" {...register("description")} />
          {errors.description ? (
            <p className="mt-1 text-xs text-danger">{errors.description.message}</p>
          ) : null}
        </div>

        <div>
          <Label>Receipt</Label>
          <div className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-6 text-center hover:border-brand-indigo">
            <UploadCloud size={20} className="text-ink-400" />
            <p className="text-xs text-ink-600">Drag a receipt here, or click to upload</p>
            <p className="text-[11px] text-ink-400">PNG, JPG or PDF up to 10MB (demo only)</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Add Expense
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
