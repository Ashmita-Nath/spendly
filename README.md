# Spendly 💳
### AI-Powered Fintech & Business Spend Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-spendly--five--xi.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://spendly-five-xi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-22c55e?style=for-the-badge)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)


---

## 🌟 Overview

**Spendly** is a modern, fintech-grade SaaS spend management platform designed for finance teams, business owners, and startup operators. Inspired by industry-leading financial interfaces such as **Ramp**, **Brex**, **Stripe**, and **Linear**, Spendly consolidates corporate expenses, vendor bills, multi-stage approval workflows, scheduled payments, and cash-flow projections into a single, cohesive dashboard with AI-driven spending intelligence.

Built with an ultra-responsive App Router architecture in Next.js 14, custom Tailwind design tokens, and reactive client-side mutations, Spendly delivers instant feedback, zero layout shifts, and seamless user experiences.

---

## ✨ Key Features

### 📊 1. Executive Financial Dashboard
- **KPI Metrics**: Real-time snapshot of Total Spend, Pending Approvals, Scheduled Bills, and Available Cash.
- **Interactive Spend Chart**: Multi-period historical area chart (7D, 30D, 3M, 12M) with fluid transitions powered by Recharts.
- **Spend by Category**: Donut chart with breakdown across Engineering, Marketing, Operations, Travel, and SaaS.
- **Spendly AI Insights**: Contextual intelligence cards flagging subscription spikes, anomalies, and vendor discount opportunities.
- **Searchable Transactions**: Real-time filtered and paginated recent business transactions.

### 🧾 2. Expense Management
- Filter expenses by category, department, payment method, or approval status.
- **Add Expense Drawer**: Slide-out drawer with React Hook Form and Zod schema validation.
- Receipt attachment preview and immediate local state updates.

### 📑 3. Bill Pay & Invoicing
- Track upcoming, overdue, and paid bills with due dates and vendor details.
- Comprehensive bill detail drawers and one-click "Mark as Paid" actions.
- "Add Bill" drawer with automated due-date scheduling.

### ✅ 4. Smart Approvals Center
- **4-Column Kanban Workflow**:
  - *Needs My Approval*
  - *Waiting for Others*
  - *Approved*
  - *Rejected*
- Actionable approval cards with confirmation dialogs and instant status transitions.

### 💸 5. Cash Flow & Forecasting
- Historical vs. projected 6-month cash flow visualization.
- Burn rate metrics, runway calculations, and working capital indicators.

### 🏦 6. Accounts, Reimbursements & Reports
- **Connected Accounts**: Bank accounts, corporate credit cards, and accounting software (QuickBooks, NetSuite, Xero).
- **Employee Reimbursements**: Multi-currency expense claims with receipt audit trails.
- **Financial Reports**: Spend-by-department breakdowns and downloadable audit logs.

### ⚡ 7. Productivity & Global Navigation
- **Global Command Palette (`Cmd + K` / `Ctrl + K`)**: Instant search and navigation across all views.
- **Notification Dropdown**: Real-time alert feed for approvals, bill due dates, and policy flags.
- **Responsive Mobile Navigation**: Slide-out mobile drawer tested across standard phone and tablet viewport sizes.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict typing throughout) |
| **UI & Styling** | [Tailwind CSS](https://tailwindcss.com/) with custom fintech design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Visualizations** | [Recharts](https://recharts.org/) (ResponsiveContainer, AreaChart, PieChart, BarChart) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Primitives** | Custom shadcn-inspired accessible component primitives |

---

## 📂 Project Structure

```
spendly/
├── app/
│   ├── (app)/               # Authenticated app shell with persistent Sidebar & Header
│   │   ├── dashboard/       # Main overview & financial KPIs
│   │   ├── expenses/        # Expense tracking & submission
│   │   ├── bills/           # Vendor bills & payment schedules
│   │   ├── approvals/       # Multi-stage approval Kanban board
│   │   ├── payments/        # Payment batching & timelines
│   │   ├── cash-flow/       # Cash projection & runway modeling
│   │   ├── reimbursements/  # Out-of-pocket claims
│   │   ├── accounts/        # Connected banks & ERP integrations
│   │   ├── reports/         # Visual analytics & department breakdowns
│   │   └── settings/        # Org profile, team, and security settings
│   ├── login/               # Demo authentication page
│   ├── layout.tsx           # Root HTML layout & font definitions
│   └── globals.css          # Tailwind CSS layer definitions & design variables
├── components/
│   ├── layout/              # Sidebar, Header, MobileNav, CommandPalette
│   ├── ui/                  # Button, Card, Drawer, Dialog, Badge, Input, Toast
│   ├── dashboard/           # SpendChart, CategoryDonut, AIInsights, TransactionsTable
│   ├── expenses/            # ExpenseFilters, AddExpenseDrawer, ExpenseCard
│   ├── bills/               # BillTable, AddBillDrawer, BillDetailsDrawer
│   └── approvals/           # ApprovalColumn, ApprovalCard, ConfirmDialog
├── data/                    # Typed mock data models for in-memory persistence
├── lib/                     # Currency formatters (INR Lakh/Crore notation), cn helper
└── types/                   # Shared TypeScript interfaces
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `18.18+` or `20.x`
- npm `9.x+` (or pnpm / yarn)

### 1. Clone the repository
```bash
git clone https://github.com/Ashmita-Nath/spendly.git
cd spendly
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. You will be greeted with the Spendly login screen.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🔑 Demo Credentials

Spendly comes with ready-to-test mock credentials that are prefilled on the login screen for instant evaluation:

| Field | Value |
|---|---|
| **Email** | `demo@spendly.app` |
| **Password** | `demo123` |

*(All mutations—approving items, adding expenses, scheduling payments—run in memory with instant UI updates.)*

---

## 🌐 Live Demo & Deployment

Experience the live interactive deployment of **Spendly**:

### 🔗 **Live Demo URL:** [https://spendly-five-xi.vercel.app](https://spendly-five-xi.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ashmita-Nath/spendly)

> **Quick Tip:** When visiting the live demo, the demo credentials (`demo@spendly.app` / `demo123`) are prefilled. Simply click **Continue** on the login page to immediately explore the full dashboard, approvals board, expense tracking drawers, and cash-flow charts.


---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
