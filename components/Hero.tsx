"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import HeroShowcase from "./HeroShowcase";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const rotatingWords = ["opvallen", "converteren", "verkopen", "groeien"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "0.9em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.9em", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="pr-1 italic text-accent-400"
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      <motion.div
        style={{ y: yContent, opacity: contentOpacity }}
        className="container-px mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"
      >
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="block text-sm font-medium uppercase tracking-[0.25em] text-accent-400"
          >
            Webdesign &amp; development · {site.region}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-light leading-[1.04] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
          >
            Websites die
            <br />
            <RotatingWord />
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink-500 lg:mx-0"
          >
            Wij maken websites die opvallen, snel laden en jouw klanten overtuigen.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-ink-50 transition-all hover:bg-ink-700"
            >
              Vraag een offerte aan
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/casus"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-7 py-3.5 text-base font-medium text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-900"
            >
              Bekijk onze casussen
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: an abstract, eye-catching showpiece */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto hidden w-full max-w-xl md:block"
        >
          <HeroShowcase />
        </motion.div>
      </motion.div>
    </section>
  );
}
