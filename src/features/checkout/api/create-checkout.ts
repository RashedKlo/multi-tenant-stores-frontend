// features/checkout/api/create-checkout.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { CheckoutRequest, CheckoutResult } from "../types";

/**
 * Creates a Stripe Checkout session for the given store + address.
 * Backend clears the cart on success and returns the hosted checkout URL.
 */
export async function createCheckout(
  payload: CheckoutRequest,
): Promise<CheckoutResult> {
  const token = await getAccessToken();

  try {
    const data = await fetchJson<CheckoutResult>("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        storeId: payload.storeId,
        addressId: payload.addressId,
        deliveryPhone: payload.deliveryPhone ?? null,
      }),
    });

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[createCheckout] ${error.status}: ${error.message}`);
    } else {
      console.error("[createCheckout] Unexpected error:", error);
    }
    throw error;
  }
}
