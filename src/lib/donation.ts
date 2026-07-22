import { createHmac, randomInt } from "node:crypto";

import { z } from "zod";

import {
  COFFEE_PRICE_VND,
  MAX_CUPS,
  MIN_CUPS,
} from "../data/coffeeConfig";

export const PAYMENT_CODE_PREFIX = "CF";

export const donationInputSchema = z.object({
  cups: z.number().int().min(MIN_CUPS).max(MAX_CUPS),
  name: z.string().max(80).transform((value) => value.trim()).default(""),
  message: z.string().max(500).transform((value) => value.trim()).default(""),
});

export type DonationInput = z.infer<typeof donationInputSchema>;

export function calculateDonationAmount(cups: number): number {
  if (!Number.isInteger(cups) || cups < MIN_CUPS || cups > MAX_CUPS) {
    throw new Error("Invalid cups count");
  }

  return cups * COFFEE_PRICE_VND;
}

export function createPaymentCode(
  randomNumber: (maxExclusive: number) => number = randomInt,
): string {
  const suffix = randomNumber(100_000_000);

  if (!Number.isInteger(suffix) || suffix < 0 || suffix >= 100_000_000) {
    throw new Error("Invalid payment code source");
  }

  return `${PAYMENT_CODE_PREFIX}${String(suffix).padStart(8, "0")}`;
}

export function createRequestFingerprint(ipAddress: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`donation-rate-limit:${ipAddress}`)
    .digest("hex");
}

interface VietQrDetails {
  accountNumber: string;
  bankCode: string;
  amount: number;
  paymentCode: string;
}

export function buildVietQrUrl({
  accountNumber,
  bankCode,
  amount,
  paymentCode,
}: VietQrDetails): string {
  const url = new URL("https://vietqr.app/img");
  url.search = new URLSearchParams({
    acc: accountNumber,
    bank: bankCode,
    amount: String(amount),
    des: paymentCode,
  }).toString();

  return url.toString();
}
