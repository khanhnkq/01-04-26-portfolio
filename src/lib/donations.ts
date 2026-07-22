import "server-only";

import { and, desc, eq, gte, sql } from "drizzle-orm";

import { getDatabase } from "@/db";
import { donations } from "@/db/schema";
import {
  calculateDonationAmount,
  createPaymentCode,
  type DonationInput,
} from "@/lib/donation";
import {
  extractSePayPaymentCode,
  type SePayWebhook,
} from "@/lib/sepay";
import type {
  DonationStatusResponse,
  SupporterMessage,
} from "@/types/donation";

const CHECKOUT_TTL_MS = 15 * 60 * 1000;
const DEFAULT_SUPPORTER_NAME = "Kind Friend (^ ᴗ ^)";
const DEFAULT_SUPPORTER_MESSAGE = "Enjoy the warm coffee! (♡ ‿ ♡)";

export async function createPendingDonation(
  input: DonationInput,
  requestFingerprint?: string,
) {
  const db = getDatabase();
  const amount = calculateDonationAmount(input.cups);
  const expiresAt = new Date(Date.now() + CHECKOUT_TTL_MS);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const paymentCode = createPaymentCode();
    const rows = await db
      .insert(donations)
      .values({
        paymentCode,
        name: input.name || DEFAULT_SUPPORTER_NAME,
        message: input.message || DEFAULT_SUPPORTER_MESSAGE,
        cups: input.cups,
        amount,
        requestFingerprint,
        expiresAt,
      })
      .onConflictDoNothing({ target: donations.paymentCode })
      .returning({
        id: donations.id,
        paymentCode: donations.paymentCode,
        cups: donations.cups,
        amount: donations.amount,
        status: donations.status,
        expiresAt: donations.expiresAt,
      });

    if (rows[0]) {
      return rows[0];
    }
  }

  throw new Error("Unable to allocate a unique payment code");
}

export async function isDonationRateLimited(
  requestFingerprint: string,
): Promise<boolean> {
  const recentAttempts = await getDatabase()
    .select({ id: donations.id })
    .from(donations)
    .where(
      and(
        eq(donations.requestFingerprint, requestFingerprint),
        gte(donations.createdAt, new Date(Date.now() - 10 * 60 * 1000)),
      ),
    )
    .limit(5);

  return recentAttempts.length >= 5;
}

export async function getDonationStatus(
  id: string,
): Promise<DonationStatusResponse | null> {
  const rows = await getDatabase()
    .select({
      id: donations.id,
      status: donations.status,
      paidAt: donations.paidAt,
      expiresAt: donations.expiresAt,
    })
    .from(donations)
    .where(eq(donations.id, id))
    .limit(1);
  const donation = rows[0];

  if (!donation) {
    return null;
  }

  return {
    id: donation.id,
    status: donation.status,
    paidAt: donation.paidAt?.toISOString() ?? null,
    expiresAt: donation.expiresAt.toISOString(),
  };
}

export async function listPaidSupporters(limit = 50): Promise<SupporterMessage[]> {
  const rows = await getDatabase()
    .select({
      id: donations.id,
      name: donations.name,
      cups: donations.cups,
      amount: donations.amount,
      message: donations.message,
      paidAt: donations.paidAt,
    })
    .from(donations)
    .where(and(eq(donations.status, "paid"), eq(donations.isVisible, true)))
    .orderBy(desc(donations.paidAt))
    .limit(limit);

  return rows.map((row, index) => ({
    id: row.id,
    name: row.name,
    cups: row.cups,
    amount: row.amount,
    message: row.message,
    createdAt: row.paidAt?.toISOString() ?? new Date().toISOString(),
    avatarBg: ["#FFE06B", "#238CFF", "#FFF9EF"][index % 3],
  }));
}

export type ProcessSePayOutcome =
  | "matched"
  | "wrong_amount"
  | "unmatched"
  | "already_paid"
  | "duplicate";

export async function processSePayTransaction(
  payload: SePayWebhook,
): Promise<ProcessSePayOutcome> {
  const paymentCode = extractSePayPaymentCode(payload);
  const result = await getDatabase().execute<{ outcome: ProcessSePayOutcome }>(sql`
    WITH candidate AS (
      SELECT id, amount, status
      FROM ${donations}
      WHERE payment_code = ${paymentCode}
      LIMIT 1
    ), inserted AS (
      INSERT INTO sepay_transactions (
        sepay_id,
        reference_code,
        gateway,
        account_number,
        payment_code,
        content,
        transfer_amount,
        transaction_date,
        match_status,
        donation_id
      )
      VALUES (
        ${String(payload.id)},
        ${payload.referenceCode},
        ${payload.gateway},
        ${payload.accountNumber},
        ${paymentCode},
        ${payload.content},
        ${payload.transferAmount},
        ${payload.transactionDate},
        CASE
          WHEN NOT EXISTS (SELECT 1 FROM candidate) THEN 'unmatched'::transaction_match_status
          WHEN (SELECT status FROM candidate) = 'paid'::donation_status THEN 'already_paid'::transaction_match_status
          WHEN (SELECT amount FROM candidate) <> ${payload.transferAmount} THEN 'wrong_amount'::transaction_match_status
          ELSE 'matched'::transaction_match_status
        END,
        (SELECT id FROM candidate)
      )
      ON CONFLICT (sepay_id) DO NOTHING
      RETURNING match_status, donation_id
    ), updated AS (
      UPDATE ${donations} AS donation
      SET
        status = CASE
          WHEN inserted.match_status = 'matched'::transaction_match_status THEN 'paid'::donation_status
          WHEN inserted.match_status = 'wrong_amount'::transaction_match_status
            AND donation.status = 'pending'::donation_status
            THEN 'amount_mismatch'::donation_status
          ELSE donation.status
        END,
        paid_at = CASE
          WHEN inserted.match_status = 'matched'::transaction_match_status THEN NOW()
          ELSE donation.paid_at
        END,
        updated_at = NOW()
      FROM inserted
      WHERE donation.id = inserted.donation_id
      RETURNING donation.id
    )
    SELECT COALESCE(
      (SELECT match_status::text FROM inserted LIMIT 1),
      'duplicate'
    ) AS outcome
  `);

  return result.rows[0]?.outcome ?? "duplicate";
}
