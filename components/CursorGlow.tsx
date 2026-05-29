"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft, brand-coloured spotlight that smoothly trails the cursor.
 * Desktop / fine-pointer only, and disabled when the user prefers reduced motion.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed -z-10 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(168,85,247,0.10) 35%, transparent 70%)",
      }}
    />
  );
}
