import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Connected: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  "Due Soon": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Scheduled: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Processing: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
  Syncing: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
  "Needs My Approval": "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  "Waiting for Others": "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  Rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
  Overdue: "bg-red-50 text-red-700 ring-1 ring-red-200",
  Failed: "bg-red-50 text-red-700 ring-1 ring-red-200",
  Disconnected: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
      )}
    >
      {status}
    </span>
  );
}
