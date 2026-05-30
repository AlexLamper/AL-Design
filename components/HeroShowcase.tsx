"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { showcaseSites, shotUrl, type ShowcaseItem } from "@/lib/site";

function ShotCard({ item }: { item: ShowcaseItem }) {
  return (
    <figure className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-lift ring-1 ring-black/40">
      {/* Tiny browser chrome for context */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-ink-100 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 truncate text-[0.6rem] text-ink-500">{item.domain}</span>
      </div>
      {item.placeholder ? (
        <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 bg-ink-100/60 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-accent-400/50 text-accent-400">
            <Plus className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-medium text-ink-700">Jouw site hier</span>
        </div>
      ) : (
        <Image
          src={shotUrl(item.slug!)}
          alt={`Website ${item.domain}`}
          width={2840}
          height={1555}
          sizes="320px"
          className="block h-auto w-full"
        />
      )}
    </figure>
  );
}

/** One vertically scrolling column. Content is duplicated so the loop is seamless. */
function Column({ items, className }: { items: ShowcaseItem[]; className: string }) {
  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <div className={`flex flex-col ${className}`}>
        {[...items, ...items].map((item, i) => (
          <ShotCard key={`${item.slug ?? "placeholder"}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * Eye-catching hero visual: a tilted 3D "wall of work" - two columns of real
 * project screenshots drifting in opposite directions, faded at the edges and
 * floating over an aurora glow. The columns hold DISJOINT sets so no screenshot
 * is ever shown twice at the same moment.
 */
export default function HeroShowcase() {
  // Disjoint real screenshots across the columns (so no site is shown twice at
  // once), split even/odd to keep bijbelapi and ruimingswerken-flakkee apart.
  // Both columns end with the shared "Jouw site hier" placeholder so they have
  // EQUAL length - otherwise the grid stretches the shorter column and leaves
  // an empty gap at the bottom.
  const real = showcaseSites.filter((s) => !s.placeholder);
  const placeholder = showcaseSites.find((s) => s.placeholder)!;
  const colA = [...real.filter((_, i) => i % 2 === 0), placeholder];
  const colB = [...real.filter((_, i) => i % 2 === 1), placeholder];

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-xl select-none"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      {/* Aurora glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" />
        <div
          className="animate-blob absolute bottom-1/4 right-1/5 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      {/* Tilted 3D wall */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          className="flex h-[150%] w-[135%] gap-5"
          style={{
            transform: "rotateX(14deg) rotateZ(-9deg) scale(1.08)",
            transformStyle: "preserve-3d",
          }}
        >
          <Column items={colA} className="animate-marquee-up" />
          <Column items={colB} className="animate-marquee-down" />
        </div>
      </div>

      {/* Soft accent sheen over the glass */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent-500/5 via-transparent to-transparent" />
    </div>
  );
}
