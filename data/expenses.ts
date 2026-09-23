import { Expense } from "@/types";

export const expenses: Expense[] = [
  { id: "EXP-2201", employee: "Ashmita Nath", merchant: "AWS", category: "Software", amount: 184500, date: "2026-09-22", status: "Approved", description: "Cloud infra — September usage", method: "Corporate Card" },
  { id: "EXP-2202", employee: "Rahul Verma", merchant: "IndiGo", category: "Travel", amount: 12400, date: "2026-09-21", status: "Pending", description: "Client visit — Mumbai", method: "Corporate Card" },
  { id: "EXP-2203", employee: "Priya Shah", merchant: "Figma", category: "Software", amount: 18200, date: "2026-09-21", status: "Pending", description: "Design seats renewal", method: "Corporate Card" },
  { id: "EXP-2204", employee: "Karthik Iyer", merchant: "Taj Hotels", category: "Travel", amount: 22600, date: "2026-09-20", status: "Approved", description: "Partner offsite stay", method: "Corporate Card" },
  { id: "EXP-2205", employee: "Neha Kapoor", merchant: "Swiggy", category: "Office", amount: 6200, date: "2026-09-18", status: "Rejected", description: "Team lunch — exceeded policy limit", method: "UPI" },
  { id: "EXP-2206", employee: "Ashmita Nath", merchant: "LinkedIn Ads", category: "Marketing", amount: 68000, date: "2026-09-17", status: "Approved", description: "Recruiting campaign boost", method: "Corporate Card" },
  { id: "EXP-2207", employee: "Rahul Verma", merchant: "Zoho", category: "Operations", amount: 28900, date: "2026-09-16", status: "Pending", description: "CRM add-on licenses", method: "Corporate Card" },
  { id: "EXP-2208", employee: "Priya Shah", merchant: "Uber", category: "Travel", amount: 3450, date: "2026-09-15", status: "Approved", description: "Airport pickup", method: "UPI" },
  { id: "EXP-2209", employee: "Karthik Iyer", merchant: "Adobe", category: "Software", amount: 42300, date: "2026-09-14", status: "Approved", description: "Creative Cloud — design team", method: "Corporate Card" },
  { id: "EXP-2210", employee: "Neha Kapoor", merchant: "WeWork", category: "Office", amount: 154000, date: "2026-09-12", status: "Approved", description: "Coworking desks — Q3", method: "Bank Transfer" },
  { id: "EXP-2211", employee: "Ashmita Nath", merchant: "Ola", category: "Travel", amount: 2100, date: "2026-09-11", status: "Pending", description: "Client meeting commute", method: "UPI" },
  { id: "EXP-2212", employee: "Rahul Verma", merchant: "Meta Ads", category: "Marketing", amount: 89000, date: "2026-09-09", status: "Approved", description: "Q3 brand campaign", method: "Corporate Card" },
];
