import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { auth } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 flex justify-center">
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="rounded-2xl border border-white/10 bg-surface/80 p-8 shadow-lift backdrop-blur">
          <h1 className="font-display text-xl font-medium text-ink-900">
            Beheer
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Log in om offertes te beheren.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
