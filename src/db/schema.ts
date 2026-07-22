import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const donationStatusEnum = pgEnum("donation_status", [
  "pending",
  "amount_mismatch",
  "paid",
]);

export const transactionMatchEnum = pgEnum("transaction_match_status", [
  "matched",
  "wrong_amount",
  "unmatched",
  "already_paid",
]);

export const donations = pgTable(
  "donations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentCode: varchar("payment_code", { length: 10 }).notNull(),
    name: varchar("name", { length: 80 }).notNull(),
    message: varchar("message", { length: 500 }).notNull(),
    cups: integer("cups").notNull(),
    amount: integer("amount").notNull(),
    requestFingerprint: varchar("request_fingerprint", { length: 64 }),
    status: donationStatusEnum("status").default("pending").notNull(),
    isVisible: boolean("is_visible").default(true).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("donations_payment_code_unique").on(table.paymentCode),
    index("donations_public_wall_idx").on(
      table.status,
      table.isVisible,
      table.paidAt,
    ),
    index("donations_rate_limit_idx").on(
      table.requestFingerprint,
      table.createdAt,
    ),
    check("donations_cups_range", sql`${table.cups} BETWEEN 1 AND 20`),
    check("donations_amount_positive", sql`${table.amount} > 0`),
  ],
);

export const sepayTransactions = pgTable(
  "sepay_transactions",
  {
    sepayId: varchar("sepay_id", { length: 64 }).primaryKey(),
    referenceCode: varchar("reference_code", { length: 120 }).notNull(),
    gateway: varchar("gateway", { length: 50 }).notNull(),
    accountNumber: varchar("account_number", { length: 64 }).notNull(),
    paymentCode: varchar("payment_code", { length: 32 }),
    content: text("content").notNull(),
    transferAmount: integer("transfer_amount").notNull(),
    transactionDate: varchar("transaction_date", { length: 40 }).notNull(),
    matchStatus: transactionMatchEnum("match_status").notNull(),
    donationId: uuid("donation_id").references(() => donations.id, {
      onDelete: "set null",
    }),
    receivedAt: timestamp("received_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("sepay_transactions_payment_code_idx").on(table.paymentCode),
    index("sepay_transactions_donation_id_idx").on(table.donationId),
    check(
      "sepay_transactions_amount_positive",
      sql`${table.transferAmount} > 0`,
    ),
  ],
);

export type DonationRow = typeof donations.$inferSelect;
export type NewDonationRow = typeof donations.$inferInsert;
