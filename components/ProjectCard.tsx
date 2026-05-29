"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/site";
import BrowserFrame from "./BrowserFrame";
import { itemVariants } from "./Reveal";

function shotUrl(url: string) {
  // Live screenshot service — renders the actual site as an image.
  return `https://image.thum.io/get/width/1200/crop/900/noanimate/${url}`;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      className="group block rounded-3xl border border-ink-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
    >
      <BrowserFrame
        domain={project.domain}
        shotUrl={shotUrl(project.url)}
        alt={`Screenshot van de website ${project.name} (${project.domain}) gemaakt door AL Design`}
      />

      <div className="flex items-start justify-between gap-4 px-2 pt-5 pb-2">
        <div>
          <h3 className="font-display text-xl font-bold text-ink-900">{project.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="flex-none rounded-full bg-brand-50 p-2.5 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </motion.a>
  );
}
