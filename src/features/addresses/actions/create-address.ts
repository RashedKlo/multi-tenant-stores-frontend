// features/addresses/actions/create-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, CreateAddressInput } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function createAddressAction(
  input: CreateAddressInput
): Promise<{ success: boolean; data?: Address; error?: string }> {
  const token = getAccessToken(); // Implement this function to retrieve the access token from your auth system
  try {
    const data = await fetchJson<Address>("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(input),
    });

    // revalidateTag(CACHE_TAGS.addresses);
    return { success: true, data };
  } catch (error) {
    console.error("[createAddressAction]", error);
    return { success: false, error: "Failed to create address" };
  }
}