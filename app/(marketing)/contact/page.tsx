import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - vraag een offerte aan",
  description: `Neem contact op met ${site.name}. Bel ${site.phone}, mail ${site.email} of vraag direct vrijblijvend een offerte aan via het formulier.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
