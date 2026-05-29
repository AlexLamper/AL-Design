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
    <section className="container-px mx-auto -mt-6 max-w-6xl">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 shadow-soft md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 text-center md:p-8">
            <div className="font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
              <CountUp value={stat.value} />
              <span className="text-brand-600">{stat.suffix}</span>
            </div>
            <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
