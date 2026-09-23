"use client";

import { useState } from "react";
import { Landmark, CreditCard, Plug, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { accounts } from "@/data/misc";
import { formatINR } from "@/lib/utils";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

function AccountRow({ account }: { account: (typeof accounts)[number] }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-50 px-5 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-ink-600">
          {account.type === "Bank Account" ? <Landmark size={17} /> : account.type === "Corporate Card" ? <CreditCard size={17} /> : <Plug size={17} />}
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900">{account.name}</p>
          <p className="text-xs text-ink-400">
            {account.mask ? `${account.mask} · ` : ""}Last synced {timeAgo(account.lastSynced)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {account.balance !== undefined ? (
          <p className="text-sm font-semibold text-ink-900">{formatINR(account.balance)}</p>
        ) : null}
        <StatusBadge status={account.status} />
      </div>
    </div>
  );
}

export default function AccountsPage() {
  const { push } = useToast();
  const [connectOpen, setConnectOpen] = useState(false);

  const bankAccounts = accounts.filter((a) => a.type === "Bank Account");
  const cards = accounts.filter((a) => a.type === "Corporate Card");
  const integrations = accounts.filter((a) => a.type === "Accounting Integration");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts"
        subtitle="Connected banks, corporate cards, and accounting tools."
        actions={
          <Button
            onClick={() => {
              setConnectOpen((v) => !v);
              push("Account connection is a demo action in this project.", "info");
            }}
          >
            <Plus size={16} /> Connect Account
          </Button>
        }
      />

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Bank Accounts</h2>
        <Card className="overflow-hidden">
          {bankAccounts.map((a) => (
            <AccountRow key={a.id} account={a} />
          ))}
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Corporate Cards</h2>
        <Card className="overflow-hidden">
          {cards.map((a) => (
            <AccountRow key={a.id} account={a} />
          ))}
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Accounting Integrations</h2>
        <Card className="overflow-hidden">
          {integrations.map((a) => (
            <AccountRow key={a.id} account={a} />
          ))}
        </Card>
      </div>
      {connectOpen ? null : null}
    </div>
  );
}
