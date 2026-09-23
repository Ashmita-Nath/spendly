import { Payment } from "@/types";

export const payments: Payment[] = [
  { id: "PAY-701", payee: "AWS", amount: 124500, date: "2026-09-24", status: "Scheduled", method: "Corporate Card" },
  { id: "PAY-702", payee: "Adobe", amount: 84200, date: "2026-09-25", status: "Scheduled", method: "Corporate Card" },
  { id: "PAY-703", payee: "Google Workspace", amount: 214800, date: "2026-09-28", status: "Scheduled", method: "Bank Transfer" },
  { id: "PAY-704", payee: "WeWork", amount: 154000, date: "2026-09-20", status: "Processing", method: "Bank Transfer" },
  { id: "PAY-705", payee: "Zoho", amount: 28900, date: "2026-09-18", status: "Paid", method: "Corporate Card" },
  { id: "PAY-706", payee: "Slack", amount: 24800, date: "2026-09-15", status: "Paid", method: "Corporate Card" },
  { id: "PAY-707", payee: "Notion", amount: 15600, date: "2026-09-12", status: "Paid", method: "Corporate Card" },
  { id: "PAY-708", payee: "LinkedIn Ads", amount: 68000, date: "2026-09-14", status: "Failed", method: "Corporate Card" },
];
