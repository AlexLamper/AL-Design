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

/** Validated input for create/update — the editable fields only. */
export const proposalInputSchema = z.object({
  clientName: z.string().trim().min(1, "Naam van de klant is verplicht."),
  companyName: z.string().trim().min(1, "Bedrijfsnaam is verplicht."),
  contactEmail: z.email("Vul een geldig e-mailadres in."),
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
  projectTitle: string;
  projectDescription: string;
  services: string[];
  timeline: string;
  oneTimeFee: number;
  monthlyFee: number;
  notes: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  acceptedAt: string | null;
  acceptedByName: string | null;
};
