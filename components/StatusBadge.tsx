import { STATUS_LABELS, type ProposalStatus } from "@/lib/proposal-shared";

const STYLES: Record<ProposalStatus, string> = {
  draft: "bg-ink-200 text-ink-700",
  sent: "bg-accent-500/15 text-accent-400",
  accepted: "bg-emerald-500/15 text-emerald-400",
  rejected: "bg-red-500/15 text-red-400",
};

export default function StatusBadge({ status }: { status: ProposalStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
