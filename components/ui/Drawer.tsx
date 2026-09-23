"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  widthClass = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  widthClass?: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-ink-900/30 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative flex h-full w-full flex-col bg-white shadow-2xl animate-fade-in",
          widthClass
        )}
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-base font-semibold text-ink-900">{title}</h2>
            {description ? <p className="mt-1 text-sm text-ink-600">{description}</p> : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-lg p-1.5 text-ink-400 hover:bg-slate-100 hover:text-ink-900"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scroll-thin p-5">{children}</div>
      </div>
    </div>
  );
}
