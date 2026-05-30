import Image from "next/image";
import Reveal from "./Reveal";

/** Personal founder intro for the Over ons page. */
export default function Founder() {
  return (
    <section className="container-px mx-auto max-w-5xl py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-14">
        {/* Portrait */}
        <Reveal className="md:col-span-2">
          <div className="relative mx-auto max-w-xs overflow-hidden rounded-3xl border border-ink-200 shadow-lift md:max-w-none">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/overons.png"
                alt="De oprichter van AL Design"
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover object-center"
              />
              {/* subtle bottom fade for depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-50/40 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <div className="md:col-span-3">
          <Reveal>
            <span className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-accent-400">
              De oprichter
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink-900 md:text-4xl">
              Hoi, ik ben Alex Lamper
            </h2>
          </Reveal>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
            <Reveal delay={0.1}>
              <p>
                Al sinds mijn vijftiende bouw ik mijn eigen websites. Wat begon als hobby - sleutelen
                aan code en design - groeide uit tot een echte passie: bedrijven online laten
                opvallen.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Ik startte AL Design omdat ik zag dat veel ondernemers vastliepen met dure, trage of
                onpersoonlijke websites. Mijn doel is simpel: moderne, snelle websites op maat, met
                persoonlijk contact en eerlijk advies. Geen tussenpersonen, geen bureaucratie - gewoon
                één vast aanspreekpunt dat met je meedenkt.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Elk project pak ik met zorg en aandacht aan, alsof het mijn eigen bedrijf is. Want
                jouw succes online, dáár doe ik het voor.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <p className="mt-6 font-display text-base font-medium text-ink-900">
              Alex Lamper · Oprichter AL Design
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
