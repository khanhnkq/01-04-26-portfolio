import { z } from "zod";

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export const serverEnvSchema = databaseEnvSchema.extend({
  SEPAY_WEBHOOK_SECRET: z.string().min(16),
  DONATE_BANK_CODE: z.string().min(2),
  DONATE_ACCOUNT_NO: z.string().min(6),
  DONATE_ACCOUNT_NAME: z.string().min(2),
});

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseDatabaseEnv(input: unknown): DatabaseEnv {
  return databaseEnvSchema.parse(input);
}

export function parseServerEnv(input: unknown): ServerEnv {
  return serverEnvSchema.parse(input);
}
