"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-32 -left-24 -z-10 h-96 w-96 rounded-full bg-brand-300/40 blur-3xl animate-blob" />
      <div className="absolute -top-20 right-0 -z-10 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl animate-blob [animation-delay:-12s]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-px mx-auto max-w-5xl text-center"
      >
        <motion.div variants={item} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-soft backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Webdesign &amp; development uit {site.region}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl md:text-7xl"
        >
          Moderne websites die{" "}
          <span className="relative whitespace-nowrap">
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              opvallen
            </span>
          </span>{" "}
          én opleveren
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-lg text-ink-600 md:text-xl"
        >
          {site.name} ontwerpt en bouwt snelle, professionele websites en webshops op maat. Van
          concept tot livegang — jouw merk online op zijn best.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lift transition-all hover:bg-brand-700"
          >
            Vraag een offerte aan
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/werk"
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-semibold text-ink-800 shadow-soft transition-all hover:border-brand-300 hover:text-brand-700"
          >
            Bekijk ons werk
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm text-ink-500 sm:flex-row"
        >
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
          >
            <Mail className="h-4 w-4" /> {site.email}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
