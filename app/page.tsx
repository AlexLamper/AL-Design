import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services withCta />
      <Portfolio withCta />
      <Process />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
