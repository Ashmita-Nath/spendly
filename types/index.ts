export type ExpenseStatus = "Approved" | "Pending" | "Rejected";
export type BillStatus = "Paid" | "Pending" | "Due Soon" | "Overdue";
export type PaymentStatus = "Paid" | "Scheduled" | "Processing" | "Failed";
export type ApprovalStatus = "Needs My Approval" | "Waiting for Others" | "Approved" | "Rejected";
export type ReimbursementStatus = "Pending" | "Approved" | "Paid";
export type AccountConnectionStatus = "Connected" | "Syncing" | "Disconnected";

export type Category =
  | "Software"
  | "Travel"
  | "Marketing"
  | "Operations"
  | "Payroll"
  | "Office"
  | "Other";

export type PaymentMethod = "Corporate Card" | "Bank Transfer" | "UPI" | "Reimbursement";

export interface Transaction {
  id: string;
  merchant: string;
  category: Category;
  amount: number;
  date: string;
  status: ExpenseStatus;
  method: PaymentMethod;
}

export interface Expense {
  id: string;
  employee: string;
  merchant: string;
  category: Category;
  amount: number;
  date: string;
  status: ExpenseStatus;
  description: string;
  method: PaymentMethod;
}

export interface Bill {
  id: string;
  vendor: string;
  invoice: string;
  amount: number;
  dueDate: string;
  status: BillStatus;
}

export interface Payment {
  id: string;
  payee: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  method: PaymentMethod;
}

export interface Approval {
  id: string;
  employee: string;
  request: string;
  category: Category;
  amount: number;
  date: string;
  status: ApprovalStatus;
}

export interface Reimbursement {
  id: string;
  employee: string;
  expense: string;
  amount: number;
  submitted: string;
  status: ReimbursementStatus;
}

export interface Account {
  id: string;
  name: string;
  type: "Bank Account" | "Corporate Card" | "Accounting Integration";
  balance?: number;
  lastSynced: string;
  status: AccountConnectionStatus;
  mask?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

export interface SpendPoint {
  label: string;
  actual: number;
  approved: number;
  projected: number;
}

export interface CashFlowPoint {
  label: string;
  historical: number | null;
  projected: number | null;
}

export interface CategorySpend {
  category: Category;
  value: number;
  color: string;
}
