// features/addresses/actions/update-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, UpdateAddressInput } from "../types";

export async function updateAddressAction(
  input: UpdateAddressInput
): Promise<{ success: boolean; data?: Address; error?: string }> {
  try {
    const data = await fetchJson<Address>(`/api/addresses/${input.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    revalidateTag(CACHE_TAGS.addresses);
    revalidateTag(CACHE_TAGS.address(input.id));
    return { success: true, data };
  } catch (error) {
    console.error("[updateAddressAction]", error);
    return { success: false, error: "Failed to update address" };
  }
}