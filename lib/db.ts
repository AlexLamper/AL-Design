import "server-only";
import { MongoClient, type Db } from "mongodb";

/**
 * Single, HMR-safe MongoDB client. In development Next.js clears the module
 * cache on every edit, which would otherwise open a new connection pool per
 * change and exhaust the database. We cache the connection promise on the
 * global object so it survives those reloads.
 *
 * The client is created lazily inside getDb() (not at import time) so that
 * importing this module during `next build` doesn't require a live database.
 */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  if (global._mongoClientPromise) return global._mongoClientPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local.");
  }

  const promise = new MongoClient(uri).connect();
  if (process.env.NODE_ENV !== "production") {
    global._mongoClientPromise = promise;
  }
  return promise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB ?? "aldesign");
}
