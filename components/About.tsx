"use client";

import { motion } from "framer-motion";
import { aboutValues } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { itemVariants } from "./Reveal";

export default function About() {
  return (
    <>
      {/* Values */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Waar we voor staan"
            title="Onze kernwaarden"
            description="De principes waarmee we elk project aanpakken."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {aboutValues.map((value, i) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="font-display text-2xl font-normal text-brand-200">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-lg font-medium text-ink-900">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
