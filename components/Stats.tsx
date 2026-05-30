"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/site";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  return (
    <section className="container-px mx-auto max-w-6xl py-12 md:py-16">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-ink-200/50">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 text-center">
            <div className="font-display text-4xl font-light tracking-tight text-ink-900 md:text-5xl">
              <CountUp value={stat.value} />
              <span className="text-ink-500">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
