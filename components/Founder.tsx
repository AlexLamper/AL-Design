import Image from "next/image";
import Reveal from "./Reveal";

const highlights = [
  { value: "5+", label: "jaar ervaring" },
  { value: "10+", label: "projecten opgeleverd" },
  { value: "100%", label: "tevreden klanten" },
];

export default function Founder() {
  return (
    <section className="container-px mx-auto max-w-6xl py-8 md:py-14">
      <div className="grid items-start gap-16 md:grid-cols-2 md:gap-20">

        {/* Left: photo */}
        <Reveal className="relative">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/overons.png"
              alt="Alex Lamper, oprichter AL Design"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Floating stat strip */}
          <div className="absolute -bottom-5 left-4 right-4 flex justify-between gap-2 rounded-2xl border border-white/10 bg-ink-50/90 px-5 py-4 shadow-lift backdrop-blur-sm">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="font-display text-xl font-medium text-ink-900">{h.value}</p>
                <p className="mt-0.5 text-xs text-ink-500">{h.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: story */}
        <div className="pt-0 md:pt-4">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent-400">
              De oprichter
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-ink-900 md:text-5xl">
              <span className="font-medium">A</span>lex <span className="font-medium">L</span>amper
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-2 h-0.5 w-12 bg-accent-500" />
          </Reveal>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-600">
            <Reveal delay={0.12}>
              <p>
                Al sinds mijn vijftiende bouw ik websites. Wat begon als hobby - sleutelen
                aan code en design - groeide uit tot een echte passie: bedrijven online
                laten opvallen.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Ik startte AL Design omdat veel ondernemers vastliepen met dure, trage of
                onpersoonlijke websites. Mijn aanpak is anders: moderne, snelle websites op
                maat, met één vast aanspreekpunt en eerlijk advies. Van het eerste gesprek
                tot lang na de livegang.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Elk project pak ik met volle aandacht aan. Jouw online groei en succes staan
                daarin centraal.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="mt-10 flex items-center gap-4">
              <div>
                <p className="font-display font-medium text-ink-900">Alex Lamper</p>
                <p className="text-sm text-ink-500">Oprichter · AL Design</p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
