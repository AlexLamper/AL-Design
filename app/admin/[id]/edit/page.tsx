import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import ProposalForm from "@/components/admin/ProposalForm";
import { getProposalById } from "@/lib/proposals";

export default async function EditProposalPage({
  params,
}: PageProps<"/admin/[id]/edit">) {
  const { id } = await params;

  let proposal: Awaited<ReturnType<typeof getProposalById>> = null;
  let dbError: string | null = null;

  try {
    proposal = await getProposalById(id);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Onbekende fout";
  }

  if (!dbError && !proposal) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-xs text-ink-500 hover:text-ink-700">
          ← Terug naar overzicht
        </Link>
        {proposal && (
          <Link
            href={`/proposal/${proposal.token}`}
            target="_blank"
            className="text-xs font-medium text-accent-400 hover:text-accent-500"
          >
            Publieke pagina bekijken →
          </Link>
        )}
      </div>
      <h1 className="mt-3 mb-8 font-display text-2xl font-medium text-ink-900">
        Offerte bewerken
      </h1>

      {dbError ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-medium text-red-300">Kan geen verbinding maken met de database</p>
            <p className="mt-1 text-sm text-red-400/80">
              Controleer of je MongoDB Atlas cluster actief is. Ga naar atlas.mongodb.com - klik <strong>Resume</strong> als het cluster gepauzeerd is.
            </p>
            <p className="mt-2 font-mono text-xs text-red-500/70">{dbError}</p>
          </div>
        </div>
      ) : (
        <ProposalForm proposal={proposal ?? undefined} />
      )}
    </div>
  );
}
