import "server-only";

import { z } from "zod";

import { processSePayTransaction } from "@/lib/donations";
import { getServerEnv } from "@/lib/env";
import {
  normalizeSePayApiTransaction,
  type SePayApiTransaction,
} from "@/lib/sepay";

const transactionListSchema = z.object({
  status: z.literal("success"),
  data: z.array(z.unknown()),
  meta: z
    .object({
      pagination: z.object({
        has_more: z.boolean().default(false),
      }),
    })
    .optional(),
});

function formatSePayDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

async function fetchTransactionPage(
  page: number,
  token: string,
  baseUrl: string,
): Promise<{ data: SePayApiTransaction[]; hasMore: boolean }> {
  const from = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const url = new URL(`${baseUrl}/transactions`);
  url.search = new URLSearchParams({
    transaction_date_from: formatSePayDate(from),
    transfer_type: "in",
    transaction_date_sort: "desc",
    per_page: "100",
    page: String(page),
  }).toString();

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`SePay reconciliation request failed (${response.status})`);
  }

  const parsed = transactionListSchema.parse(await response.json());
  const data = parsed.data.flatMap((item) => {
    try {
      return [normalizeSePayApiTransaction(item)];
    } catch {
      return [];
    }
  });

  return {
    data: data.map((item) => ({
      id: String(item.id),
      transaction_date: item.transactionDate,
      account_number: item.accountNumber,
      transfer_type: item.transferType,
      amount_in: item.transferAmount,
      accumulated: item.accumulated,
      transaction_content: item.content,
      reference_number: item.referenceCode,
      code: item.code,
      bank_brand_name: item.gateway,
    })),
    hasMore: parsed.meta?.pagination.has_more ?? false,
  };
}

export async function reconcileSePayTransactions() {
  const env = getServerEnv();
  if (!env.SEPAY_API_TOKEN) {
    throw new Error("SEPAY_API_TOKEN is not configured");
  }

  const outcomes: Record<string, number> = {};
  let checked = 0;

  for (let page = 1; page <= 5; page += 1) {
    const result = await fetchTransactionPage(
      page,
      env.SEPAY_API_TOKEN,
      env.SEPAY_API_BASE_URL,
    );

    for (const transaction of result.data) {
      if (
        transaction.account_number !== env.DONATE_ACCOUNT_NO ||
        !transaction.code?.startsWith("CF")
      ) {
        continue;
      }

      const outcome = await processSePayTransaction(
        normalizeSePayApiTransaction(transaction),
      );
      checked += 1;
      outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    }

    if (!result.hasMore) {
      break;
    }
  }

  return { checked, outcomes };
}
