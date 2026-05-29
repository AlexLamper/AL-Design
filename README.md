# AL Design

De officiële website van **AL Design** — webdesign, webshops, SEO en branding uit Nederland.
Een moderne, snelle one-page site gebouwd met Next.js, gericht op het binnenhalen van
offerteaanvragen.

Live domein: **[aldesign.nl](https://aldesign.nl)**

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — scroll-animaties, fade-ins en transities
- **lucide-react** — iconen
- **react-hook-form + zod** — formuliervalidatie
- **Resend** — verzenden van offerteaanvragen via e-mail

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul je waarden in (zie hieronder)
npm run dev                  # http://localhost:3000
```

Build & productie:

```bash
npm run build
npm run start
```

## Omgevingsvariabelen

Maak `.env.local` aan op basis van `.env.example`:

| Variabele            | Omschrijving                                                                 |
| -------------------- | ---------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | API-key van [Resend](https://resend.com). Vereist om e-mail te versturen.    |
| `CONTACT_TO_EMAIL`   | Ontvanger van offerteaanvragen (standaard `info@aldesign.nl`).               |
| `CONTACT_FROM_EMAIL` | Afzender. Moet een in Resend geverifieerd domein zijn.                       |

Zonder `RESEND_API_KEY` toont het formulier een nette foutmelding en wordt er geen mail verstuurd.

### Resend instellen

1. Maak een account op [resend.com](https://resend.com).
2. Voeg het domein **aldesign.nl** toe en verifieer het via de DNS-records (SPF/DKIM).
3. Maak een API-key aan en zet die in `RESEND_API_KEY`.
4. Zet `CONTACT_FROM_EMAIL` op bijv. `AL Design <noreply@aldesign.nl>`.

## Inhoud aanpassen

Bijna alle teksten, diensten, projecten en contactgegevens staan centraal in
[`lib/site.ts`](lib/site.ts). Pas daar gerust namen, beschrijvingen en het telefoonnummer aan.

De projectschermafbeeldingen worden live gegenereerd via `image.thum.io` op basis van de
project-URL's in `lib/site.ts`.

## Deployen naar Vercel + domein koppelen

1. Push deze repo naar GitHub (al gekoppeld aan `AlexLamper/AL-Design`).
2. Ga naar [vercel.com](https://vercel.com) → **New Project** → importeer de repo.
3. Voeg onder **Settings → Environment Variables** de variabelen uit `.env.example` toe.
4. Deploy. Vercel detecteert Next.js automatisch.
5. **Domein koppelen:** ga naar **Settings → Domains**, voeg `aldesign.nl` en `www.aldesign.nl` toe
   en wijs bij je domeinregistrar de DNS aan:
   - `A`-record `@` → `76.76.21.21`, of een `CNAME`/`ALIAS` volgens de instructies van Vercel
   - `CNAME` `www` → `cname.vercel-dns.com`
6. Stel `aldesign.nl` in als primair domein (redirect `www` → root of andersom).

## SEO

- Volledige metadata, Open Graph- en Twitter-cards (`app/layout.tsx`)
- Dynamische OG-afbeelding (`app/opengraph-image.tsx`) en favicon (`app/icon.tsx`)
- `sitemap.xml`, `robots.txt` en webmanifest
- JSON-LD gestructureerde data (`ProfessionalService`)
