import { Approval } from "@/types";

export const approvals: Approval[] = [
  { id: "APR-901", employee: "Rahul Verma", request: "Client visit — Mumbai flights", category: "Travel", amount: 12400, date: "2026-09-21", status: "Needs My Approval" },
  { id: "APR-902", employee: "Priya Shah", request: "Figma seats renewal", category: "Software", amount: 18200, date: "2026-09-21", status: "Needs My Approval" },
  { id: "APR-903", employee: "Neha Kapoor", request: "Team lunch reimbursement", category: "Office", amount: 6200, date: "2026-09-18", status: "Needs My Approval" },
  { id: "APR-904", employee: "Ashmita Nath", request: "AWS September usage", category: "Software", amount: 184500, date: "2026-09-22", status: "Waiting for Others" },
  { id: "APR-905", employee: "Rahul Verma", request: "Zoho CRM add-on licenses", category: "Operations", amount: 28900, date: "2026-09-16", status: "Waiting for Others" },
  { id: "APR-906", employee: "Karthik Iyer", request: "Partner offsite hotel stay", category: "Travel", amount: 22600, date: "2026-09-20", status: "Approved" },
  { id: "APR-907", employee: "Ashmita Nath", request: "LinkedIn recruiting campaign", category: "Marketing", amount: 68000, date: "2026-09-17", status: "Approved" },
  { id: "APR-908", employee: "Neha Kapoor", request: "Swiggy team lunch — over limit", category: "Office", amount: 6200, date: "2026-09-18", status: "Rejected" },
];
