"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200/70 bg-white/80 backdrop-blur-xl shadow-soft"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-px relative mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Logo className="h-8 w-auto" />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  isActive(link.href) ? "text-brand-600" : "text-ink-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-lift"
          >
            Offerte aanvragen
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-700 md:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-200/70 bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-ink-50 hover:text-brand-600 ${
                  isActive(link.href) ? "text-brand-600" : "text-ink-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 flex flex-col gap-2 px-1">
            <a
              href={`tel:${site.phoneIntl}`}
              className="flex items-center justify-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-700"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Offerte aanvragen
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
