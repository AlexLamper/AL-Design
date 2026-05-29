import {
  Code2,
  ShoppingCart,
  Search,
  Palette,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "AL Design",
  legalName: "AL Design",
  tagline: "Moderne websites die opvallen én opleveren",
  description:
    "AL Design ontwerpt en bouwt moderne, snelle websites en webshops. Van webdesign en development tot SEO, onderhoud en complete huisstijl — alles onder één dak.",
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
    features: ["Responsive design", "Maatwerk in Next.js", "Bliksemsnel & veilig"],
  },
  {
    icon: ShoppingCart,
    title: "Webshops & e-commerce",
    description:
      "Verkoop online met een webshop die converteert. Veilige betalingen, eenvoudig beheer en een soepele checkout.",
    features: ["Online betalingen", "Productbeheer", "Conversiegericht"],
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
    title: "Branding & huisstijl",
    description:
      "Een herkenbaar merk van logo tot kleurenpalet. Een sterke visuele identiteit die vertrouwen wekt.",
    features: ["Logo & huisstijl", "Visuele identiteit", "Merkstrategie"],
  },
];

export type Project = {
  name: string;
  url: string;
  domain: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "LambdaGo",
    url: "https://www.lambdago.nl",
    domain: "lambdago.nl",
    description:
      "Een strakke, moderne website met een professionele uitstraling en heldere structuur.",
    tags: ["Webdesign", "Development", "Responsive"],
  },
  {
    name: "P. Troost Afbouwbedrijf",
    url: "https://www.ptroostafbouwbedrijf.nl",
    domain: "ptroostafbouwbedrijf.nl",
    description:
      "Zakelijke bedrijfswebsite voor een afbouwbedrijf met focus op vakmanschap en vertrouwen.",
    tags: ["Bedrijfswebsite", "Branding", "SEO"],
  },
  {
    name: "Bijbel-Studie",
    url: "https://www.bijbel-studie.com",
    domain: "bijbel-studie.com",
    description:
      "Een toegankelijk platform met veel content, overzichtelijk gepresenteerd en prettig leesbaar.",
    tags: ["Platform", "Content", "Webdesign"],
  },
  {
    name: "Ruimingswerken Flakkee",
    url: "https://www.ruimingswerkenflakkee.nl",
    domain: "ruimingswerkenflakkee.nl",
    description:
      "Heldere dienstverleningswebsite die direct duidelijk maakt wat er geboden wordt.",
    tags: ["Dienstverlening", "Webdesign", "Lokaal"],
  },
];

export const stats = [
  { value: 25, suffix: "+", label: "Opgeleverde projecten" },
  { value: 5, suffix: " jaar", label: "Ervaring" },
  { value: 100, suffix: "%", label: "Tevreden klanten" },
  { value: 99, suffix: "+", label: "PageSpeed score" },
];

export const processSteps = [
  {
    title: "Kennismaking",
    description:
      "We bespreken je wensen, doelen en budget. Jij vertelt, wij denken mee — vrijblijvend.",
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
    description: "Korte lijnen, één vast aanspreekpunt en eerlijk advies — geen bureaucratie.",
  },
  {
    title: "Eerlijke prijs",
    description: "Transparante offerte vooraf, zonder verrassingen achteraf.",
  },
  {
    title: "Mobiel-first",
    description: "Perfecte weergave op telefoon, tablet en desktop — altijd.",
  },
  {
    title: "Zorgeloos onderhoud",
    description: "Wij houden je site veilig, snel en up-to-date, ook na de livegang.",
  },
];

export const navLinks = [
  { href: "#diensten", label: "Diensten" },
  { href: "#werk", label: "Werk" },
  { href: "#werkwijze", label: "Werkwijze" },
  { href: "#contact", label: "Contact" },
];

export const projectTypes = [
  "Nieuwe website",
  "Webshop / e-commerce",
  "Website redesign",
  "SEO & onderhoud",
  "Branding / huisstijl",
  "Anders / weet ik nog niet",
];
