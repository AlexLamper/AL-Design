"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import Reveal from "./Reveal";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/** One service rendered as a full-bleed editorial panel (no card). */
function Panel({
  index,
  total,
  service,
}: {
  index: number;
  total: number;
  service: (typeof services)[number];
}) {
  const Icon = service.icon;
  return (
    <div className="flex h-full w-screen flex-none items-center">
      <div className="container-px mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-7">
          {/* Oversized ghost index */}
          <span className="pointer-events-none absolute -top-24 -left-2 select-none font-display text-[10rem] font-normal leading-none text-ink-100 md:-top-32 md:text-[16rem]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-200 bg-surface text-ink-900">
              <Icon className="h-7 w-7" />
            </span>
            <span className="ml-4 align-middle text-sm font-medium uppercase tracking-[0.25em] text-accent-400">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <h3 className="mt-7 font-display text-5xl font-normal leading-[0.95] tracking-tight text-ink-900 md:text-7xl">
              {service.title}
            </h3>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500">
              {service.description}
            </p>
          </div>
        </div>

        {/* Feature list as hairline-divided rows, not pills */}
        <div className="lg:col-span-5">
          <ul className="divide-y divide-ink-200 border-y border-ink-200">
            {service.features.map((f, i) => (
              <li key={f} className="flex items-center gap-5 py-5">
                <span className="font-display text-sm tabular-nums text-ink-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium text-ink-800">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/diensten"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-ink-600 transition-colors hover:text-ink-900"
          >
            Meer over deze dienst
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesScroll() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const total = services.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Slide the track horizontally across the full pinned scroll distance.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(total - 1) * 100}vw`]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [1 / total, 1]);

  // Gentle, *smooth* snap: when scrolling stops and you're already close to a
  // panel, ease to its centre. If you're mid-way between panels it leaves you
  // alone — never forced, never instant.
  useEffect(() => {
    if (reduced) return;
    const section = ref.current;
    if (!section) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const snap = () => {
      const vh = window.innerHeight;
      const top = window.scrollY + section.getBoundingClientRect().top;
      const rel = (window.scrollY - top) / vh;
      if (rel < -0.5 || rel > total - 0.5) return; // outside the pinned range
      const nearest = Math.max(0, Math.min(total - 1, Math.round(rel)));
      const targetTop = top + nearest * vh;
      const dist = Math.abs(window.scrollY - targetTop);
      // Only ease in when you're already near a panel (within ~a third).
      if (dist > 4 && dist < vh * 0.33) {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    };

    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(snap);
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [reduced, total]);

  const Heading = (
    <div className="container-px mx-auto max-w-7xl">
      <Reveal>
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
          Diensten
        </span>
      </Reveal>
      <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-4xl font-normal tracking-tight text-ink-900 md:text-5xl">
            Alles voor jouw online aanwezigheid
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-ink-500">
            Eén partner, van het eerste ontwerp tot doorlopend onderhoud.{" "}
            {!reduced && (
              <span className="text-ink-700">Scroll om door de diensten te gaan.</span>
            )}
          </p>
        </Reveal>
      </div>
    </div>
  );

  // Reduced motion / fallback: a clean vertical list, no pinning.
  if (reduced) {
    return (
      <section id="diensten" className="py-20 md:py-28">
        {Heading}
        <div className="container-px mx-auto mt-12 max-w-7xl space-y-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-surface p-8 md:p-10">
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-6 w-6 text-ink-800" />
                  <h3 className="font-display text-2xl font-medium text-ink-900">{service.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-ink-500">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
                  {service.features.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="container-px mx-auto mt-10 max-w-7xl text-center">
          <Link
            href="/diensten"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink-50 shadow-soft transition-all hover:bg-ink-700"
          >
            Bekijk alle diensten &amp; prijzen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="diensten">
      <div className="pt-20 md:pt-28">{Heading}</div>

      {/* Pinned horizontal scroller */}
      <div ref={ref} className="relative" style={{ height: `${total * 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <motion.div style={{ x }} className="flex h-full flex-1">
            {services.map((service, i) => (
              <Panel key={service.title} index={i} total={total} service={service} />
            ))}
          </motion.div>

          {/* Horizontal progress line */}
          <div className="container-px mx-auto w-full max-w-7xl pb-10">
            <div className="h-px w-full bg-ink-200">
              <motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-ink-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl pb-20 text-center md:pb-28">
        <Reveal>
          <Link
            href="/diensten"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink-50 shadow-soft transition-all hover:bg-ink-700"
          >
            Bekijk alle diensten &amp; prijzen
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
