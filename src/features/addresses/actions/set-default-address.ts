// features/addresses/actions/set-default-address.ts
"use server";

import { revalidateTag, updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Address } from "../types";

export async function setDefaultAddressAction(
  id: string
): Promise<Result<Address>> {
  const result = await fetchJson<Address>(`/api/addresses/${id}/set-default`, {
    method: "POST",
  });

  if (result.success) {
    updateTag(CACHE_TAGS.addresses);
    updateTag(CACHE_TAGS.address(id));
  }

  return result;
}