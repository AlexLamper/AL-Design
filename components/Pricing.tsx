"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { itemVariants } from "./Reveal";

export default function Pricing() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Pakketten"
        title="Transparante prijzen, geen verrassingen"
        description="Kies het pakket dat bij je past. Liever maatwerk? Vraag gerust een offerte op maat aan."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mt-14 grid items-start gap-6 lg:grid-cols-3"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={itemVariants}
            className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
              pkg.highlight
                ? "border-accent-400 bg-surface shadow-lift ring-1 ring-brand-200"
                : "border-ink-200 bg-surface shadow-soft"
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-ink-50 shadow-soft">
                Meest gekozen
              </span>
            )}
            <h3 className="font-display text-xl font-medium text-ink-900">{pkg.name}</h3>
            <p className="mt-1.5 min-h-[2.5rem] text-sm text-ink-600">{pkg.tagline}</p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-3xl font-normal text-ink-900">
                {pkg.priceOnce}
              </span>
            </div>
            {pkg.priceMonthly && (
              <p className="mt-1 text-sm text-ink-500">daarna {pkg.priceMonthly}</p>
            )}

            <ul className="mt-6 flex-1 space-y-3">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                pkg.highlight
                  ? "bg-white text-ink-50 shadow-soft hover:bg-ink-700"
                  : "border border-ink-200 text-ink-800 hover:border-accent-400 hover:text-accent-400"
              }`}
            >
              Offerte aanvragen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-8 text-center text-sm text-ink-500">
        Genoemde prijzen zijn indicatief en exclusief btw. Je ontvangt altijd vooraf een offerte op
        maat.
      </p>
    </section>
  );
}
