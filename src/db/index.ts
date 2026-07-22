import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { getDatabaseEnv } from "@/lib/env";

import * as schema from "./schema";

export type Database = ReturnType<typeof createDatabase>;

let cachedDatabase: Database | undefined;

function createDatabase() {
  const client = neon(getDatabaseEnv().DATABASE_URL);
  return drizzle({ client, schema });
}

export function getDatabase(): Database {
  cachedDatabase ??= createDatabase();
  return cachedDatabase;
}
