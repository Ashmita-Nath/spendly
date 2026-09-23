import { Reimbursement, Account, AppNotification, CashFlowPoint } from "@/types";

export const reimbursements: Reimbursement[] = [
  { id: "RMB-301", employee: "Priya Shah", expense: "Airport pickup — Uber", amount: 3450, submitted: "2026-09-21", status: "Pending" },
  { id: "RMB-302", employee: "Ashmita Nath", expense: "Client meeting commute", amount: 2100, submitted: "2026-09-18", status: "Pending" },
  { id: "RMB-303", employee: "Karthik Iyer", expense: "Team dinner — approved", amount: 5600, submitted: "2026-09-14", status: "Approved" },
  { id: "RMB-304", employee: "Neha Kapoor", expense: "Stationery purchase", amount: 1200, submitted: "2026-09-10", status: "Paid" },
  { id: "RMB-305", employee: "Rahul Verma", expense: "Client gift", amount: 4800, submitted: "2026-09-08", status: "Paid" },
];

export const accounts: Account[] = [
  { id: "ACC-01", name: "HDFC Business Account", type: "Bank Account", balance: 2815600, lastSynced: "2026-09-24T08:30:00", status: "Connected", mask: "•• 4821" },
  { id: "ACC-02", name: "ICICI Corporate Account", type: "Bank Account", balance: 1400000, lastSynced: "2026-09-24T08:30:00", status: "Connected", mask: "•• 7710" },
  { id: "ACC-03", name: "Axis Business Account", type: "Bank Account", balance: 0, lastSynced: "2026-09-20T14:00:00", status: "Disconnected", mask: "•• 3390" },
  { id: "ACC-04", name: "Spendly Corporate Card — Platinum", type: "Corporate Card", balance: 342800, lastSynced: "2026-09-24T09:00:00", status: "Connected", mask: "•• 9081" },
  { id: "ACC-05", name: "Spendly Corporate Card — Ops Team", type: "Corporate Card", balance: 118200, lastSynced: "2026-09-24T09:00:00", status: "Connected", mask: "•• 2246" },
  { id: "ACC-06", name: "Zoho Books", type: "Accounting Integration", lastSynced: "2026-09-24T06:00:00", status: "Syncing" },
  { id: "ACC-07", name: "Tally", type: "Accounting Integration", lastSynced: "2026-09-19T10:00:00", status: "Disconnected" },
];

export const notifications: AppNotification[] = [
  { id: "N1", title: "New approval request from Rahul Verma", time: "8m ago", read: false },
  { id: "N2", title: "Bill from AWS is due tomorrow", time: "1h ago", read: false },
  { id: "N3", title: "Spendly AI detected unusual spending in Travel", time: "3h ago", read: false },
  { id: "N4", title: "Monthly report is ready to view", time: "Yesterday", read: true },
  { id: "N5", title: "Priya Shah submitted a new expense", time: "Yesterday", read: true },
];

export const cashFlowSeries: CashFlowPoint[] = [
  { label: "Apr", historical: 3210000, projected: null },
  { label: "May", historical: 3480000, projected: null },
  { label: "Jun", historical: 3720000, projected: null },
  { label: "Jul", historical: 3990000, projected: null },
  { label: "Aug", historical: 4120000, projected: null },
  { label: "Sep", historical: 4215600, projected: 4215600 },
  { label: "Oct", historical: null, projected: 4480000 },
  { label: "Nov", historical: null, projected: 4610000 },
  { label: "Dec", historical: null, projected: 4773000 },
];
