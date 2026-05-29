"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft, brand-coloured glow that smoothly trails the cursor. It sits behind
 * the page content (-z-10) so it only tints the background and never bleeds
 * over cards or sections with their own background. Desktop / fine-pointer
 * only and disabled when the user prefers reduced motion.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.5 });

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
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full blur-3xl"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.12) 40%, rgba(99,102,241,0) 70%)",
      }}
    />
  );
}
