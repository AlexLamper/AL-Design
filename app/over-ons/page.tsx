import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Over ons - de maker achter AL Design",
  description:
    "Maak kennis met Alex Lamper, de maker achter AL Design. Eén vast aanspreekpunt, scherpe prijzen en snel, persoonlijk contact - van eerste idee tot livegang.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={
          <>
            De maker achter <span className="text-accent-400">AL Design</span>
          </>
        }
        description="Geen bureau met tussenlagen, maar één maker die jouw project van begin tot eind persoonlijk oppakt."
      />
      <Stats />
      <About />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
