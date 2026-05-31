import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phoneIntl,
  image: `${site.url}/opengraph-image`,
  priceRange: "€€",
  areaServed: { "@type": "Country", name: "Nederland" },
  address: { "@type": "PostalAddress", addressCountry: "NL" },
  serviceType: [
    "Webdesign",
    "Webontwikkeling",
    "Webshops",
    "SEO",
    "Onderhoud",
    "Branding",
  ],
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
