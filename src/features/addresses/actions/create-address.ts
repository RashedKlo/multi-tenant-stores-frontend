// features/addresses/actions/create-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address, CreateAddressInput, ActionResult } from "../types";

export async function createAddressAction(
  input: CreateAddressInput,
): Promise<ActionResult<Address>> {
  try {
    const data = await fetchJson<Address>("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: input.label.trim(),
        latitude: input.latitude,
        longitude: input.longitude,
        addressText: input.addressText.trim(),
        isDefault: input.isDefault ?? false,
      }),
    });

    // revalidateTag(CACHE_TAGS.addresses);
    return { success: true, data };
  } catch (error) {
    console.error("[createAddressAction]", error);
    const message =
      error instanceof ApiError ? error.message : "Failed to create address";
    return { success: false, error: message };
  }
}