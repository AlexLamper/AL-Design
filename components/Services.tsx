"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";
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
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={itemVariants} className="h-full">
              <Tilt className="group relative h-full overflow-hidden rounded-3xl border border-ink-200 bg-surface p-8 shadow-soft transition-colors duration-300 hover:border-brand-200 hover:shadow-lift">
              {/* Hover glow in the corner */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-brand-400/20 to-accent-400/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              {/* Large faint index */}
              <span className="pointer-events-none absolute right-6 top-4 select-none font-display text-6xl font-normal text-ink-100 transition-colors duration-300 group-hover:text-brand-100">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-ink-50 shadow-lift transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-900">{service.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-ink-600">{service.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1.5 text-xs font-medium text-accent-400"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>

      {withCta && (
        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link
            href="/diensten"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink-50 shadow-lift transition-all hover:bg-ink-700"
          >
            Bekijk alle diensten &amp; prijzen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
