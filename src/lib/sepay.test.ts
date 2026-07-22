import { createHmac } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  assessSePayTransaction,
  normalizeSePayApiTransaction,
  parseSePayWebhook,
  verifySePaySignature,
} from "./sepay";

const payload = {
  id: 92704,
  gateway: "MBBank",
  transactionDate: "2026-07-22 10:30:00",
  accountNumber: "0703586224",
  subAccount: "",
  code: "CF00000042",
  content: "CF00000042",
  transferType: "in",
  transferAmount: 90_000,
  accumulated: 1_000_000,
  referenceCode: "FT260722123456",
};

describe("SePay webhook security", () => {
  it("accepts a valid signature over timestamp.raw_body", () => {
    const rawBody = JSON.stringify(payload);
    const secret = "test-secret";
    const timestamp = "1_753_156_800".replaceAll("_", "");
    const signature = `sha256=${createHmac("sha256", secret)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex")}`;

    expect(
      verifySePaySignature({
        rawBody,
        signature,
        timestamp,
        secret,
        nowSeconds: Number(timestamp),
      }),
    ).toEqual({ ok: true });
  });

  it("rejects a signature outside the five-minute replay window", () => {
    expect(
      verifySePaySignature({
        rawBody: "{}",
        signature: "sha256=invalid",
        timestamp: "1000",
        secret: "test-secret",
        nowSeconds: 1301,
      }),
    ).toEqual({ ok: false, reason: "expired" });
  });
});

describe("SePay payment matching", () => {
  it("normalizes a SePay API v2 transaction for reconciliation", () => {
    expect(
      normalizeSePayApiTransaction({
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        transaction_date: "2026-07-22 10:30:00",
        account_number: "0703586224",
        transfer_type: "in",
        amount_in: 90_000,
        accumulated: 1_000_000,
        transaction_content: "CF00000042",
        reference_number: "FT260722123456",
        code: "CF00000042",
        bank_brand_name: "MBBank",
      }).transferAmount,
    ).toBe(90_000);
  });

  it("matches an incoming transaction by account, code and amount", () => {
    const parsed = parseSePayWebhook(JSON.stringify(payload));

    expect(
      assessSePayTransaction(parsed, {
        accountNumber: "0703586224",
        paymentCode: "CF00000042",
        amount: 90_000,
      }),
    ).toBe("match");
  });

  it("does not confirm a transfer with the wrong amount", () => {
    const parsed = parseSePayWebhook(
      JSON.stringify({ ...payload, transferAmount: 30_000 }),
    );

    expect(
      assessSePayTransaction(parsed, {
        accountNumber: "0703586224",
        paymentCode: "CF00000042",
        amount: 90_000,
      }),
    ).toBe("wrong_amount");
  });

  it("rejects malformed payloads", () => {
    expect(() => parseSePayWebhook('{"id":"not-a-number"}')).toThrow();
  });
});
