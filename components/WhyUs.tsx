"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { usps } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { itemVariants } from "./Reveal";

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Waarom AL Design"
          title="Waarom kiezen voor ons?"
          description="Geen standaard bureau. Persoonlijk, snel en met oog voor kwaliteit."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {usps.map((usp) => (
            <motion.div
              key={usp.title}
              variants={itemVariants}
              className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-bold text-ink-900">{usp.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{usp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
