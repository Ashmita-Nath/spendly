import { Bill } from "@/types";

export const bills: Bill[] = [
  { id: "BILL-501", vendor: "AWS", invoice: "INV-88213", amount: 184500, dueDate: "2026-09-30", status: "Due Soon" },
  { id: "BILL-502", vendor: "Google Workspace", invoice: "INV-77410", amount: 96400, dueDate: "2026-09-28", status: "Due Soon" },
  { id: "BILL-503", vendor: "WeWork", invoice: "INV-55021", amount: 154000, dueDate: "2026-09-25", status: "Overdue" },
  { id: "BILL-504", vendor: "Zoho", invoice: "INV-40982", amount: 28900, dueDate: "2026-10-05", status: "Pending" },
  { id: "BILL-505", vendor: "Adobe", invoice: "INV-33210", amount: 42300, dueDate: "2026-09-15", status: "Paid" },
  { id: "BILL-506", vendor: "Notion", invoice: "INV-29104", amount: 15600, dueDate: "2026-09-10", status: "Paid" },
  { id: "BILL-507", vendor: "LinkedIn Ads", invoice: "INV-19833", amount: 68000, dueDate: "2026-10-10", status: "Pending" },
  { id: "BILL-508", vendor: "Slack", invoice: "INV-18820", amount: 24800, dueDate: "2026-09-08", status: "Paid" },
];
