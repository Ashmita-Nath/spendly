"use client";

import { useMemo, useState } from "react";
import { CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ApprovalCard } from "@/components/approvals/ApprovalCard";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { approvals as initialApprovals } from "@/data/approvals";
import { Approval, ApprovalStatus } from "@/types";

const SECTIONS: { key: ApprovalStatus; title: string }[] = [
  { key: "Needs My Approval", title: "Needs My Approval" },
  { key: "Waiting for Others", title: "Waiting for Others" },
  { key: "Approved", title: "Approved" },
  { key: "Rejected", title: "Rejected" },
];

export default function ApprovalsPage() {
  const { push } = useToast();
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [pendingAction, setPendingAction] = useState<{ id: string; type: "approve" | "reject" } | null>(null);

  const grouped = useMemo(() => {
    const map: Record<ApprovalStatus, Approval[]> = {
      "Needs My Approval": [],
      "Waiting for Others": [],
      Approved: [],
      Rejected: [],
    };
    approvals.forEach((a) => map[a.status].push(a));
    return map;
  }, [approvals]);

  function resolveAction() {
    if (!pendingAction) return;
    const newStatus: ApprovalStatus = pendingAction.type === "approve" ? "Approved" : "Rejected";
    setApprovals((prev) => prev.map((a) => (a.id === pendingAction.id ? { ...a, status: newStatus } : a)));
    push(pendingAction.type === "approve" ? "Request approved." : "Request rejected.", pendingAction.type === "approve" ? "success" : "error");
    setPendingAction(null);
  }

  const activeApproval = approvals.find((a) => a.id === pendingAction?.id);

  return (
    <div className="space-y-8">
      <PageHeader title="Approval Center" subtitle="Review and act on spending requests across your team." />

      {SECTIONS.map((section) => (
        <div key={section.key}>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold text-ink-900">{section.title}</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-ink-600">
              {grouped[section.key].length}
            </span>
          </div>
          {grouped[section.key].length === 0 ? (
            <EmptyState icon={CheckSquare} title={`No items in ${section.title.toLowerCase()}`} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[section.key].map((a) => (
                <ApprovalCard
                  key={a.id}
                  approval={a}
                  actionable={section.key === "Needs My Approval"}
                  onApprove={() => setPendingAction({ id: a.id, type: "approve" })}
                  onReject={() => setPendingAction({ id: a.id, type: "reject" })}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={!!pendingAction}
        title={pendingAction?.type === "approve" ? "Approve this request?" : "Reject this request?"}
        description={
          activeApproval
            ? `${activeApproval.request} for ${activeApproval.employee} will be marked as ${
                pendingAction?.type === "approve" ? "approved" : "rejected"
              }.`
            : ""
        }
        confirmLabel={pendingAction?.type === "approve" ? "Approve" : "Reject"}
        tone={pendingAction?.type === "reject" ? "danger" : "primary"}
        onConfirm={resolveAction}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
