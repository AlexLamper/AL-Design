"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { itemVariants } from "./Reveal";

export default function Process() {
  return (
    <section id="werkwijze" className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Werkwijze"
        title="Van idee naar live in 4 stappen"
        description="Een helder en persoonlijk proces. Je weet altijd waar je aan toe bent."
      />

      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="mt-14 grid gap-6 md:grid-cols-4"
      >
        {processSteps.map((step, i) => (
          <motion.li key={step.title} variants={itemVariants} className="relative">
            <div className="h-full rounded-2xl border border-ink-200 bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="font-display text-5xl font-normal text-brand-100">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-lg font-medium text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
            </div>
            {i < processSteps.length - 1 && (
              <div className="absolute left-full top-1/2 hidden h-px w-6 -translate-y-1/2 bg-ink-300 md:block" />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
