"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { shotUrl, type Project } from "@/lib/site";
import BrowserFrame from "./BrowserFrame";
import Tilt from "./Tilt";
import { itemVariants } from "./Reveal";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Tilt className="group relative h-full overflow-hidden rounded-3xl border border-ink-200 bg-white p-4 shadow-soft transition-colors duration-300 hover:border-brand-200 hover:shadow-lift">
      <Link href={`/werk/${project.slug}`} className="block">
        <BrowserFrame
          domain={project.domain}
          shotUrl={shotUrl(project.url)}
          alt={`Screenshot van de website ${project.name} (${project.domain}) gemaakt door AL Design`}
        />

        <div className="flex items-start justify-between gap-4 px-2 pt-5 pb-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {project.category}
            </span>
            <h3 className="mt-1 font-display text-xl font-bold text-ink-900">{project.name}</h3>
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
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
      </Tilt>
    </motion.div>
  );
}
