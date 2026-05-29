import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Diensten & prijzen - webdesign, webshops, SEO & branding",
  description:
    "Bekijk de diensten van AL Design: webdesign & development, webshops, SEO en branding. Transparante pakketten en prijzen. Vraag een offerte op maat aan.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title={
          <>
            Alles voor jouw <span className="text-brand-600">online aanwezigheid</span>
          </>
        }
        description="Van het eerste ontwerp tot doorlopend onderhoud. Eén partner voor je complete digitale uitstraling."
      />
      <Services />
      <Pricing />
      <Process />
      <Faq />
      <CtaBanner />
    </>
  );
}
