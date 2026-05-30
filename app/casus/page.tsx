import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Onze casussen - projecten",
  description:
    "Bekijk een selectie van websites die AL Design heeft ontworpen en gebouwd. Echte, live projecten - klik door voor de details.",
  alternates: { canonical: "/casus" },
};

export default function CasusPage() {
  return (
    <>
      <PageHero
        eyebrow="Casus"
        title={
          <>
            Projecten waar we <span className="text-accent-400">trots</span> op zijn
          </>
        }
        description="Een selectie van websites die we hebben ontworpen en gebouwd. Klik op een project voor meer details."
      />
      <Portfolio heading={false} />
      <CtaBanner />
    </>
  );
}
