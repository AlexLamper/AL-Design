"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Check } from "lucide-react";
import { site } from "@/lib/site";

const perks = ["Vrijblijvend", "Snel reactie", "Offerte op maat"];

export default function CtaBanner() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-neutral-300 px-6 py-12 text-center shadow-[0_30px_100px_-40px_rgba(255,255,255,0.12)] ring-1 ring-white/10 sm:px-10 sm:py-16 md:rounded-[2rem] md:px-16 md:py-24"
      >
        {/* Soft sheen inside the white card */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-neutral-900/[0.04] blur-3xl" />

        <span className="relative block text-sm font-medium uppercase tracking-[0.25em] text-accent-600">
          Klaar om te beginnen?
        </span>
        <h2 className="relative mt-5 text-balance font-display text-[1.75rem] font-medium leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl md:text-6xl">
          Laten we jouw project starten
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
          Vertel ons over je idee en ontvang een vrijblijvende offerte op maat - meestal binnen
          één werkdag.
        </p>

        <ul className="relative mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-medium text-neutral-600">
          {perks.map((perk) => (
            <li key={perk} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-accent-600" />
              {perk}
            </li>
          ))}
        </ul>

        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 sm:w-auto"
          >
            Offerte aanvragen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 sm:w-auto"
          >
            <Phone className="h-5 w-5" /> {site.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
