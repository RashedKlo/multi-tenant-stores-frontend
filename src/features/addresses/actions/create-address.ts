// features/addresses/actions/create-address.ts
"use server";

import { revalidateTag, updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address } from "../types";
import {
  createAddressSchema,
  type CreateAddressInput,
} from "../schemas/address.schema";

export async function createAddressAction(
  input: CreateAddressInput
): Promise<Result<Address>> {
  const parsed = createAddressSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<Address>("/api/addresses", {
    method: "POST",
    body: parsed.data,
  });

  if (result.success) {
    updateTag(CACHE_TAGS.addresses);
  }

  return result;
}