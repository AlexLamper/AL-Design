"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, shotUrl, type Project } from "@/lib/site";
import BrowserFrame from "./BrowserFrame";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/** A single project that the visitor flies through: it rushes in from the
 *  depth (small + blurred), holds full-size in the centre, then zooms past. */
function TunnelStage({
  project,
  index,
  total,
  reduced,
}: {
  project: Project;
  index: number;
  total: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.66, 1, 1, 1.3]);
  // Sharpen earlier and keep the max blur low so a project is legible a touch
  // sooner as it approaches the centre (but still soft far out / on the way past).
  const blurPx = useTransform(scrollYProgress, [0, 0.3, 0.62, 1], [7, 0, 0, 9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 0.86, 1],
    [0, 1, 1, 1, 0]
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [9, 0, -7]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const accent = index % 2 === 0 ? "from-brand-500/45" : "from-accent-500/45";

  const Card = (
    <div className="group relative w-full max-w-4xl px-6">
      {/* Ghost index that sits behind the frame */}
      <span className="pointer-events-none absolute -top-16 left-2 select-none font-display text-[8rem] font-normal leading-none text-ink-200/70 md:-top-24 md:text-[12rem]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Glow */}
      <div
        className={`pointer-events-none absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br ${accent} to-transparent blur-3xl`}
      />

      <Link href={`/casus/${project.slug}`} className="block">
        <div className="rounded-2xl ring-1 ring-ink-300/40 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
          <BrowserFrame
            domain={project.domain}
            shotUrl={shotUrl(project.url)}
            alt={`Website ${project.name} (${project.domain}) gemaakt door AL Design`}
          />
        </div>

        {/* Caption */}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              {project.category} · {project.year}
            </span>
            <h3 className="mt-2 font-display text-3xl font-normal tracking-tight text-ink-900 md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-2 max-w-xl text-ink-500">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-200 bg-surface/60 px-3 py-1 text-xs font-medium text-ink-500 backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex flex-none items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-50 shadow-lift transition-transform duration-300 group-hover:scale-105">
            Bekijk project
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </div>
  );

  if (reduced) {
    return (
      <div className="container-px mx-auto flex max-w-5xl justify-center py-12">
        {Card}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[150vh]" aria-label={`Project ${index + 1} van ${total}`}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center"
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={{
            scale,
            opacity,
            filter,
            rotateX,
            transformStyle: "preserve-3d",
            willChange: "transform, filter, opacity",
          }}
          className="flex w-full justify-center"
        >
          {Card}
        </motion.div>
      </div>
    </div>
  );
}

/** The immersive "scroll through the projects" tunnel for the homepage. */
export default function ProjectTunnel() {
  const reduced = useReducedMotion();

  return (
    <section id="casus" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-44">
      {/* Tunnel backdrop: concentric rings that stay centred while you scroll. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <div className="tunnel-rings animate-tunnel h-[160vmax] w-[160vmax] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_75%)]" />
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Casus"
          title="Scroll door onze projecten"
          description="Echte, live websites die wij ontwierpen en bouwden. Scroll en zoom er doorheen."
        />
      </div>

      <div className="mt-10">
        {projects.map((project, i) => (
          <TunnelStage
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            reduced={reduced}
          />
        ))}
      </div>

      <Reveal className="mt-8 text-center">
        <Link
          href="/casus"
          className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface/60 px-7 py-3.5 text-base font-semibold text-ink-800 backdrop-blur transition-all hover:border-brand-400 hover:text-accent-400"
        >
          Bekijk alle casussen
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
