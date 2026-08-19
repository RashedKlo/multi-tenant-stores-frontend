// features/addresses/actions/create-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, CreateAddressInput } from "../types";

export async function createAddressAction(
  input: CreateAddressInput
): Promise<{ success: boolean; data?: Address; error?: string }> {
  try {
    const data = await fetchJson<Address>("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    revalidateTag(CACHE_TAGS.addresses);
    return { success: true, data };
  } catch (error) {
    console.error("[createAddressAction]", error);
    return { success: false, error: "Failed to create address" };
  }
}