"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-indigo text-white hover:bg-indigo-600 shadow-sm hover:shadow-pop",
  secondary:
    "bg-white text-ink-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
  outline:
    "bg-transparent text-ink-900 border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-ink-600 hover:bg-slate-100 hover:text-ink-900",
  danger: "bg-danger text-white hover:bg-red-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
