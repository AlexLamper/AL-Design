import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, FileText } from "lucide-react";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import { site } from "@/lib/site";
import { getProposalByToken } from "@/lib/proposals";
import {
  FEE_INTERVAL_LABELS,
  FEE_INTERVAL_SUFFIX,
  proposalNumber,
} from "@/lib/proposal-shared";
import { formatEuro, formatDate, formatDateTime } from "@/lib/format";
import AcceptProposal from "./AcceptProposal";

export async function generateMetadata({
  params,
}: PageProps<"/offerte/[token]">): Promise<Metadata> {
  const { token } = await params;
  const proposal = await getProposalByToken(token);
  return {
    title: proposal ? `Offerte - ${proposal.projectTitle}` : "Offerte",
    robots: { index: false, follow: false },
  };
}

export default async function PublicProposalPage({
  params,
}: PageProps<"/offerte/[token]">) {
  const { token } = await params;
  const proposal = await getProposalByToken(token);

  // Drafts are not yet shared; only sent/accepted/rejected are viewable.
  if (!proposal || proposal.status === "draft") notFound();

  // Offerte is geldig tot opmaakdatum + geldigheidsduur.
  const validUntil = new Date(proposal.createdAt);
  validUntil.setDate(validUntil.getDate() + proposal.validityDays);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="container-px mx-auto flex h-16 max-w-3xl items-center justify-between">
          <Logo className="h-7 w-auto" />
          <StatusBadge status={proposal.status} />
        </div>
      </header>

      <main className="container-px mx-auto max-w-3xl py-14">
        {/* Title */}
        <p className="text-sm font-medium uppercase tracking-wider text-accent-400">
          Offerte
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 sm:text-4xl">
          {proposal.projectTitle}
        </h1>
        <p className="mt-3 text-ink-500">
          Voorbereid voor{" "}
          <span className="text-ink-700">{proposal.companyName}</span> · t.a.v.{" "}
          {proposal.clientName}
        </p>
        {(proposal.clientAddress || proposal.clientVatNumber) && (
          <p className="mt-1 text-sm text-ink-500">
            {proposal.clientAddress}
            {proposal.clientAddress && proposal.clientVatNumber && " · "}
            {proposal.clientVatNumber && <>Btw: {proposal.clientVatNumber}</>}
          </p>
        )}

        {/* Kenmerken: offertenummer + opmaakdatum */}
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-2xl border border-white/10 bg-surface/60 p-5 text-sm sm:max-w-md">
          <dt className="text-ink-500">Offertenummer</dt>
          <dd className="text-ink-700">{proposalNumber(proposal)}</dd>
          <dt className="text-ink-500">Opmaakdatum</dt>
          <dd className="text-ink-700">{formatDate(proposal.createdAt)}</dd>
          <dt className="text-ink-500">Geldig tot</dt>
          <dd className="text-ink-700">{formatDate(validUntil.toISOString())}</dd>
        </dl>

        {/* Accepted banner */}
        {proposal.status === "accepted" && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <p className="font-medium text-emerald-300">
                Deze offerte is geaccepteerd
              </p>
              {proposal.acceptedAt && (
                <p className="mt-1 text-sm text-emerald-400/80">
                  Akkoord gegeven op {formatDateTime(proposal.acceptedAt)}
                  {proposal.acceptedByName && <> door {proposal.acceptedByName}</>}.
                </p>
              )}
            </div>
          </div>
        )}

        {proposal.status === "rejected" && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-surface/60 p-5 text-sm text-ink-500">
            Deze offerte is afgewezen. Neem gerust contact op als je vragen hebt.
          </div>
        )}

        {/* Description */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink-800">
            Over het project
          </h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-600">
            {proposal.projectDescription}
          </p>
        </section>

        {/* Services */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink-800">
            Wat is inbegrepen
          </h2>
          <ul className="mt-4 space-y-3">
            {proposal.services.map((service, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15">
                  <Check className="h-3 w-3 text-accent-400" />
                </span>
                <span className="text-ink-700">{service}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink-800">
            Tijdlijn
          </h2>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/60 p-5">
            <Clock className="h-5 w-5 shrink-0 text-ink-500" />
            <span className="text-ink-700">{proposal.timeline}</span>
          </div>
        </section>

        {/* Investment */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink-800">
            Investering
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
              <p className="text-sm text-ink-500">Eenmalig</p>
              <p className="mt-2 font-display text-3xl font-medium text-ink-900">
                {formatEuro(proposal.oneTimeFee)}
              </p>
              <p className="mt-1 text-xs text-ink-400">excl. btw</p>
            </div>
            {proposal.monthlyFee > 0 && (
              <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
                <p className="text-sm text-ink-500">
                  {FEE_INTERVAL_LABELS[proposal.feeInterval]}
                </p>
                <p className="mt-2 font-display text-3xl font-medium text-ink-900">
                  {formatEuro(proposal.monthlyFee)}
                  <span className="text-base text-ink-400">
                    {" "}
                    {FEE_INTERVAL_SUFFIX[proposal.feeInterval]}
                  </span>
                </p>
                <p className="mt-1 text-xs text-ink-400">excl. btw</p>
              </div>
            )}
          </div>
        </section>

        {/* Notes */}
        {proposal.notes && (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 font-display text-lg font-medium text-ink-800">
              <FileText className="h-4 w-4 text-ink-500" />
              Aanvullende opmerkingen
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-600">
              {proposal.notes}
            </p>
          </section>
        )}

        {/* Voorwaarden */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink-800">
            Voorwaarden
          </h2>
          <ul className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 text-sm text-ink-600">
            <li>
              <span className="text-ink-500">Betalingstermijn:</span> betaling
              binnen {proposal.paymentTermDays} dagen na facturatie.
            </li>
            <li>
              <span className="text-ink-500">Geldigheid:</span> deze offerte is{" "}
              {proposal.validityDays} dagen geldig, tot en met{" "}
              {formatDate(validUntil.toISOString())}.
            </li>
            <li>
              <span className="text-ink-500">Btw:</span> alle genoemde bedragen
              zijn exclusief btw.
            </li>
          </ul>
        </section>

        {/* Accept */}
        {proposal.status === "sent" && (
          <AcceptProposal token={proposal.token} />
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-ink-500">
          <p>
            Vragen over deze offerte? Neem contact op met {site.name} via{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent-400 hover:text-accent-500"
            >
              {site.email}
            </a>{" "}
            of{" "}
            <a
              href={`tel:${site.phoneIntl}`}
              className="text-accent-400 hover:text-accent-500"
            >
              {site.phone}
            </a>
            .
          </p>
          <p className="mt-4 text-xs text-ink-400">
            {site.legalName}
            {site.address && <> · {site.address}</>}
            {site.kvk && <> · KvK {site.kvk}</>}
            {site.vatNumber && <> · Btw {site.vatNumber}</>}
          </p>
        </footer>
      </main>
    </div>
  );
}
