import {
  Code2,
  Layers,
  Search,
  Palette,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "AL Design",
  legalName: "AL Design",
  tagline: "Moderne websites die opvallen én opleveren",
  description:
    "AL Design ontwerpt en bouwt moderne, snelle websites en webapplicaties. Van webdesign en development tot SEO, onderhoud en visuele merkidentiteit - alles onder één dak.",
  url: "https://aldesign.nl",
  phone: "0657586667",
  phoneIntl: "+31657586667",
  email: "info@aldesign.nl",
  region: "Nederland",
  locale: "nl_NL",
  // Wettelijke gegevens — alleen server-side gebruikt (offerte-footer), dus
  // GEEN NEXT_PUBLIC_ prefix: blijven uit de client-bundle. Echte waarden in
  // .env.local (gitignored) + Vercel env vars. Leeg = verborgen op offerte.
  address: process.env.SITE_ADDRESS ?? "",
  kvk: process.env.SITE_KVK ?? "",
  vatNumber: process.env.SITE_VAT ?? "",
} as const;

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    icon: Code2,
    title: "Webdesign & development",
    description:
      "Op maat gemaakte websites die razendsnel laden, perfect werken op elk scherm en jouw merk laten stralen.",
    features: [
      "Werkt perfect op mobiel, tablet & desktop",
      "Volledig op maat, geen standaard sjabloon",
      "Snel, veilig en altijd up-to-date",
    ],
  },
  {
    icon: Layers,
    title: "Platformen & webapps",
    description:
      "Meer dan een website: volledige platformen en webapplicaties op maat. Van portalen en dashboards tot tools die jouw proces automatiseren - een specialiteit van ons.",
    features: ["Maatwerk webapps", "Dashboards & accounts", "Schaalbaar & veilig"],
  },
  {
    icon: Search,
    title: "SEO & onderhoud",
    description:
      "Word gevonden in Google en blijf up-to-date. Wij optimaliseren, monitoren en onderhouden je site doorlopend.",
    features: ["Zoekmachine-optimalisatie", "Updates & hosting", "Snelheid & analytics"],
  },
  {
    icon: Palette,
    title: "Logo & branding",
    description:
      "Een uniek logo en een herkenbare merkidentiteit, volledig op maat ontworpen. Van logo-ontwerp tot kleurenpalet en stijlgids - een sterke visuele identiteit die vertrouwen wekt en jouw bedrijf onderscheidt.",
    features: ["Logo-ontwerp op maat", "Visuele stijlgids", "Volledige merkidentiteit"],
  },
];

