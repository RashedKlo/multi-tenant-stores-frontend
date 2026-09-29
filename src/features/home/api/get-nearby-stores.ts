// features/modules/api/get-nearby-stores.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { REVALIDATE } from "@/shared/config/cache";
import { PagedNearbyStores } from "../types/home.types";

export async function getNearbyStores(input: {
  lat: number; lng: number; radiusKm?: number; page?: number; pageSize?: number;
}): Promise<Result<PagedNearbyStores>> {
  const params = new URLSearchParams({
    Latitude: String(input.lat),
    Longitude: String(input.lng),
    RadiusKm: String(input.radiusKm ?? 10),
    Page: String(input.page ?? 1),
    PageSize: String(input.pageSize ?? 10),
  });
  const result = await fetchJson<PagedNearbyStores>(`/api/stores/nearby?${params}`, {
    next: { revalidate: REVALIDATE.minute },
  });
  console.log("getNearbyStores result", result);
  return result;
}