"use client";

import { useCallback, useEffect, useState } from "react";

import type { SupporterMessage } from "@/types/donation";

interface SupportersResponse {
  supporters: SupporterMessage[];
}

export function useSupporters() {
  const [supporters, setSupporters] = useState<SupporterMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSupporters = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/supporters", {
        cache: "no-store",
        signal,
      });
      if (!response.ok) {
        throw new Error("Unable to load supporters");
      }

      const data = (await response.json()) as SupportersResponse;
      setSupporters(data.supporters);
      setError(null);
    } catch (fetchError) {
      if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
        return;
      }
      setError("Supporter wall is temporarily unavailable.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refreshSupporters(controller.signal);
    return () => controller.abort();
  }, [refreshSupporters]);

  return { supporters, isLoading, error, refreshSupporters };
}
