"use client";

import { ArrowUp } from "lucide-react";

/** Subtle "back to top" affordance at the very bottom of the landing page. */
export default function BackToTop() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="flex justify-center pb-10">
      <button
        type="button"
        onClick={toTop}
        aria-label="Terug naar boven"
        className="group inline-flex flex-col items-center gap-2 text-ink-400 transition-colors hover:text-ink-700"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-surface shadow-soft transition-all group-hover:-translate-y-0.5 group-hover:border-ink-400">
          <ArrowUp className="h-5 w-5" />
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em]">Naar boven</span>
      </button>
    </div>
  );
}
