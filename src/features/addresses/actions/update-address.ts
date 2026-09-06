// features/addresses/actions/update-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, UpdateAddressInput, ActionResult } from "../types";

export async function updateAddressAction(
  id: string,
  input: UpdateAddressInput,
): Promise<ActionResult<Address>> {
  try {
    const data = await fetchJson<Address>(`/api/addresses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: input.label.trim(),
        latitude: input.latitude,
        longitude: input.longitude,
        addressText: input.addressText.trim(),
      }),
    });

    // revalidateTag(CACHE_TAGS.addresses);
    // revalidateTag(`address-${id}`);
    return { success: true, data };
  } catch (error) {
    console.error("[updateAddressAction]", error);
    const message =
      error instanceof ApiError ? error.message : "Failed to update address";
    return { success: false, error: message };
  }
}