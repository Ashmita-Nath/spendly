import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Approval } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";

export function ApprovalCard({
  approval,
  actionable,
  onApprove,
  onReject,
}: {
  approval: Approval;
  actionable: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-900">{approval.request}</p>
          <p className="mt-0.5 text-xs text-ink-400">
            {approval.employee} · {approval.category} · {formatDate(approval.date)}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-ink-900">{formatINR(approval.amount)}</p>
      </div>
      {actionable ? (
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={onApprove}>
            Approve
          </Button>
          <Button size="sm" variant="danger" onClick={onReject}>
            Reject
          </Button>
          <Button size="sm" variant="ghost">
            View Details
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
