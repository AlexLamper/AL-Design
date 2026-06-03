"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  FEE_INTERVALS,
  FEE_INTERVAL_LABELS,
  PROPOSAL_STATUSES,
  STATUS_LABELS,
  type Proposal,
} from "@/lib/proposal-shared";
import { saveProposalAction, type FormState } from "@/lib/proposal-actions";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-ink-100 px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500";
const labelClass = "mb-1.5 block text-xs font-medium text-ink-600";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-xs text-red-400">{messages[0]}</p>;
}

export default function ProposalForm({ proposal }: { proposal?: Proposal }) {
  const boundAction = saveProposalAction.bind(null, proposal?.id);
  const [state, action, pending] = useActionState<FormState, FormData>(
    boundAction,
    {},
  );
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-8">
      {state.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <section className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="clientName" className={labelClass}>
            Naam klant
          </label>
          <input
            id="clientName"
            name="clientName"
            defaultValue={proposal?.clientName}
            className={inputClass}
          />
          <FieldError messages={errors.clientName} />
        </div>
        <div>
          <label htmlFor="companyName" className={labelClass}>
            Bedrijfsnaam
          </label>
          <input
            id="companyName"
            name="companyName"
            defaultValue={proposal?.companyName}
            className={inputClass}
          />
          <FieldError messages={errors.companyName} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contactEmail" className={labelClass}>
            Contact e-mail
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={proposal?.contactEmail}
            className={inputClass}
          />
          <FieldError messages={errors.contactEmail} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="clientAddress" className={labelClass}>
            Adres klant
            <span className="ml-1 font-normal text-ink-400">- optioneel</span>
          </label>
          <input
            id="clientAddress"
            name="clientAddress"
            placeholder="Straatnaam 1, 1234 AB Plaats"
            defaultValue={proposal?.clientAddress}
            className={inputClass}
          />
          <FieldError messages={errors.clientAddress} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="clientVatNumber" className={labelClass}>
            Btw-nummer klant
            <span className="ml-1 font-normal text-ink-400">- optioneel</span>
          </label>
          <input
            id="clientVatNumber"
            name="clientVatNumber"
            placeholder="NL000000000B00"
            defaultValue={proposal?.clientVatNumber}
            className={inputClass}
          />
          <FieldError messages={errors.clientVatNumber} />
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <label htmlFor="projectTitle" className={labelClass}>
            Projecttitel
          </label>
          <input
            id="projectTitle"
            name="projectTitle"
            defaultValue={proposal?.projectTitle}
            className={inputClass}
          />
          <FieldError messages={errors.projectTitle} />
        </div>
        <div>
          <label htmlFor="projectDescription" className={labelClass}>
            Projectomschrijving
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={4}
            defaultValue={proposal?.projectDescription}
            className={inputClass}
          />
          <FieldError messages={errors.projectDescription} />
        </div>
        <div>
          <label htmlFor="services" className={labelClass}>
            Inbegrepen diensten / onderdelen
            <span className="ml-1 font-normal text-ink-400">
              - één per regel
            </span>
          </label>
          <textarea
            id="services"
            name="services"
            rows={5}
            placeholder={"Uniek webdesign op maat\nResponsive development\nSEO-optimalisatie"}
            defaultValue={proposal?.services.join("\n")}
            className={inputClass}
          />
          <FieldError messages={errors.services} />
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="timeline" className={labelClass}>
            Tijdlijn
          </label>
          <input
            id="timeline"
            name="timeline"
            placeholder="bijv. 3–4 weken na akkoord"
            defaultValue={proposal?.timeline}
            className={inputClass}
          />
          <FieldError messages={errors.timeline} />
        </div>
        <div>
          <label htmlFor="oneTimeFee" className={labelClass}>
            Eenmalige projectprijs (€)
          </label>
          <input
            id="oneTimeFee"
            name="oneTimeFee"
            type="number"
            min={0}
            step="0.01"
            defaultValue={proposal?.oneTimeFee ?? 0}
            className={inputClass}
          />
          <FieldError messages={errors.oneTimeFee} />
        </div>
        <div>
          <label htmlFor="monthlyFee" className={labelClass}>
            Terugkerend bedrag (€)
          </label>
          <input
            id="monthlyFee"
            name="monthlyFee"
            type="number"
            min={0}
            step="0.01"
            defaultValue={proposal?.monthlyFee ?? 0}
            className={inputClass}
          />
          <FieldError messages={errors.monthlyFee} />
        </div>
        <div>
          <label htmlFor="feeInterval" className={labelClass}>
            Facturatie-interval
          </label>
          <select
            id="feeInterval"
            name="feeInterval"
            defaultValue={proposal?.feeInterval ?? "month"}
            className={inputClass}
          >
            {FEE_INTERVALS.map((iv) => (
              <option key={iv} value={iv}>
                {FEE_INTERVAL_LABELS[iv]}
              </option>
            ))}
          </select>
          <FieldError messages={errors.feeInterval} />
        </div>
        <div>
          <label htmlFor="paymentTermDays" className={labelClass}>
            Betalingstermijn (dagen)
          </label>
          <input
            id="paymentTermDays"
            name="paymentTermDays"
            type="number"
            min={0}
            step="1"
            defaultValue={proposal?.paymentTermDays ?? 14}
            className={inputClass}
          />
          <FieldError messages={errors.paymentTermDays} />
        </div>
        <div>
          <label htmlFor="validityDays" className={labelClass}>
            Geldigheidsduur (dagen)
          </label>
          <input
            id="validityDays"
            name="validityDays"
            type="number"
            min={0}
            step="1"
            defaultValue={proposal?.validityDays ?? 30}
            className={inputClass}
          />
          <FieldError messages={errors.validityDays} />
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Aanvullende opmerkingen
            <span className="ml-1 font-normal text-ink-400">- optioneel</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={proposal?.notes}
            className={inputClass}
          />
          <FieldError messages={errors.notes} />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={proposal?.status ?? "draft"}
            className={inputClass}
          >
            {PROPOSAL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <FieldError messages={errors.status} />
        </div>
      </section>

      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-ink-50 transition hover:bg-white disabled:opacity-60"
        >
          {pending ? "Opslaan…" : "Opslaan"}
        </button>
        <Link
          href="/admin"
          className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-white/5"
        >
          Annuleren
        </Link>
      </div>
    </form>
  );
}
