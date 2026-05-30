import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { site, navLinks, services } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-transparent text-ink-400">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo className="h-14 w-auto" variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navigatie
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Diensten
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.title}>
                  <Link href="/diensten" className="transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </li>
              <li className="text-ink-500">KvK: 92873324</li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-white px-5 py-2.5 font-semibold text-ink-50 transition-colors hover:bg-ink-700"
                >
                  Offerte aanvragen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200/50 pt-6 text-sm text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Alle rechten voorbehouden.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacybeleid
          </Link>
        </div>
      </div>
    </footer>
  );
}
