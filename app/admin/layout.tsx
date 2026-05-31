import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Offertebeheer",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-50/80 backdrop-blur">
        <div className="container-px mx-auto flex h-16 max-w-5xl items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo className="h-7 w-auto" />
            <span className="hidden font-display text-sm text-ink-500 sm:inline">
              Offertebeheer
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-ink-500 sm:inline">
              {session.user.email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-white/5"
              >
                Uitloggen
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-px mx-auto max-w-5xl py-10">{children}</main>
    </div>
  );
}