export type Project = {
  slug: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  year: string;
  description: string;
  longDescription: string[];
  challenge: string;
  result: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "lambdago",
    name: "Lambda_GO",
    url: "https://www.lambdago.nl",
    domain: "lambdago.nl",
    category: "Webdesign & development",
    year: "2024",
    description:
      "Een heldere en moderne bedrijfswebsite met een professionele en betrouwbare uitstraling.",
    longDescription: [
      "Voor Lambda_GO hebben we een moderne en overzichtelijke website opgeleverd die bezoekers een helder beeld geeft over het bedrijf en haar dienstverlening. Het doel was een strak en modern ontwerp waarin eenvoud, duidelijkheid en vertrouwen centraal staan.",
      "De website is volledig responsive ontwikkeld, technisch geoptimaliseerd voor snelle laadtijden en functioneel gemaakt door het contactformulier.",
    ],
    challenge:
      "Een helder, professioneel beeld neerzetten zonder de bezoeker te overweldigen met te veel informatie.",
    result:
      "Een moderne bedrijfswebsite die het merk Lambda_GO betrouwbaar neerzet en bezoekers op een effectieve manier omzet naar potentiële klanten.",
    tags: ["Webontwikkeling", "Webdesign", "SEO", "Hosting", "Responsive design", "Contactformulier"],
  },
  {
    slug: "ptroost-afbouwbedrijf",
    name: "P. Troost Afbouwbedrijf",
    url: "https://www.ptroostafbouwbedrijf.nl",
    domain: "ptroostafbouwbedrijf.nl",
    category: "Bedrijfswebsite",
    year: "2024",
    description:
      "Bedrijfswebsite voor P. Troost Afbouwbedrijf, inclusief een volledig nieuw logo en bedrijfsbranding.",
    longDescription: [
      "Voor P. Troost Afbouwbedrijf hebben we het volledige traject verzorgd, van branding en logo-ontwerp tot het ontwerp en ontwikkeling van de website. Het doel was een professionele maar simpele en overzichtelijke website neer te zetten die aansluit bij de kwaliteit en het vakmanschap van het bedrijf.",
      "Hoe hebben we de kwaliteit en het vakmanschap van dit bedrijf laten zien? Door projecten via een overzichtelijk portfolio met foto's van gerealiseerd werk weer te geven. Hierdoor ontstaat direct een duidelijk beeld van de kwaliteit en expertise van het bedrijf.",
    ],
    challenge:
      "Een lokaal afbouwbedrijf online neerzetten met een frisse identiteit die vertrouwen wekt en onderscheidt.",
    result:
      "Een complete merkidentiteit met een professionele website die perfect aansluiten bij de kwaliteit van het bedrijf.",
    tags: ["Webontwikkeling", "Webdesign", "Branding", "Logo design", "SEO", "Hosting", "Responsive design"],
  },
  {
    slug: "ruimingswerken-flakkee",
    name: "Ruimingswerken Flakkee",
    url: "https://www.ruimingswerkenflakkee.nl",
    domain: "ruimingswerkenflakkee.nl",
    category: "Dienstverlening",
    year: "2026",
    description:
      "Van logo tot website: een volledige bedrijfsbranding die zorgt voor een herkenbare en professionele uitstraling.",
    longDescription: [
      "Voor Ruimingswerken Flakkee verzorgden we het volledige pakket: een nieuw logo, complete bedrijfsbranding én een heldere bedrijfswebsite.",
      "De website presenteert de dienstverlening op een heldere en toegankelijke manier, zodat bezoekers direct begrijpen waarvoor ze bij het bedrijf terecht kunnen. Door een combinatie van sterke visuele elementen, duidelijke informatie en een gebruiksvriendelijke opzet ontstaat vanaf het eerste bezoek vertrouwen.",
    ],
    challenge:
      "Een lokaal dienstverlener voorzien van een sterke identiteit en een website die direct vertrouwen wekt.",
    result:
      "Een consistente, herkenbare website en merkidentiteit waarbij het bedrijf zich onderscheidt van anderen.",
    tags: ["Webontwikkeling", "Webdesign", "Branding", "Logo design", "SEO", "Hosting", "Responsive design"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export type ShowcaseItem = {
  /** Screenshot filename in /public/shots, or undefined for the placeholder. */
  slug?: string;
  domain: string;
  placeholder?: boolean;
};

/**
 * Sites shown in the hero "wall of work". More entries than `projects` so the
 * two scrolling columns never show the same screenshot at once. Each `slug`
 * maps to public/shots/<slug>.png.
 */
// Order matters: columns are split even/odd indices, so bijbelapi and
// ruimingswerken-flakkee (similar dark styling) sit in DIFFERENT columns and
// never land next to each other.
export const showcaseSites: ShowcaseItem[] = [
  { slug: "lambdago", domain: "lambdago.nl" },
  { slug: "ruimingswerken-flakkee", domain: "ruimingswerkenflakkee.nl" },
  { slug: "bijbelapi", domain: "bijbelapi.com" },
  { slug: "bijbelquiz", domain: "bijbelquiz.com" },
  { slug: "ptroost-afbouwbedrijf", domain: "ptroostafbouwbedrijf.nl" },
  { domain: "jouwsite.nl", placeholder: true },
];

/** Local project screenshot served from public/shots/<slug>.png. */
export function shotUrl(slug: string) {
  return `/shots/${slug}.png`;
}

export const stats = [
  { value: 10, suffix: "+", label: "Opgeleverde projecten" },
  { value: 5, suffix: " jaar", label: "Ervaring" },
  { value: 100, suffix: "%", label: "Tevreden klanten" },
  { value: 99, suffix: "+", label: "PageSpeed score" },
];

export const processSteps = [
  {
    title: "Kennismaking",
    description:
      "We bespreken je wensen, doelen en budget. Jij vertelt, wij denken mee - vrijblijvend.",
  },
  {
    title: "Ontwerp",
    description:
      "Je ontvangt een uniek ontwerp op maat. We schaven net zo lang tot het perfect bij je merk past.",
  },
  {
    title: "Ontwikkeling",
    description:
      "We bouwen je site met de nieuwste technieken: snel, veilig en geoptimaliseerd voor Google.",
  },
  {
    title: "Live & onderhoud",
    description:
      "Je site gaat live en wij blijven beschikbaar voor updates, hosting en doorontwikkeling.",
  },
];

export const usps = [
  {
    title: "Maatwerk, geen template",
    description: "Elke website wordt vanaf nul ontworpen rondom jouw merk en doelen.",
  },
  {
    title: "Bliksemsnel & SEO-proof",
    description: "Gebouwd met moderne technologie voor topprestaties en goede vindbaarheid.",
  },
  {
    title: "Persoonlijk contact",
    description: "Korte lijnen, één vast aanspreekpunt en eerlijk advies. Direct bereikbaar, altijd.",
  },
  {
    title: "Eerlijke prijs",
    description: "Transparante offerte vooraf, zonder verrassingen achteraf.",
  },
  {
    title: "Mobiel-first",
    description: "Perfecte weergave op telefoon, tablet en desktop - altijd.",
  },
  {
    title: "Zorgeloos onderhoud",
    description: "Wij houden je site veilig, snel en up-to-date, ook na de livegang.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/diensten", label: "Diensten" },
  { href: "/casus", label: "Casus" },
  { href: "/contact", label: "Contact" },
];

export type Package = {
  name: string;
  tagline: string;
  priceOnce: string;
  priceMonthly?: string;
  highlight?: boolean;
  features: string[];
};

// Indicatieve prijzen - pas eenvoudig aan in dit bestand.
export const packages: Package[] = [
  {
    name: "Onepager",
    tagline: "Eén krachtige pagina. Ideaal voor een portfolio of starter.",
    priceOnce: "vanaf €299",
    priceMonthly: "€12,50 / mnd",
    features: [
      "1 lange, scrollende pagina",
      "Uniek ontwerp op maat",
      "Volledig responsive",
      "Hosting & domein inbegrepen",
      "Contactknoppen (bellen/mailen)",
    ],
  },
  {
    name: "Volledige website",
    tagline: "De complete oplossing voor een professionele uitstraling.",
    priceOnce: "vanaf €549",
    priceMonthly: "€17,50 / mnd",
    highlight: true,
    features: [
      "Tot 10 pagina's",
      "Uniek ontwerp op maat",
      "SEO-optimalisatie",
      "Contactformulier",
      "Blog / nieuws (optioneel)",
      "Maandelijks onderhoud",
      "Hosting & domein inbegrepen",
    ],
  },
  {
    name: "Webshop / maatwerk",
    tagline: "Verkoop online of bouw een platform volledig naar wens.",
    priceOnce: "op aanvraag",
    priceMonthly: "in overleg",
    features: [
      "Webshop of maatwerkapplicatie",
      "Online betalingen",
      "Productbeheer & koppelingen",
      "SEO-optimalisatie",
      "Onderhoud & doorontwikkeling",
      "Hosting & domein inbegrepen",
    ],
  },
];

export const faqs = [
  {
    q: "Wat kost een website?",
    a: "Dat hangt helemaal af van je wensen en de omvang van het project. We werken niet met vaste prijzen, maar maken voor elk project een offerte op maat. Zo betaal je nooit voor meer dan je nodig hebt en weet je vooraf precies waar je aan toe bent.",
  },
  {
    q: "Hoe lang duurt het voordat mijn site live staat?",
    a: "Een onepager staat vaak binnen 1 à 2 weken live. Een volledige website duurt gemiddeld 3 tot 5 weken, afhankelijk van de omvang en hoe snel we content en feedback ontvangen.",
  },
  {
    q: "Is hosting en een domein inbegrepen?",
    a: "Ja. Bij elk pakket regelen we hosting en domein, zodat jij nergens omkijken naar hebt. We houden je site bovendien veilig en up-to-date.",
  },
  {
    q: "Wordt mijn website goed gevonden in Google?",
    a: "Bij de volledige website en redesign is SEO-optimalisatie standaard inbegrepen. We zorgen voor snelle laadtijden, nette code en de juiste structuur om goed vindbaar te zijn.",
  },
  {
    q: "Werken jullie ook met een bestaande merkidentiteit?",
    a: "Ja. Heb je al een logo en visuele stijl? Die verwerken we netjes in het ontwerp. Heb je nog niets? Dan ontwerpen we een passende visuele identiteit voor je merk.",
  },
  {
    q: "Wat als ik grote aanpassingen wil aan mijn website?",
    a: "Voor grotere wijzigingen — zoals een nieuwe pagina, een redesign of uitbreiding van functionaliteit — ontvang je vooraf een offerte op maat. Zo weet je precies wat het kost en kom je niet voor verrassingen te staan. Kleine aanpassingen, zoals het updaten van tekst of afbeeldingen, worden doorgaans kosteloos verwerkt.",
  },
];

export const aboutValues = [
  {
    title: "Persoonlijk",
    description: "Eén vast aanspreekpunt en korte lijnen. Directe communicatie en oprechte betrokkenheid bij elk project.",
  },
  {
    title: "Creatief & onderscheidend",
    description: "Geen template-werk. Elk ontwerp wordt uniek gemaakt rondom jouw merk.",
  },
  {
    title: "Resultaatgericht",
    description: "Een mooie site is fijn, maar het gaat om wat hij oplevert: klanten en groei.",
  },
  {
    title: "Transparant",
    description: "Eerlijke prijzen en duidelijke communicatie. Je weet altijd waar je aan toe bent.",
  },
  {
    title: "Modern",
    description: "We bouwen met de nieuwste technieken voor snelheid, veiligheid en vindbaarheid.",
  },
];

export const projectTypes = [
  "Nieuwe website",
  "Website redesign",
  "SEO & onderhoud",
  "Branding / merkidentiteit",
  "Anders / weet ik nog niet",
];
