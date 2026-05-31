import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Founder from "@/components/Founder";
import About from "@/components/About";
import Stats from "@/components/Stats";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Over ons - maak kennis met AL Design",
  description:
    "Maak kennis met AL Design: een modern webdesign- en developmentstudio die ondernemers helpt opvallen met snelle, professionele websites. Persoonlijk, creatief en resultaatgericht.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={
          <>
            Maak kennis met
            <span className="relative mt-3 inline-flex items-center justify-center gap-3">
              <span className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-accent-500/8 blur-2xl" />
              <Image
                src="/logo/favicon-design-dark-transparent.png"
                alt=""
                aria-hidden="true"
                width={256}
                height={256}
                className="logo-auto h-16 w-auto md:h-20"
                priority
              />
              <span className="font-display text-[1.85rem] font-light tracking-[0.12em] md:text-[2.6rem]">DESIGN</span>
            </span>
          </>
        }
        description="Een moderne webdesign- en development agency die jouw project van begin tot eind persoonlijk oppakt."
      />
      <Founder />
      <Stats />
      <About />
      <CtaBanner />
    </>
  );
}
