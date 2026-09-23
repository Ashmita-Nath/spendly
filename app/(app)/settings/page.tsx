"use client";

import { useState } from "react";
import { User, Building2, Bell, Shield, CreditCard, Plug } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "organization", label: "Organization", icon: Building2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "integrations", label: "Integrations", icon: Plug },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function SettingsPage() {
  const { push } = useToast();
  const [tab, setTab] = useState<TabKey>("profile");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your profile, organization, and preferences." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  tab === t.key ? "bg-indigo-50 text-brand-indigo" : "text-ink-600 hover:bg-slate-100"
                )}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </nav>

        <Card className="p-6">
          {tab === "profile" ? (
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-semibold text-ink-900">Profile</h3>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue="Ashmita Nath" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="ashmita@spendly.app" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select id="role" defaultValue="Finance Manager">
                  <option>Finance Manager</option>
                  <option>Business Owner</option>
                  <option>Accountant</option>
                </Select>
              </div>
              <Button onClick={() => push("Profile updated.")}>Save changes</Button>
            </div>
          ) : null}

          {tab === "organization" ? (
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-semibold text-ink-900">Organization</h3>
              <div>
                <Label htmlFor="org">Organization name</Label>
                <Input id="org" defaultValue="Spendly Labs" />
              </div>
              <div>
                <Label htmlFor="size">Company size</Label>
                <Select id="size" defaultValue="11-50 employees">
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>200+ employees</option>
                </Select>
              </div>
              <Button onClick={() => push("Organization details updated.")}>Save changes</Button>
            </div>
          ) : null}

          {tab === "notifications" ? (
            <div className="max-w-md space-y-3">
              <h3 className="mb-2 text-sm font-semibold text-ink-900">Notifications</h3>
              {["Approval requests", "Bill due reminders", "AI spending alerts", "Weekly report summary"].map((label) => (
                <label key={label} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm text-ink-900">
                  {label}
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-indigo" />
                </label>
              ))}
              <Button onClick={() => push("Notification preferences saved.")}>Save changes</Button>
            </div>
          ) : null}

          {tab === "security" ? (
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-semibold text-ink-900">Security</h3>
              <div>
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm text-ink-900">
                Two-factor authentication
                <input type="checkbox" className="h-4 w-4 accent-brand-indigo" />
              </label>
              <Button onClick={() => push("Security settings updated.")}>Save changes</Button>
            </div>
          ) : null}

          {tab === "billing" ? (
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-semibold text-ink-900">Billing</h3>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-ink-900">Growth Plan</p>
                <p className="mt-1 text-xs text-ink-400">₹4,999/month · Renews Oct 1, 2026</p>
              </div>
              <Button variant="secondary">Manage subscription</Button>
            </div>
          ) : null}

          {tab === "integrations" ? (
            <div className="max-w-md space-y-3">
              <h3 className="mb-2 text-sm font-semibold text-ink-900">Integrations</h3>
              {["Zoho Books", "Tally", "Slack", "Google Workspace"].map((name) => (
                <div key={name} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm">
                  <span className="text-ink-900">{name}</span>
                  <Button size="sm" variant="secondary" onClick={() => push(`Opening ${name} connection settings…`, "info")}>
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
