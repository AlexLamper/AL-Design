"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-ink-50" />
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Veelgestelde vragen"
          title="Goed om te weten"
          description="Staat je vraag er niet bij? Neem gerust contact op — we helpen je graag verder."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-ink-900">{faq.q}</span>
                    <span
                      className={`flex-none text-brand-600 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
