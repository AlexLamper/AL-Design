import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Founder from "@/components/Founder";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Over ons - maak kennis met AL Design",
  description:
    "Maak kennis met AL Design: een modern webdesign- en ontwikkelbedrijf dat ondernemers helpt opvallen met snelle, professionele websites. Persoonlijk, creatief en resultaatgericht.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={
          <>
            Maak kennis met{" "}
            <br />
            <span className="text-accent-400">AL Design</span>
          </>
        }
        description="Een modern webdesign- en ontwikkelbedrijf dat jouw project van begin tot eind persoonlijk oppakt."
      />
      <Founder />
      <Stats />
      <About />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
