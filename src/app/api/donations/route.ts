import { ZodError } from "zod";

import {
  buildVietQrUrl,
  createRequestFingerprint,
  donationInputSchema,
} from "@/lib/donation";
import {
  createPendingDonation,
  isDonationRateLimited,
} from "@/lib/donations";
import { getServerEnv } from "@/lib/env";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 4_096;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request body is too large" }, { status: 413 });
  }

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
      return Response.json(
        { error: "Request body is too large" },
        { status: 413 },
      );
    }

    const input = donationInputSchema.parse(JSON.parse(rawBody));
    const env = getServerEnv();
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const requestFingerprint = createRequestFingerprint(
      clientIp,
      env.SEPAY_WEBHOOK_SECRET,
    );

    if (await isDonationRateLimited(requestFingerprint)) {
      return Response.json(
        { error: "Too many donation attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const donation = await createPendingDonation(input, requestFingerprint);

    return Response.json(
      {
        id: donation.id,
        paymentCode: donation.paymentCode,
        cups: donation.cups,
        amount: donation.amount,
        status: donation.status,
        expiresAt: donation.expiresAt.toISOString(),
        qrUrl: buildVietQrUrl({
          accountNumber: env.DONATE_ACCOUNT_NO,
          bankCode: env.DONATE_BANK_CODE,
          amount: donation.amount,
          paymentCode: donation.paymentCode,
        }),
        bank: {
          code: env.DONATE_BANK_CODE,
          accountNumber: env.DONATE_ACCOUNT_NO,
          accountName: env.DONATE_ACCOUNT_NAME,
        },
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return Response.json({ error: "Invalid donation data" }, { status: 400 });
    }

    console.error("Failed to create donation", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { error: "Donation service is temporarily unavailable" },
      { status: 503 },
    );
  }
}
