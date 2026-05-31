import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Diensten - webdesign, development, SEO & branding",
  description:
    "Bekijk de diensten van AL Design: webdesign & development, SEO en branding. Geen vaste prijzen - je ontvangt altijd een offerte op maat.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title={
          <>
            Alles voor jouw <span className="text-accent-400">online aanwezigheid</span>
          </>
        }
        description="Van het eerste ontwerp tot doorlopend onderhoud. Eén partner voor je complete digitale uitstraling."
      />
      <Services hideHeading />
      <Process />
      <Faq />
      <CtaBanner />
    </>
  );
}
