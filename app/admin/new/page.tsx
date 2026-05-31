import Link from "next/link";
import ProposalForm from "@/components/admin/ProposalForm";

export default function NewProposalPage() {
  return (
    <div>
      <Link href="/admin" className="text-xs text-ink-500 hover:text-ink-700">
        ← Terug naar overzicht
      </Link>
      <h1 className="mt-3 mb-8 font-display text-2xl font-medium text-ink-900">
        Nieuwe offerte
      </h1>
      <ProposalForm />
    </div>
  );
}
