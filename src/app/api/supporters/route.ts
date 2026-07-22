import { listPaidSupporters } from "@/lib/donations";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supporters = await listPaidSupporters();
    return Response.json(
      { supporters },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  } catch (error) {
    console.error("Failed to list supporters", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { error: "Supporter wall is temporarily unavailable" },
      { status: 503 },
    );
  }
}
