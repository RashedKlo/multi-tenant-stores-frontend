"use server";

import { updateTag } from "next/cache";
import { createCheckout } from "../api/create-checkout";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  createCheckoutSchema,
  type CreateCheckoutInput,
} from "../schemas/checkout.schema";

export async function createCheckoutAction(
  input: CreateCheckoutInput,
): Promise<Result<Awaited<ReturnType<typeof createCheckout>> extends Result<infer T> ? T : never>> {
  const parsed = createCheckoutSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await createCheckout(parsed.data);

  if (result.success) {
    updateTag(CACHE_TAGS.cart);
  }

  return result;
}
