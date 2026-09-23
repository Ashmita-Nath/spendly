"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  CheckSquare,
  CreditCard,
  TrendingUp,
  Wallet,
  Landmark,
  BarChart3,
  Settings,
  HelpCircle,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/bills", label: "Bills", icon: FileText },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/cash-flow", label: "Cash Flow", icon: TrendingUp },
  { href: "/reimbursements", label: "Reimbursements", icon: Wallet },
  { href: "/accounts", label: "Accounts", icon: Landmark },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 px-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-indigo to-brand-violet text-white shadow-pop">
        <Sparkles size={16} />
      </div>
      <span className="text-base font-semibold tracking-tight text-white">Spendly</span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1 px-2">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={17} className={active ? "text-brand-cyan" : "text-slate-500 group-hover:text-slate-300"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-ink-800 py-5 lg:flex">
      <Logo />
      <div className="mt-8 flex-1 overflow-y-auto scroll-thin">
        <NavList />
      </div>
      <div className="mt-4 space-y-1 border-t border-white/10 px-2 pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <Settings size={17} />
          Settings
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white">
          <HelpCircle size={17} />
          Help
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-xs font-semibold text-white">
            AN
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Ashmita Nath</p>
            <p className="truncate text-xs text-slate-500">Finance Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="absolute inset-0 bg-ink-900/40" onClick={onClose} aria-hidden />
      <div className="relative flex w-72 flex-col bg-ink-800 py-5">
        <div className="flex items-center justify-between px-2">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div className="mt-8 flex-1 overflow-y-auto scroll-thin">
          <NavList onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
