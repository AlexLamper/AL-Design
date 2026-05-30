import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: `Lees hoe ${site.name} omgaat met je persoonsgegevens.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Juridisch" title="Privacybeleid" />
      <section className="container-px mx-auto max-w-3xl pb-20 md:pb-28">
        <div className="space-y-6 leading-relaxed text-ink-600">
          <p>
            {site.name} hecht veel waarde aan de bescherming van je persoonsgegevens. In dit
            privacybeleid leggen we uit welke gegevens we verzamelen en waarom.
          </p>

          <div>
            <h2 className="font-display text-xl font-medium text-ink-900">Welke gegevens we verzamelen</h2>
            <p className="mt-2">
              Wanneer je het contactformulier invult, verwerken we je naam, e-mailadres,
              (optioneel) telefoonnummer en de inhoud van je bericht. We gebruiken deze gegevens
              uitsluitend om op je aanvraag te reageren.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium text-ink-900">Hoe lang we gegevens bewaren</h2>
            <p className="mt-2">
              We bewaren je gegevens niet langer dan nodig is om je vraag te beantwoorden of een
              opdracht uit te voeren, tenzij we wettelijk verplicht zijn ze langer te bewaren.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium text-ink-900">Delen met derden</h2>
            <p className="mt-2">
              We verkopen je gegevens nooit. We delen ze alleen met partijen die nodig zijn om onze
              dienst te leveren (zoals onze e-mailprovider) en uitsluitend voor dat doel.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium text-ink-900">Je rechten</h2>
            <p className="mt-2">
              Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten
              verwijderen. Neem hiervoor contact met ons op via{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium text-ink-900">Contact</h2>
            <p className="mt-2">
              Vragen over dit privacybeleid? Mail naar{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>{" "}
              of bel {site.phone}.
            </p>
          </div>

          <p className="text-sm text-ink-400">Laatst bijgewerkt: mei 2026.</p>
        </div>
      </section>
    </>
  );
}
