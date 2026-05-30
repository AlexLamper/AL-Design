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
      "Op maat ontworpen websites die razendsnel laden, perfect werken op elk scherm en jouw merk laten stralen.",
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
    features: ["Logo-ontwerp op maat", "Visuele stijlgids", "Merkstrategie"],
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
    name: "LambdaGo",
    url: "https://www.lambdago.nl",
    domain: "lambdago.nl",
    category: "Webdesign & development",
    year: "2024",
    description:
      "Een strakke, moderne website met een professionele uitstraling en heldere structuur.",
    longDescription: [
      "Voor LambdaGo ontwierpen en bouwden we een moderne website met een strakke, professionele uitstraling. De focus lag op een heldere structuur en een vlotte gebruikerservaring.",
      "De site is volledig responsive en geoptimaliseerd voor snelheid, zodat bezoekers op elk apparaat een soepele ervaring hebben.",
    ],
    challenge:
      "Een complex aanbod overzichtelijk en toegankelijk presenteren zonder in te boeten op uitstraling.",
    result:
      "Een snelle, moderne site die het merk professioneel neerzet en bezoekers moeiteloos de weg wijst.",
    tags: ["Webdesign", "Development", "Responsive"],
  },
  {
    slug: "ptroost-afbouwbedrijf",
    name: "P. Troost Afbouwbedrijf",
    url: "https://www.ptroostafbouwbedrijf.nl",
    domain: "ptroostafbouwbedrijf.nl",
    category: "Bedrijfswebsite",
    year: "2024",
    description:
      "Zakelijke bedrijfswebsite voor een afbouwbedrijf met focus op vakmanschap en vertrouwen.",
    longDescription: [
      "P. Troost Afbouwbedrijf wilde een zakelijke website die vakmanschap en betrouwbaarheid uitstraalt. We vertaalden dat naar een rustig, professioneel ontwerp met duidelijke diensten.",
      "Met aandacht voor lokale vindbaarheid (SEO) en heldere contactmogelijkheden wordt het bedrijf nu beter gevonden door potentiële klanten in de regio.",
    ],
    challenge:
      "Vertrouwen en vakmanschap online overbrengen voor een lokaal afbouwbedrijf.",
    result:
      "Een professionele bedrijfswebsite die vertrouwen wekt en lokaal goed vindbaar is.",
    tags: ["Bedrijfswebsite", "Branding", "SEO"],
  },
  {
    slug: "bijbel-studie",
    name: "Bijbel-Studie",
    url: "https://www.bijbel-studie.com",
    domain: "bijbel-studie.com",
    category: "Contentplatform",
    year: "2023",
    description:
      "Een toegankelijk platform met veel content, overzichtelijk gepresenteerd en prettig leesbaar.",
    longDescription: [
      "Bijbel-Studie is een contentrijk platform. De uitdaging was om grote hoeveelheden informatie overzichtelijk en prettig leesbaar aan te bieden.",
      "We kozen voor een rustige, toegankelijke opzet met heldere navigatie, zodat bezoekers snel vinden wat ze zoeken en comfortabel kunnen lezen.",
    ],
    challenge:
      "Veel content toegankelijk en overzichtelijk presenteren zonder de bezoeker te overweldigen.",
    result:
      "Een toegankelijk platform waar bezoekers prettig lezen en eenvoudig hun weg vinden.",
    tags: ["Platform", "Content", "Webdesign"],
  },
  {
    slug: "ruimingswerken-flakkee",
    name: "Ruimingswerken Flakkee",
    url: "https://www.ruimingswerkenflakkee.nl",
    domain: "ruimingswerkenflakkee.nl",
    category: "Dienstverlening",
    year: "2024",
    description:
      "Heldere dienstverleningswebsite die direct duidelijk maakt wat er geboden wordt.",
    longDescription: [
      "Voor Ruimingswerken Flakkee bouwden we een heldere dienstverleningswebsite die direct duidelijk maakt wat het bedrijf biedt.",
      "Met een duidelijke structuur en directe contactmogelijkheden worden bezoekers snel omgezet in aanvragen.",
    ],
    challenge:
      "In één oogopslag duidelijk maken welke diensten worden aangeboden en hoe je contact opneemt.",
    result:
      "Een overzichtelijke site die bezoekers direct naar contact leidt.",
    tags: ["Dienstverlening", "Webdesign", "Lokaal"],
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
  { slug: "bijbel-studie", domain: "bijbel-studie.com" },
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
    description: "Korte lijnen, één vast aanspreekpunt en eerlijk advies - geen bureaucratie.",
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
];

export const aboutValues = [
  {
    title: "Persoonlijk",
    description: "Eén vast aanspreekpunt en korte lijnen. Geen bureaucratie, wel echte aandacht.",
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
