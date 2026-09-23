import { LucideIcon, Inbox } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-ink-400">
        <Icon size={22} />
      </div>
      <p className="text-sm font-medium text-ink-900">{title}</p>
      {description ? <p className="max-w-xs text-sm text-ink-400">{description}</p> : null}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-5 py-4">
          {Array.from({ length: cols }).map((__, c) => (
            <div key={c} className="skeleton h-4 flex-1 animate-shimmer rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}
