// features/addresses/actions/delete-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";

export async function deleteAddressAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await fetchJson(`/api/addresses/${id}`, { method: "DELETE" });
    // revalidateTag(CACHE_TAGS.addresses);
    return { success: true };
  } catch (error) {
    console.error("[deleteAddressAction]", error);
    return { success: false, error: "Failed to delete address" };
  }
}