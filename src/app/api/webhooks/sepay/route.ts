import { ZodError } from "zod";

import { processSePayTransaction } from "@/lib/donations";
import { getServerEnv } from "@/lib/env";
import { parseSePayWebhook, verifySePaySignature } from "@/lib/sepay";

export const runtime = "nodejs";

const MAX_WEBHOOK_BYTES = 64 * 1024;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_WEBHOOK_BYTES) {
    return Response.json(
      { success: false, message: "Payload too large" },
      { status: 413 },
    );
  }

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BYTES) {
      return Response.json(
        { success: false, message: "Payload too large" },
        { status: 413 },
      );
    }

    const env = getServerEnv();
    const verification = verifySePaySignature({
      rawBody,
      signature: request.headers.get("x-sepay-signature"),
      timestamp: request.headers.get("x-sepay-timestamp"),
      secret: env.SEPAY_WEBHOOK_SECRET,
    });

    if (!verification.ok) {
      return Response.json(
        { success: false, message: "Unauthorized webhook" },
        { status: 401 },
      );
    }

    const payload = parseSePayWebhook(rawBody);
    if (payload.id === 0 || payload.id === "0") {
      return Response.json({ success: true, test: true });
    }

    if (
      payload.transferType !== "in" ||
      payload.accountNumber !== env.DONATE_ACCOUNT_NO
    ) {
      return Response.json({ success: true, ignored: true });
    }

    const outcome = await processSePayTransaction(payload);
    return Response.json({ success: true, outcome });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return Response.json(
        { success: false, message: "Invalid webhook payload" },
        { status: 400 },
      );
    }

    console.error("Failed to process SePay webhook", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { success: false, message: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
