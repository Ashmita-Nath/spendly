"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: string;
  message: string;
  kind: ToastKind;
}

const ToastContext = createContext<{ push: (message: string, kind?: ToastKind) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const remove = (id: string) => setToasts((t) => t.filter((toast) => toast.id !== id));

  const icon = { success: CheckCircle2, error: XCircle, info: Info };
  const iconColor = { success: "text-emerald-500", error: "text-red-500", info: "text-brand-indigo" };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => {
          const Icon = icon[t.kind];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-2xl animate-fade-in"
              )}
            >
              <Icon size={16} className={iconColor[t.kind]} />
              <span className="text-ink-900">{t.message}</span>
              <button onClick={() => remove(t.id)} className="ml-2 text-ink-400 hover:text-ink-900">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
