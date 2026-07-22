import { getServerEnv } from "@/lib/env";
import { reconcileSePayTransactions } from "@/lib/sepay-api";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const env = getServerEnv();
    if (!env.CRON_SECRET || !env.SEPAY_API_TOKEN) {
      return Response.json(
        { error: "Reconciliation is not configured" },
        { status: 503 },
      );
    }

    if (request.headers.get("authorization") !== `Bearer ${env.CRON_SECRET}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return Response.json(await reconcileSePayTransactions());
  } catch (error) {
    console.error("SePay reconciliation failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json({ error: "Reconciliation failed" }, { status: 500 });
  }
}
