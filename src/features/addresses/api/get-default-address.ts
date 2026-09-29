import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { Result } from "@/shared/lib/result";

export type DefaultAddressLocation = {
  id: string;
  latitude: number;
  longitude: number;
};

export async function getDefaultAddress(): Promise<Result<DefaultAddressLocation>> {
  return fetchJson<DefaultAddressLocation>("/api/addresses/default", {
    next: {
      revalidate: REVALIDATE.minute * 5,
      tags: [CACHE_TAGS.addresses],
    },
  });
}