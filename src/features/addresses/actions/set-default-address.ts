// features/addresses/actions/set-default-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, ActionResult } from "../types";

export async function setDefaultAddressAction(
  id: string,
): Promise<ActionResult<Address>> {
  try {
    const data = await fetchJson<Address>(`/api/addresses/${id}/set-default`, {
      method: "POST",
    });

    // revalidateTag(CACHE_TAGS.addresses);
    return { success: true, data };
  } catch (error) {
    console.error("[setDefaultAddressAction]", error);
    const message =
      error instanceof ApiError
        ? error.message
        : "Failed to set default address";
    return { success: false, error: message };
  }
}