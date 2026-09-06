"use server";

import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { CustomerProfile } from "../types/profile.types";

/** Returns profile when authenticated; null when guest / unauthorized. */
export async function getProfile(): Promise<CustomerProfile | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    return await fetchJson<CustomerProfile>("/api/customers/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      return null;
    }
    console.error("[getProfile]", error);
    return null;
  }
}