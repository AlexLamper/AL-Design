"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

type Props = {
  limit?: number;
  withCta?: boolean;
  heading?: boolean;
};

export default function Portfolio({ limit, withCta = false, heading = true }: Props) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="werk" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-ink-50/70" />
      <div className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="container-px mx-auto max-w-7xl">
        {heading && (
          <SectionHeading
            eyebrow="Werk"
            title="Een greep uit onze projecten"
            description="Echte, live websites die wij hebben ontworpen en gebouwd. Klik op een project voor meer details."
          />
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        {withCta && (
          <Reveal className="mt-12 text-center" delay={0.1}>
            <Link
              href="/werk"
              className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-semibold text-ink-800 shadow-soft transition-all hover:border-brand-300 hover:text-brand-700"
            >
              Bekijk al ons werk
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
