"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal, { itemVariants } from "./Reveal";

export default function Services({ withCta = false }: { withCta?: boolean }) {
  return (
    <section id="diensten" className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Diensten"
        title="Alles voor jouw online aanwezigheid"
        description="Van het eerste ontwerp tot doorlopend onderhoud. Eén partner voor je complete digitale uitstraling."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink-900">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                    <Check className="h-4 w-4 flex-none text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {withCta && (
        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link
            href="/diensten"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lift transition-all hover:bg-brand-700"
          >
            Bekijk alle diensten &amp; prijzen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
