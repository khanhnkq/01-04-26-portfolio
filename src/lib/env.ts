import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SEPAY_WEBHOOK_SECRET: z.string().min(16),
  SEPAY_API_TOKEN: z.string().min(1).optional(),
  SEPAY_API_BASE_URL: z
    .string()
    .url()
    .default("https://userapi.sepay.vn/v2"),
  CRON_SECRET: z.string().min(16).optional(),
  DONATE_BANK_CODE: z.string().min(2),
  DONATE_ACCOUNT_NO: z.string().min(6),
  DONATE_ACCOUNT_NAME: z.string().min(2),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const missingKeys = parsed.error.issues
      .map((issue) => issue.path.join("."))
      .filter(Boolean)
      .join(", ");
    throw new Error(`Missing or invalid server configuration: ${missingKeys}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
