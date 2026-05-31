import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServicesScroll from "@/components/ServicesScroll";
import ProjectTunnel from "@/components/ProjectTunnel";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesScroll />
      <ProjectTunnel />
      <Process />
      <WhyUs />
      <CtaBanner />
      <BackToTop />
    </>
  );
}
