"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

/** Compact hero used at the top of subpages. */
export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-28 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-blob" />
      <div className="absolute -top-16 right-10 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl animate-blob [animation-delay:-8s]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="container-px mx-auto max-w-3xl text-center"
      >
        <span className="inline-block rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-soft backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600 md:text-xl">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
