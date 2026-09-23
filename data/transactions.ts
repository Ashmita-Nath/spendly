import { Transaction } from "@/types";

export const transactions: Transaction[] = [
  { id: "TXN-1001", merchant: "AWS", category: "Software", amount: 184500, date: "2026-09-22", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1002", merchant: "Slack", category: "Software", amount: 24800, date: "2026-09-21", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1003", merchant: "Figma", category: "Software", amount: 18200, date: "2026-09-21", status: "Pending", method: "Corporate Card" },
  { id: "TXN-1004", merchant: "Uber", category: "Travel", amount: 3450, date: "2026-09-20", status: "Approved", method: "UPI" },
  { id: "TXN-1005", merchant: "Notion", category: "Software", amount: 15600, date: "2026-09-19", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1006", merchant: "Adobe", category: "Software", amount: 42300, date: "2026-09-18", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1007", merchant: "Swiggy", category: "Office", amount: 6200, date: "2026-09-18", status: "Rejected", method: "UPI" },
  { id: "TXN-1008", merchant: "Google Workspace", category: "Software", amount: 96400, date: "2026-09-17", status: "Approved", method: "Bank Transfer" },
  { id: "TXN-1009", merchant: "Zoho", category: "Operations", amount: 28900, date: "2026-09-16", status: "Pending", method: "Corporate Card" },
  { id: "TXN-1010", merchant: "IndiGo", category: "Travel", amount: 12400, date: "2026-09-15", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1011", merchant: "LinkedIn Ads", category: "Marketing", amount: 68000, date: "2026-09-14", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1012", merchant: "WeWork", category: "Office", amount: 154000, date: "2026-09-12", status: "Approved", method: "Bank Transfer" },
  { id: "TXN-1013", merchant: "Zoom", category: "Software", amount: 21400, date: "2026-09-11", status: "Approved", method: "Corporate Card" },
  { id: "TXN-1014", merchant: "Ola", category: "Travel", amount: 2100, date: "2026-09-10", status: "Pending", method: "UPI" },
  { id: "TXN-1015", merchant: "Meta Ads", category: "Marketing", amount: 89000, date: "2026-09-09", status: "Approved", method: "Corporate Card" },
];

export const categoryColors: Record<string, string> = {
  Software: "#6366F1",
  Travel: "#06B6D4",
  Marketing: "#7C3AED",
  Operations: "#10B981",
  Payroll: "#F59E0B",
  Office: "#94A3B8",
  Other: "#EF4444",
};

export const categorySpend = [
  { category: "Payroll", value: 1240000, color: categoryColors.Payroll },
  { category: "Software", value: 412000, color: categoryColors.Software },
  { category: "Marketing", value: 268000, color: categoryColors.Marketing },
  { category: "Office", value: 198000, color: categoryColors.Office },
  { category: "Operations", value: 172000, color: categoryColors.Operations },
  { category: "Travel", value: 118000, color: categoryColors.Travel },
  { category: "Other", value: 74450, color: categoryColors.Other },
];

export const spendOverview = {
  "7d": [
    { label: "Mon", actual: 182000, approved: 164000, projected: 190000 },
    { label: "Tue", actual: 145000, approved: 140000, projected: 150000 },
    { label: "Wed", actual: 210000, approved: 198000, projected: 205000 },
    { label: "Thu", actual: 168000, approved: 160000, projected: 175000 },
    { label: "Fri", actual: 224000, approved: 210000, projected: 230000 },
    { label: "Sat", actual: 96000, approved: 92000, projected: 100000 },
    { label: "Sun", actual: 74000, approved: 70000, projected: 78000 },
  ],
  "30d": [
    { label: "Wk 1", actual: 512000, approved: 480000, projected: 520000 },
    { label: "Wk 2", actual: 648000, approved: 610000, projected: 660000 },
    { label: "Wk 3", actual: 584000, approved: 560000, projected: 600000 },
    { label: "Wk 4", actual: 738000, approved: 690000, projected: 750000 },
  ],
  "3m": [
    { label: "Jul", actual: 1980000, approved: 1900000, projected: 2000000 },
    { label: "Aug", actual: 2240000, approved: 2150000, projected: 2280000 },
    { label: "Sep", actual: 2482450, approved: 2340000, projected: 2550000 },
  ],
  "12m": [
    { label: "Oct", actual: 1620000, approved: 1560000, projected: 1650000 },
    { label: "Nov", actual: 1740000, approved: 1680000, projected: 1780000 },
    { label: "Dec", actual: 2120000, approved: 2040000, projected: 2150000 },
    { label: "Jan", actual: 1580000, approved: 1520000, projected: 1600000 },
    { label: "Feb", actual: 1690000, approved: 1630000, projected: 1720000 },
    { label: "Mar", actual: 1980000, approved: 1900000, projected: 2020000 },
    { label: "Apr", actual: 1860000, approved: 1790000, projected: 1900000 },
    { label: "May", actual: 2040000, approved: 1960000, projected: 2080000 },
    { label: "Jun", actual: 2180000, approved: 2100000, projected: 2220000 },
    { label: "Jul", actual: 1980000, approved: 1900000, projected: 2000000 },
    { label: "Aug", actual: 2240000, approved: 2150000, projected: 2280000 },
    { label: "Sep", actual: 2482450, approved: 2340000, projected: 2550000 },
  ],
} as const;

export type SpendRange = keyof typeof spendOverview;
