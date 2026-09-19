// features/addresses/actions/delete-address.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { ActionResult } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function deleteAddressAction(
  id: string,
): Promise<ActionResult> {
  const token=await getAccessToken();
  try {
    await fetchJson(`/api/addresses/${id}`, {
          headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      method: "DELETE",
      allowEmptyResponse: true,
    });

    // revalidateTag(CACHE_TAGS.addresses);
    // revalidateTag(`address-${id}`);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[deleteAddressAction]", error);
    const message =
      error instanceof ApiError ? error.message : "Failed to delete address";
    return { success: false, error: "Please Try Again" };
  }
}