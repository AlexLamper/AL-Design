"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { site, aboutValues } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal, { itemVariants } from "./Reveal";

const advantages = [
  "Scherpe, eerlijke prijzen",
  "Snel & direct contact",
  "Eén vast aanspreekpunt",
  "Volledige betrokkenheid",
];

export default function About() {
  return (
    <>
      {/* Story */}
      <section className="container-px mx-auto max-w-5xl py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-2">
            <Reveal>
              <span className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-accent-400">
                Over de maker
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink-900">
                Eén persoon, volledige toewijding
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-sm text-ink-500">Alex Lamper — oprichter &amp; developer</p>
            </Reveal>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-600 md:col-span-3">
            <Reveal delay={0.1}>
              <p>
                Achter {site.name} sta ik, Alex Lamper. Ik ontwerp en bouw elke website en elk
                platform zelf - van het eerste idee tot livegang. Geen groot bureau met
                accountmanagers en tussenlagen: je werkt rechtstreeks met de maker.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Dat heeft voordelen. Geen overhead betekent scherpe, eerlijke prijzen. Korte lijnen
                betekenen snel en direct contact - je hoeft nooit te wachten op een afdeling. En
                omdat ik elk project persoonlijk oppak, denk ik echt met je mee.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                {advantages.map((adv) => (
                  <li key={adv} className="flex items-center gap-2.5 text-base text-ink-700">
                    <Check className="h-4 w-4 flex-none text-accent-400" />
                    {adv}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

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
