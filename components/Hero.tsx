"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Phone, Mail, Sparkles, Gauge, Star } from "lucide-react";
import { site, projects, shotUrl } from "@/lib/site";
import BrowserFrame from "./BrowserFrame";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
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
    const t = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "0.9em", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.9em", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text pr-1 text-transparent"
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
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax for the showpiece mockup.
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const sx = useSpring(mvx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(mvy, { stiffness: 120, damping: 20, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const tx = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const ty = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvx.set((e.clientX - rect.left) / rect.width - 0.5);
    mvy.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mvx.set(0);
    mvy.set(0);
  };

  const showcase = projects[0];

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Aurora background (parallax) */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-300/40 blur-3xl animate-blob" />
        <div className="absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-accent-400/30 blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl animate-blob [animation-delay:-12s]" />
      </motion.div>

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
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Webdesign &amp; development uit {site.region}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Moderne websites
            <br />
            die <RotatingWord />
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg text-ink-600 lg:mx-0 lg:text-xl"
          >
            {site.name} ontwerpt en bouwt snelle, professionele websites en webshops op maat. Van
            concept tot livegang - jouw merk online op zijn best.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lift transition-all hover:bg-brand-700"
            >
              Vraag een offerte aan
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/werk"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-semibold text-ink-800 shadow-soft transition-all hover:border-brand-300 hover:text-brand-700"
            >
              Bekijk ons werk
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm text-ink-500 sm:flex-row lg:justify-start"
          >
            <a
              href={`tel:${site.phoneIntl}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
            >
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: floating showpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-xl"
          style={{ perspective: 1000 }}
        >
          {/* Glow behind the mockup */}
          <div className="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-400/40 to-accent-400/40 blur-3xl" />

          <motion.div
            style={{ rotateX, rotateY, x: tx, y: ty, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl shadow-2xl shadow-brand-900/15 ring-1 ring-ink-900/5"
            >
              <BrowserFrame
                domain={showcase.domain}
                shotUrl={shotUrl(showcase.url)}
                alt={`Voorbeeld van een website gemaakt door ${site.name}: ${showcase.name}`}
              />
            </motion.div>

            {/* Floating stat chips */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-2xl border border-ink-200 bg-white/90 px-4 py-3 shadow-lift backdrop-blur sm:-left-8"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <Gauge className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-ink-500">PageSpeed</span>
                <span className="font-display text-sm font-bold text-ink-900">99+ score</span>
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-3 top-8 flex items-center gap-1.5 rounded-2xl border border-ink-200 bg-white/90 px-4 py-2.5 shadow-lift backdrop-blur sm:-right-6"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-display text-sm font-bold text-ink-900">100% tevreden</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
