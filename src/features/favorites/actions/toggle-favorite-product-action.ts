"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { toAuthErrorKey } from "@/shared/lib/http/auth-errors";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { ActionResult } from "@/features/auth/types";

export async function toggleFavoriteProduct(
  productId: string,
  isFavorite: boolean,
): Promise<ActionResult> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "errors.unauthorized" };
    }

    await fetchJson<unknown>(`/api/favorites/products/${productId}`, {
      method: isFavorite ? "DELETE" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      allowEmptyResponse: true,
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[toggleFavoriteProduct]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}