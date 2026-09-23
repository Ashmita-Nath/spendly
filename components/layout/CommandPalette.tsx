"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Receipt, FileText, CreditCard, Users, Building2 } from "lucide-react";
import { expenses } from "@/data/expenses";
import { bills } from "@/data/bills";
import { payments } from "@/data/payments";

interface Result {
  id: string;
  label: string;
  hint: string;
  icon: typeof Receipt;
  href: string;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results: Result[] = useMemo(() => {
    const employees = Array.from(new Set(expenses.map((e) => e.employee)));
    const vendors = Array.from(new Set(bills.map((b) => b.vendor)));

    const all: Result[] = [
      ...expenses.slice(0, 6).map((e) => ({
        id: e.id,
        label: `${e.merchant} — ${e.category}`,
        hint: "Expense",
        icon: Receipt,
        href: "/expenses",
      })),
      ...bills.slice(0, 4).map((b) => ({
        id: b.id,
        label: `${b.vendor} — ${b.invoice}`,
        hint: "Bill",
        icon: FileText,
        href: "/bills",
      })),
      ...payments.slice(0, 4).map((p) => ({
        id: p.id,
        label: `${p.payee} payment`,
        hint: "Payment",
        icon: CreditCard,
        href: "/payments",
      })),
      ...employees.map((e) => ({ id: e, label: e, hint: "Employee", icon: Users, href: "/expenses" })),
      ...vendors.map((v) => ({ id: v, label: v, hint: "Vendor", icon: Building2, href: "/bills" })),
    ];

    if (!query.trim()) return all.slice(0, 8);
    const q = query.toLowerCase();
    return all.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-24">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <Search size={18} className="text-ink-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search expenses, bills, payments, employees, vendors…"
            className="w-full text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-ink-400">
            Esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto scroll-thin py-2">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-ink-400">No results found.</p>
          ) : (
            results.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={`${r.hint}-${r.id}`}
                  onClick={() => {
                    router.push(r.href);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                >
                  <Icon size={15} className="text-ink-400" />
                  <span className="flex-1 text-ink-900">{r.label}</span>
                  <span className="text-xs text-ink-400">{r.hint}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
