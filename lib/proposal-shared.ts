import { z } from "zod";

/**
 * Client-safe proposal definitions: enums, labels, the editable-input schema
 * and the serialised Proposal type. Kept free of any server-only / MongoDB
 * imports so client components can use them without pulling the driver into
 * the browser bundle.
 */

export const PROPOSAL_STATUSES = ["draft", "sent", "accepted", "rejected"] as const;
export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number];

export const STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: "Concept",
  sent: "Verzonden",
  accepted: "Geaccepteerd",
  rejected: "Afgewezen",
};

/** How the recurring fee is billed/displayed. */
export const FEE_INTERVALS = ["month", "year"] as const;
export type FeeInterval = (typeof FEE_INTERVALS)[number];

/** Heading shown above the recurring price. */
export const FEE_INTERVAL_LABELS: Record<FeeInterval, string> = {
  month: "Maandelijks",
  year: "Jaarlijks",
};

/** Short suffix shown after the amount (e.g. "€20 / mnd"). */
export const FEE_INTERVAL_SUFFIX: Record<FeeInterval, string> = {
  month: "/ mnd",
  year: "/ jr",
};

/**
 * Human-readable, stable offerte number. Derived from the (unique) token and
 * the creation year so it never needs a separate counter, e.g. OFF-2026-A1B2C3.
 */
export function proposalNumber(p: {
  token: string;
  createdAt: string;
}): string {
  const year = new Date(p.createdAt).getFullYear();
  const suffix = p.token.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase();
  return `OFF-${year}-${suffix}`;
}

/** Validated input for create/update — the editable fields only. */
export const proposalInputSchema = z.object({
  clientName: z.string().trim().min(1, "Naam van de klant is verplicht."),
  companyName: z.string().trim().min(1, "Bedrijfsnaam is verplicht."),
  contactEmail: z.email("Vul een geldig e-mailadres in."),
  clientAddress: z.string().trim().default(""),
  clientVatNumber: z.string().trim().default(""),
  projectTitle: z.string().trim().min(1, "Projecttitel is verplicht."),
  projectDescription: z
    .string()
    .trim()
    .min(1, "Projectomschrijving is verplicht."),
  services: z
    .array(z.string().trim().min(1))
    .min(1, "Voeg minimaal één dienst toe."),
  timeline: z.string().trim().min(1, "Tijdlijn is verplicht."),
  oneTimeFee: z.coerce.number().min(0, "Bedrag kan niet negatief zijn."),
  monthlyFee: z.coerce.number().min(0, "Bedrag kan niet negatief zijn."),
  feeInterval: z.enum(FEE_INTERVALS).default("month"),
  paymentTermDays: z.coerce
    .number()
    .int()
    .min(0, "Aantal dagen kan niet negatief zijn."),
  validityDays: z.coerce
    .number()
    .int()
    .min(0, "Aantal dagen kan niet negatief zijn."),
  notes: z.string().trim().default(""),
  status: z.enum(PROPOSAL_STATUSES),
});

export type ProposalInput = z.infer<typeof proposalInputSchema>;

/** Plain, serialisable shape handed to (client) components. */
export type Proposal = {
  id: string;
  token: string;
  clientName: string;
  companyName: string;
  contactEmail: string;
  clientAddress: string;
  clientVatNumber: string;
  projectTitle: string;
  projectDescription: string;
  services: string[];
  timeline: string;
  oneTimeFee: number;
  monthlyFee: number;
  feeInterval: FeeInterval;
  paymentTermDays: number;
  validityDays: number;
  notes: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  acceptedAt: string | null;
  acceptedByName: string | null;
};
