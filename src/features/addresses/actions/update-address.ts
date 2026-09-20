// features/addresses/actions/update-address.ts
"use server";

import { revalidateTag, updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address } from "../types/addresses.types";
import {
  updateAddressSchema,
  type UpdateAddressInput,
} from "../schemas/address.schema";

export async function updateAddressAction(
  id: string,
  input: UpdateAddressInput
): Promise<Result<Address>> {
  const parsed = updateAddressSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<Address>(`/api/addresses/${id}`, {
    method: "PUT",
    body: parsed.data,
  });

  if (result.success) {
    updateTag(CACHE_TAGS.addresses);
    updateTag(CACHE_TAGS.address(id));
  }

  return result;
}