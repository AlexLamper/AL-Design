"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { site } from "@/lib/site";
import {
  acceptProposal,
  createProposal,
  deleteProposal,
  proposalInputSchema,
  setProposalStatus,
  updateProposal,
  type Proposal,
  type ProposalStatus,
} from "@/lib/proposals";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

/**
 * Notify the owner by e-mail when a client accepts a proposal. Best-effort:
 * any failure is logged but never blocks the acceptance itself.
 */
async function sendAcceptNotification(proposal: Proposal): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ontbreekt - acceptatie-mail niet verzonden.");
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "AL Design <onboarding@resend.dev>";
  const link = `${site.url}/offerte/${proposal.token}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: proposal.contactEmail,
      subject: `Offerte geaccepteerd - ${proposal.projectTitle} (${proposal.companyName})`,
      text: [
        `${proposal.companyName} heeft de offerte geaccepteerd.`,
        "",
        `Project: ${proposal.projectTitle}`,
        `Bedrijf: ${proposal.companyName}`,
        `Contact: ${proposal.clientName} (${proposal.contactEmail})`,
        `Akkoord door: ${proposal.acceptedByName ?? "-"}`,
        "",
        `Bekijk: ${link}`,
      ].join("\n"),
    });
    if (error) console.error("Resend error (accept):", error);
  } catch (err) {
    console.error("Accept notification error:", err);
  }
}

function dbErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("querySrv") || msg.includes("ECONNREFUSED") || msg.includes("ENOTFOUND")) {
    return "Geen verbinding met de database. Controleer of je MongoDB Atlas cluster actief is (atlas.mongodb.com - klik Resume als het cluster gepauzeerd is).";
  }
  return `Database fout: ${msg}`;
}

/** Create (no id) or update (id) a proposal. Used with useActionState. */
export async function saveProposalAction(
  id: string | undefined,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const services = String(formData.get("services") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed = proposalInputSchema.safeParse({
    clientName: formData.get("clientName"),
    companyName: formData.get("companyName"),
    contactEmail: formData.get("contactEmail"),
    clientAddress: formData.get("clientAddress") ?? "",
    clientVatNumber: formData.get("clientVatNumber") ?? "",
    projectTitle: formData.get("projectTitle"),
    projectDescription: formData.get("projectDescription"),
    services,
    timeline: formData.get("timeline"),
    oneTimeFee: formData.get("oneTimeFee"),
    monthlyFee: formData.get("monthlyFee"),
    feeInterval: formData.get("feeInterval"),
    validityDays: formData.get("validityDays"),
    notes: formData.get("notes") ?? "",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    if (id) {
      const updated = await updateProposal(id, parsed.data);
      if (!updated) return { error: "Offerte niet gevonden." };
    } else {
      await createProposal(parsed.data);
    }
  } catch (err) {
    return { error: dbErrorMessage(err) };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProposalAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  try {
    await deleteProposal(id);
  } catch {
    // swallow - page will just reload
  }
  revalidatePath("/admin");
  redirect("/admin");
}

export async function setStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ProposalStatus;
  try {
    await setProposalStatus(id, status);
  } catch {
    // swallow - the dropdown will revert on next page load
  }
  revalidatePath("/admin");
}

/** Public acceptance — no auth. Atomicity is enforced in acceptProposal(). */
export async function acceptProposalAction(
  token: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const acceptedByName = String(formData.get("acceptedByName") ?? "");

  let result: Awaited<ReturnType<typeof acceptProposal>>;
  try {
    result = await acceptProposal(token, acceptedByName);
  } catch (err) {
    return { error: dbErrorMessage(err) };
  }

  if (!result.ok) {
    const messages: Record<typeof result.reason, string> = {
      not_found: "Deze offerte bestaat niet meer.",
      not_acceptable: "Deze offerte kan op dit moment niet geaccepteerd worden.",
      already_accepted: "Deze offerte is al geaccepteerd.",
    };
    return { error: messages[result.reason] };
  }

  await sendAcceptNotification(result.proposal);

  revalidatePath(`/offerte/${token}`);
  return {};
}
