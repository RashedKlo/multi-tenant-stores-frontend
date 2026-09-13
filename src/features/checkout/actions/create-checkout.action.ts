"use server";

// features/checkout/actions/create-checkout.action.ts
import { createCheckout } from "../api/create-checkout";
import type { CheckoutRequest, CheckoutResult } from "../types";
import { ApiError } from "@/shared/lib/http/fetch-json";

export type CreateCheckoutActionResult =
  | { success: true; data: CheckoutResult }
  | { success: false; error: string; status?: number };

/**
 * Server action wrapper around createCheckout.
 * Keeps network + error mapping out of client components.
 */
export async function createCheckoutAction(
  payload: CheckoutRequest,
): Promise<CreateCheckoutActionResult> {
  if (!payload.storeId?.trim() || !payload.addressId?.trim()) {
    return {
      success: false,
      error: "Store and address are required.",
      status: 400,
    };
  }

  try {
    const data = await createCheckout(payload);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Checkout failed. Please try again.",
        status: error.status,
      };
    }
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
