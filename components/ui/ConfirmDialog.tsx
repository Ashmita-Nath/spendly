"use client";

import { Button } from "./Button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  tone = "primary",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  tone?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onCancel} aria-hidden />
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl animate-fade-in"
      >
        <h3 className="text-base font-semibold text-ink-900">{title}</h3>
        <p className="mt-2 text-sm text-ink-600">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
