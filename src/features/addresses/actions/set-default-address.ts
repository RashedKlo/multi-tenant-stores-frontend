// features/addresses/actions/set-default-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";

export async function setDefaultAddressAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await fetchJson(`/api/addresses/${id}/set-default`, { method: "POST" });
    // revalidateTag(CACHE_TAGS.addresses);
    return { success: true };
  } catch (error) {
    console.error("[setDefaultAddressAction]", error);
    return { success: false, error: "Failed to set default address" };
  }
}