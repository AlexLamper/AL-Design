"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { acceptProposalAction, type FormState } from "@/lib/proposal-actions";

export default function AcceptProposal({ token }: { token: string }) {
  const boundAction = acceptProposalAction.bind(null, token);
  const [state, action, pending] = useActionState<FormState, FormData>(
    boundAction,
    {},
  );

  return (
    <section className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-b from-surface-2 to-surface p-8 shadow-lift">
      <h2 className="font-display text-xl font-medium text-ink-900">
        Akkoord op deze offerte
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Ga je akkoord? Vul je naam in en bevestig. Je ontvangt vervolgens bericht
        over de volgende stappen.
      </p>

      <form action={action} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="acceptedByName"
            className="mb-1.5 block text-xs font-medium text-ink-600"
          >
            Naam ter bevestiging
          </label>
          <input
            id="acceptedByName"
            name="acceptedByName"
            required
            placeholder="Je volledige naam"
            className="w-full max-w-sm rounded-lg border border-white/10 bg-ink-100 px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
        </div>

        {state.error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-ink-50 transition hover:bg-white disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          {pending ? "Bezig…" : "Offerte accepteren"}
        </button>
      </form>
    </section>
  );
}
