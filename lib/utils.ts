import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian Rupees using lakh/crore grouping,
 * e.g. 2482450 -> "₹24,82,450"
 */
export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Compact lakh notation, e.g. 2482450 -> "₹24.82L", 42150000 -> "₹4.22Cr"
 */
export function formatCompactINR(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
  }
  if (abs >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(2)}L`;
  }
  if (abs >= 1_000) {
    return `₹${(value / 1_000).toFixed(1)}K`;
  }
  return `₹${value.toFixed(0)}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}
