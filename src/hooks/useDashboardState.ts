"use client";

import { useState, useEffect, useCallback } from "react";
import type { DashboardState } from "@/types/dashboard";

const STATE_URL = "/api/dashboard-state";

export function useDashboardState(pollInterval = 5000) {
  const [data, setData] = useState<DashboardState | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(STATE_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load state: ${res.status}`);
      const json: DashboardState = await res.json();
      json.timestamp = Date.now();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, pollInterval);
    return () => clearInterval(interval);
  }, [fetchState, pollInterval]);

  return { data, lastUpdated, loading, error, refresh: fetchState };
}
