"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Portfolio() {
  return (
    <section id="werk" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-ink-50" />
      <div className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Werk"
          title="Een greep uit onze projecten"
          description="Echte, live websites die wij hebben ontworpen en gebouwd. Klik op een project om het zelf te bekijken."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.domain} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
