"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { projects } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal, { itemVariants } from "./Reveal";

type Props = {
  limit?: number;
  withCta?: boolean;
  heading?: boolean;
};

export default function Portfolio({ limit, withCta = false, heading = true }: Props) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section
      id="casus"
      className={`relative overflow-hidden pb-20 md:pb-28 ${heading ? "pt-20 md:pt-28" : "pt-4 md:pt-6"}`}
    >
      <div className="container-px mx-auto max-w-7xl">
        {heading && (
          <SectionHeading
            eyebrow="Casus"
            title="Een greep uit onze projecten"
            description="Echte, live websites die wij hebben ontworpen en gebouwd. Klik op een project voor meer details."
          />
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className={`grid gap-8 md:grid-cols-2 ${heading ? "mt-14" : "mt-0"}`}
        >
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {/* Placeholder — always shown last */}
          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              className="group flex h-full min-h-[22rem] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-ink-300 bg-ink-100/30 p-10 text-center transition-all hover:border-accent-400 hover:bg-ink-100/60"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent-400/60 text-accent-400">
                <Plus className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-ink-900">Jouw project hier</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">
                Wil jij ook in ons portfolio? Neem contact op en we bespreken de mogelijkheden.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-300 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-all group-hover:border-accent-400 group-hover:text-accent-400">
                Offerte aanvragen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {withCta && (
          <Reveal className="mt-12 text-center" delay={0.1}>
            <Link
              href="/casus"
              className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface px-7 py-3.5 text-base font-semibold text-ink-800 shadow-soft transition-all hover:border-accent-400 hover:text-accent-400"
            >
              Bekijk alle casussen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
