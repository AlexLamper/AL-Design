import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Ons werk - projecten & cases",
  description:
    "Bekijk een selectie van websites die AL Design heeft ontworpen en gebouwd. Echte, live projecten - klik door voor de details.",
  alternates: { canonical: "/werk" },
};

export default function WerkPage() {
  return (
    <>
      <PageHero
        eyebrow="Werk"
        title={
          <>
            Projecten waar we <span className="text-brand-600">trots</span> op zijn
          </>
        }
        description="Een selectie van websites die we hebben ontworpen en gebouwd. Klik op een project voor meer details."
      />
      <Portfolio heading={false} />
      <CtaBanner />
    </>
  );
}
