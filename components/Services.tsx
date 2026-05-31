"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Globe, Wrench, Eye } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal, { itemVariants } from "./Reveal";

const everythingItems = [
  { icon: Globe, label: "Domein & hosting" },
  { icon: Eye, label: "SEO & zichtbaarheid" },
  { icon: Shield, label: "Veiligheid & updates" },
  { icon: Wrench, label: "Doorlopend onderhoud" },
];

export default function Services({
  withCta = false,
  hideHeading = false,
}: {
  withCta?: boolean;
  hideHeading?: boolean;
}) {
  return (
    <section id="diensten" className={`container-px mx-auto max-w-7xl ${hideHeading ? "pt-4 pb-20 md:pt-6 md:pb-28" : "py-20 md:py-28"}`}>
      {!hideHeading && (
        <SectionHeading
          eyebrow="Diensten"
          title="Alles voor jouw online aanwezigheid"
          description="Van het eerste ontwerp tot doorlopend onderhoud. Eén partner voor je complete digitale uitstraling."
        />
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className={`grid gap-5 md:grid-cols-2 ${!hideHeading ? "mt-14" : ""}`}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-surface p-7 transition-all duration-300 hover:border-accent-500/40 hover:shadow-lift"
            >
              {/* Accent glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent-500/20 bg-accent-500/10 text-accent-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-display text-xl font-medium text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-ink-600">
                      <Check className="h-4 w-4 flex-none text-accent-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* "Wij regelen alles" strip */}
      <Reveal delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2 to-surface px-8 py-7">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent-400">
            Volledig ontzorgd - wij regelen alles
          </p>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-500">
            Van het opzetten van je site tot domein, hosting, zichtbaarheid in Google en
            doorlopend onderhoud. Jij hoeft nergens naar om te kijken.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {everythingItems.map(({ icon: ItemIcon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-100 px-4 py-2 text-sm font-medium text-ink-700"
              >
                <ItemIcon className="h-4 w-4 text-accent-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {withCta && (
        <Reveal className="mt-10 text-center" delay={0.1}>
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
