import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

export default function ProposalNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo className="h-9 w-auto" />
      <h1 className="mt-10 font-display text-2xl font-medium text-ink-900">
        Offerte niet gevonden
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        Deze offerte bestaat niet (meer) of de link is onjuist. Controleer de
        link of neem contact met ons op.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-ink-50 transition hover:bg-white"
      >
        Naar {site.name}
      </Link>
    </main>
  );
}
