"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  PROPOSAL_STATUSES,
  STATUS_LABELS,
  type ProposalStatus,
} from "@/lib/proposal-shared";
import { deleteProposalAction, setStatusAction } from "@/lib/proposal-actions";

export default function ProposalRowActions({
  id,
  token,
  status,
}: {
  id: string;
  token: string;
  status: ProposalStatus;
}) {
  const statusFormRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}/offerte/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <form ref={statusFormRef} action={setStatusAction}>
        <input type="hidden" name="id" value={id} />
        <select
          name="status"
          defaultValue={status}
          onChange={() => statusFormRef.current?.requestSubmit()}
          aria-label="Status wijzigen"
          className="rounded-lg border border-white/10 bg-ink-100 px-2.5 py-1.5 text-xs text-ink-700 outline-none focus:border-accent-500"
        >
          {PROPOSAL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </form>

      <button
        type="button"
        onClick={copyLink}
        className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-white/5"
      >
        {copied ? "Gekopieerd!" : "Kopieer link"}
      </button>

      <Link
        href={`/offerte/${token}`}
        target="_blank"
        className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-white/5"
      >
        Bekijk
      </Link>

      <Link
        href={`/admin/${id}/edit`}
        className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-white/5"
      >
        Bewerk
      </Link>

      <form
        action={deleteProposalAction}
        onSubmit={(e) => {
          if (!confirm("Deze offerte definitief verwijderen?")) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
        >
          Verwijder
        </button>
      </form>
    </div>
  );
}
