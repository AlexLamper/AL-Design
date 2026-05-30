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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="container-px mx-auto max-w-3xl text-center"
      >
        <span className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-accent-400">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink-900 md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600 md:text-xl">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
