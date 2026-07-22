import { z } from "zod";

import { getDonationStatus } from "@/lib/donations";

export const runtime = "nodejs";

const idSchema = z.string().uuid();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = idSchema.safeParse((await params).id);
  if (!result.success) {
    return Response.json({ error: "Invalid donation id" }, { status: 400 });
  }

  try {
    const donation = await getDonationStatus(result.data);
    if (!donation) {
      return Response.json({ error: "Donation not found" }, { status: 404 });
    }

    return Response.json(donation, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to read donation status", {
      donationId: result.data,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { error: "Donation service is temporarily unavailable" },
      { status: 503 },
    );
  }
}
