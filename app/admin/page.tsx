import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { listProposals, type Proposal } from "@/lib/proposals";
import { formatEuro, formatDate } from "@/lib/format";
import { FEE_INTERVAL_SUFFIX } from "@/lib/proposal-shared";
import StatusBadge from "@/components/StatusBadge";
import ProposalRowActions from "@/components/admin/ProposalRowActions";

export default async function AdminHome() {
  let proposals: Proposal[] = [];
  let dbError: string | null = null;

  try {
    proposals = await listProposals();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Onbekende fout";
  }

  return (
    <div>
      {dbError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-medium text-red-300">Kan geen verbinding maken met de database</p>
            <p className="mt-1 text-sm text-red-400/80">
              Controleer of je MongoDB Atlas cluster actief is (gratis clusters pauzeren automatisch).
              Ga naar atlas.mongodb.com → Clusters → klik <strong>Resume</strong>.
            </p>
            <p className="mt-2 font-mono text-xs text-red-500/70">{dbError}</p>
          </div>
        </div>
      )}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink-900">
            Offertes
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            {proposals.length}{" "}
            {proposals.length === 1 ? "offerte" : "offertes"} in totaal.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-ink-50 transition hover:bg-white"
        >
          Nieuwe offerte
        </Link>
      </div>

      {proposals.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <p className="text-ink-500">Nog geen offertes.</p>
          <Link
            href="/admin/new"
            className="mt-4 inline-block text-sm font-medium text-accent-400 hover:text-accent-500"
          >
            Maak je eerste offerte →
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {proposals.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-white/10 bg-surface/60 p-5 transition hover:border-white/20"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/${p.id}/edit`}
                      className="truncate font-display text-base font-medium text-ink-900 hover:text-white"
                    >
                      {p.projectTitle}
                    </Link>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-ink-500">
                    {p.companyName} · {p.clientName}
                  </p>
                  <p className="mt-2 text-xs text-ink-400">
                    {formatEuro(p.oneTimeFee)} eenmalig
                    {p.monthlyFee > 0 && (
                      <>
                        {" "}
                        · {formatEuro(p.monthlyFee)}{" "}
                        {FEE_INTERVAL_SUFFIX[p.feeInterval]}
                      </>
                    )}{" "}
                    · aangemaakt {formatDate(p.createdAt)}
                  </p>
                </div>

                <ProposalRowActions
                  id={p.id}
                  token={p.token}
                  status={p.status}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
