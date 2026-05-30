"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Scale the block starts at before it settles to 1. */
  from?: number;
  /** Blur (px) the block starts at before it sharpens to 0. */
  blur?: number;
};

/**
 * Wraps a block so it emerges "out of the tunnel" as it scrolls into view:
 * it scales up from `from`, sharpens from a soft blur and fades in, then holds.
 * Falls back to a plain element when the user prefers reduced motion.
 */
export default function ZoomReveal({ children, className, from = 0.92, blur = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.45"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [blur, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, filter, willChange: "transform, filter, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
