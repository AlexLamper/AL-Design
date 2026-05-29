"use client";

import { motion } from "framer-motion";
import { site, aboutValues } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal, { itemVariants } from "./Reveal";

export default function About() {
  return (
    <>
      {/* Story */}
      <section className="container-px mx-auto max-w-5xl py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-2">
            <Reveal>
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                Ons verhaal
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900">
                Jouw partner in een sterke online aanwezigheid
              </h2>
            </Reveal>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-600 md:col-span-3">
            <Reveal delay={0.1}>
              <p>
                {site.name} helpt ondernemers opvallen met moderne, gebruiksvriendelijke websites die
                écht resultaat opleveren. Geen standaard template-werk, maar ontwerp op maat dat past
                bij jouw merk en doelen.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Of je nu een eerste website nodig hebt, een verouderde site wilt vernieuwen of online
                wilt verkopen - we denken met je mee en bouwen met de nieuwste technieken. Snel,
                veilig en goed vindbaar in Google.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Persoonlijk contact staat voorop. Korte lijnen, eerlijk advies en een transparante
                prijs. Zo weet je altijd waar je aan toe bent.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-ink-50" />
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
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="font-display text-2xl font-extrabold text-brand-200">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
