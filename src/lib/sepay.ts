import { createHmac, timingSafeEqual } from "node:crypto";

import { z } from "zod";

const sePayWebhookSchema = z.object({
  id: z.union([z.number().int().positive(), z.string().min(1)]),
  gateway: z.string().min(1),
  transactionDate: z.string().min(1),
  accountNumber: z.string().min(1),
  subAccount: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
  content: z.string().default(""),
  transferType: z.enum(["in", "out"]),
  transferAmount: z.number().int().positive(),
  accumulated: z.number().optional(),
  referenceCode: z.string().min(1),
  description: z.string().optional(),
});

export type SePayWebhook = z.infer<typeof sePayWebhookSchema>;

interface SignatureVerificationInput {
  rawBody: string;
  signature: string | null;
  timestamp: string | null;
  secret: string;
  nowSeconds?: number;
}

export type SignatureVerificationResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "expired" | "invalid" };

export function verifySePaySignature({
  rawBody,
  signature,
  timestamp,
  secret,
  nowSeconds = Math.floor(Date.now() / 1000),
}: SignatureVerificationInput): SignatureVerificationResult {
  if (!signature || !timestamp || !secret) {
    return { ok: false, reason: "missing" };
  }

  const timestampNumber = Number(timestamp);
  if (!Number.isInteger(timestampNumber)) {
    return { ok: false, reason: "invalid" };
  }

  if (Math.abs(nowSeconds - timestampNumber) > 300) {
    return { ok: false, reason: "expired" };
  }

  const expected = `sha256=${createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex")}`;
  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(signature, "utf8");

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true };
}

export function parseSePayWebhook(rawBody: string): SePayWebhook {
  return sePayWebhookSchema.parse(JSON.parse(rawBody));
}

interface ExpectedDonation {
  accountNumber: string;
  paymentCode: string;
  amount: number;
}

export type SePayAssessment =
  | "match"
  | "not_incoming"
  | "wrong_account"
  | "unmatched_code"
  | "wrong_amount";

export function assessSePayTransaction(
  payload: SePayWebhook,
  expected: ExpectedDonation,
): SePayAssessment {
  if (payload.transferType !== "in") {
    return "not_incoming";
  }

  if (payload.accountNumber !== expected.accountNumber) {
    return "wrong_account";
  }

  if (payload.code !== expected.paymentCode) {
    return "unmatched_code";
  }

  if (payload.transferAmount !== expected.amount) {
    return "wrong_amount";
  }

  return "match";
}
