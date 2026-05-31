import "server-only";
import { randomBytes } from "node:crypto";
import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/db";
import type { Proposal, ProposalInput, ProposalStatus } from "@/lib/proposal-shared";

export type { Proposal, ProposalInput, ProposalStatus } from "@/lib/proposal-shared";
export {
  PROPOSAL_STATUSES,
  STATUS_LABELS,
  proposalInputSchema,
} from "@/lib/proposal-shared";

/** Shape stored in MongoDB. */
type ProposalDoc = {
  _id: ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
  sentAt: Date | null;
  acceptedAt: Date | null;
  acceptedByName: string | null;
};

async function collection(): Promise<Collection<ProposalDoc>> {
  const db = await getDb();
  return db.collection<ProposalDoc>("proposals");
}

function serialize(doc: ProposalDoc): Proposal {
  return {
    id: doc._id.toString(),
    token: doc.token,
    clientName: doc.clientName,
    companyName: doc.companyName,
    contactEmail: doc.contactEmail,
    projectTitle: doc.projectTitle,
    projectDescription: doc.projectDescription,
    services: doc.services,
    timeline: doc.timeline,
    oneTimeFee: doc.oneTimeFee,
    monthlyFee: doc.monthlyFee,
    notes: doc.notes,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    sentAt: doc.sentAt ? doc.sentAt.toISOString() : null,
    acceptedAt: doc.acceptedAt ? doc.acceptedAt.toISOString() : null,
    acceptedByName: doc.acceptedByName,
  };
}

/** 16-char URL-safe token — unguessable so public URLs aren't enumerable. */
function newToken(): string {
  return randomBytes(12).toString("base64url");
}

export async function listProposals(): Promise<Proposal[]> {
  const docs = await (await collection())
    .find({}, { sort: { createdAt: -1 } })
    .toArray();
  return docs.map(serialize);
}

export async function getProposalById(id: string): Promise<Proposal | null> {
  if (!ObjectId.isValid(id)) return null;
  const doc = await (await collection()).findOne({ _id: new ObjectId(id) });
  return doc ? serialize(doc) : null;
}

export async function getProposalByToken(
  token: string,
): Promise<Proposal | null> {
  const doc = await (await collection()).findOne({ token });
  return doc ? serialize(doc) : null;
}

export async function createProposal(input: ProposalInput): Promise<Proposal> {
  const now = new Date();
  const doc: ProposalDoc = {
    _id: new ObjectId(),
    token: newToken(),
    ...input,
    createdAt: now,
    updatedAt: now,
    sentAt: input.status === "sent" ? now : null,
    acceptedAt: null,
    acceptedByName: null,
  };
  await (await collection()).insertOne(doc);
  return serialize(doc);
}

export async function updateProposal(
  id: string,
  input: ProposalInput,
): Promise<Proposal | null> {
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const existing = await (await collection()).findOne({ _id });
  if (!existing) return null;

  // Stamp sentAt the first time a proposal moves into "sent".
  const sentAt =
    input.status === "sent" && !existing.sentAt ? new Date() : existing.sentAt;

  const doc = await (await collection()).findOneAndUpdate(
    { _id },
    { $set: { ...input, sentAt, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return doc ? serialize(doc) : null;
}

/** Change only the status (used by the quick status dropdown in the admin list). */
export async function setProposalStatus(
  id: string,
  status: ProposalStatus,
): Promise<Proposal | null> {
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const existing = await (await collection()).findOne({ _id });
  if (!existing) return null;

  const now = new Date();
  const doc = await (await collection()).findOneAndUpdate(
    { _id },
    {
      $set: {
        status,
        updatedAt: now,
        sentAt: status === "sent" && !existing.sentAt ? now : existing.sentAt,
        acceptedAt:
          status === "accepted" && !existing.acceptedAt ? now : existing.acceptedAt,
      },
    },
    { returnDocument: "after" },
  );
  return doc ? serialize(doc) : null;
}

export async function deleteProposal(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const res = await (await collection()).deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

export type AcceptResult =
  | { ok: true; proposal: Proposal }
  | { ok: false; reason: "not_found" | "not_acceptable" | "already_accepted" };

/**
 * Accept a proposal by its public token. Atomic: the status guard in the
 * filter guarantees only a single "sent" → "accepted" transition wins, so
 * duplicate clicks / double submits can never accept twice.
 */
export async function acceptProposal(
  token: string,
  acceptedByName?: string,
): Promise<AcceptResult> {
  const col = await collection();
  const now = new Date();

  const updated = await col.findOneAndUpdate(
    { token, status: "sent" },
    {
      $set: {
        status: "accepted",
        acceptedAt: now,
        updatedAt: now,
        acceptedByName: acceptedByName?.trim() || null,
      },
    },
    { returnDocument: "after" },
  );

  if (updated) return { ok: true, proposal: serialize(updated) };

  // Nothing transitioned — figure out why for a helpful message.
  const current = await col.findOne({ token });
  if (!current) return { ok: false, reason: "not_found" };
  if (current.status === "accepted") return { ok: false, reason: "already_accepted" };
  return { ok: false, reason: "not_acceptable" };
}
