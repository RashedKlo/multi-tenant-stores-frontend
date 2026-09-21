import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import type { CheckoutResult } from "../types";
import {
  createCheckoutSchema,
  type CreateCheckoutInput,
} from "../schemas/checkout.schema";

export async function createCheckout(
  input: CreateCheckoutInput,
): Promise<Result<CheckoutResult>> {
  const parsed = createCheckoutSchema.safeParse(input);

 if (!parsed.success) {
     return fail("errors.validation", parsed.error.flatten().fieldErrors);
   }
 

  return fetchJson<CheckoutResult>("/api/checkout", {
    method: "POST",
    body: parsed.data,
  });
}