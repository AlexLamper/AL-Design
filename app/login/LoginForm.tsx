"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth-actions";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-ink-100 px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-600">
          E-mailadres
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink-600">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
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
        className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-ink-50 transition hover:bg-white disabled:opacity-60"
      >
        {pending ? "Bezig…" : "Inloggen"}
      </button>
    </form>
  );
}
