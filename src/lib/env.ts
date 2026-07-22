import "server-only";

import {
  databaseEnvSchema,
  serverEnvSchema,
  type DatabaseEnv,
  type ServerEnv,
} from "./env-schema";

let cachedDatabaseEnv: DatabaseEnv | undefined;
let cachedEnv: ServerEnv | undefined;

function formatConfigurationError(
  issues: ReadonlyArray<{ path: PropertyKey[] }>,
): Error {
  const invalidKeys = issues
    .map((issue) => issue.path.join("."))
    .filter(Boolean)
    .join(", ");
  return new Error(`Missing or invalid server configuration: ${invalidKeys}`);
}

export function getDatabaseEnv(): DatabaseEnv {
  if (cachedDatabaseEnv) {
    return cachedDatabaseEnv;
  }

  const parsed = databaseEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw formatConfigurationError(parsed.error.issues);
  }

  cachedDatabaseEnv = parsed.data;
  return cachedDatabaseEnv;
}

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw formatConfigurationError(parsed.error.issues);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
