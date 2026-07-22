import { describe, expect, it } from "vitest";

import {
  buildVietQrUrl,
  calculateDonationAmount,
  createPaymentCode,
  createRequestFingerprint,
  donationInputSchema,
} from "./donation";

describe("donation domain", () => {
  it("calculates the amount on the server from the cups count", () => {
    expect(calculateDonationAmount(3)).toBe(90_000);
  });

  it.each([0, 21, 1.5])("rejects an invalid cups count: %s", (cups) => {
    expect(() => calculateDonationAmount(cups)).toThrow("Invalid cups count");
  });

  it("normalizes optional supporter text", () => {
    const result = donationInputSchema.parse({
      cups: 1,
      name: "  Khanh  ",
      message: "  Keep building!  ",
    });

    expect(result).toEqual({
      cups: 1,
      name: "Khanh",
      message: "Keep building!",
    });
  });

  it("creates an eight-digit SePay payment code", () => {
    expect(createPaymentCode(() => 42)).toBe("CF00000042");
  });

  it("creates a stable non-reversible fingerprint for rate limiting", () => {
    const first = createRequestFingerprint("203.0.113.8", "secret-key");
    const second = createRequestFingerprint("203.0.113.8", "secret-key");

    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(first).not.toContain("203.0.113.8");
  });

  it("builds a VietQR URL with exact payment details", () => {
    const result = new URL(
      buildVietQrUrl({
        accountNumber: "0703586224",
        bankCode: "MBBank",
        amount: 90_000,
        paymentCode: "CF00000042",
      }),
    );

    expect(Object.fromEntries(result.searchParams)).toEqual({
      acc: "0703586224",
      bank: "MBBank",
      amount: "90000",
      des: "CF00000042",
    });
  });
});
