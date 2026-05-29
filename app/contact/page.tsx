import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - vraag een offerte aan",
  description: `Neem contact op met ${site.name}. Bel ${site.phone}, mail ${site.email} of vraag direct vrijblijvend een offerte aan via het formulier.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Vraag vrijblijvend een <span className="text-brand-600">offerte</span> aan
          </>
        }
        description="Vertel kort over je project en we nemen snel contact met je op - meestal binnen één werkdag."
      />
      <Contact />
    </>
  );
}
