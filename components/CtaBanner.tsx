"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Check } from "lucide-react";
import { site } from "@/lib/site";

const perks = ["Vrijblijvend", "Reactie binnen 1 werkdag", "Offerte op maat"];

export default function CtaBanner() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-neutral-100 to-neutral-300 px-8 py-16 text-center shadow-[0_30px_100px_-40px_rgba(255,255,255,0.12)] ring-1 ring-white/10 md:px-16 md:py-24"
      >
        {/* Soft sheen inside the white card */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-neutral-900/[0.04] blur-3xl" />

        <span className="relative block text-sm font-medium uppercase tracking-[0.25em] text-accent-600">
          Klaar om te beginnen?
        </span>
        <h2 className="relative mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
          Laten we jouw project starten
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
          Vertel ons over je idee en ontvang een vrijblijvende offerte op maat — meestal binnen
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
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800"
          >
            Offerte aanvragen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
          >
            <Phone className="h-5 w-5" /> {site.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
