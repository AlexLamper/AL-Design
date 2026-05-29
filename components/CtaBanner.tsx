"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="container-px mx-auto max-w-7xl py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 px-8 py-12 text-center shadow-lift md:px-16 md:py-16"
      >
        <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <h2 className="relative font-display text-3xl font-extrabold text-white md:text-4xl">
          Laten we jouw project starten
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-brand-50">
          Benieuwd wat een nieuwe website kost? Vraag een vrijblijvende offerte aan of bel ons direct.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-soft transition-all hover:bg-brand-50"
          >
            Offerte aanvragen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-5 w-5" /> {site.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
