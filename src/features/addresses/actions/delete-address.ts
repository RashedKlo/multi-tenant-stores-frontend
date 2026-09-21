// features/addresses/actions/delete-address.ts
"use server";

import {  updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";

export async function deleteAddressAction(
  id: string
): Promise<Result<void>> {
  const result = await fetchJson<void>(`/api/addresses/${id}`, {
    method: "DELETE",
  });

  if (result.success) {
    updateTag(CACHE_TAGS.addresses);
    updateTag(CACHE_TAGS.address(id));
  }


  return result;
}