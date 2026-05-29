import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Over ons - de mensen achter AL Design",
  description:
    "Maak kennis met AL Design: een moderne webdesignstudio die ondernemers helpt opvallen met snelle, professionele websites. Persoonlijk, creatief en resultaatgericht.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={
          <>
            De mensen achter <span className="text-brand-600">AL Design</span>
          </>
        }
        description="Een moderne webdesignstudio die ondernemers helpt opvallen en groeien online."
      />
      <Stats />
      <About />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
