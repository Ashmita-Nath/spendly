import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink-900 focus:border-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-ink-600">
      {children}
    </label>
  );
}
