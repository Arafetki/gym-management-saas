import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from "@/env.mjs";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

export const client =
  globalForDb.client ?? postgres(env.SUPABASE_DB_URL);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client,{schema});


