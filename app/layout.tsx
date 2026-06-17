import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - Webdesign & development | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AL Design",
    "webdesign",
    "website laten maken",
    "website bouwen",
    "webshop laten maken",
    "webontwikkeling",
    "SEO",
    "merkidentiteit",
    "branding",
    "Next.js website",
    "webdesigner Nederland",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Koppelt het domein aan Google Search Console. Token komt uit Search Console
  // (Eigendom verifiëren > HTML-tag). Zet de waarde in .env.local + Vercel:
  // GOOGLE_SITE_VERIFICATION=...  Leeg = geen tag (verificatie via DNS mogelijk).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08070f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-transparent">{children}</body>
    </html>
  );
}
