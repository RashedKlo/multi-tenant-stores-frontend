// features/favorites/components/sections/FavoriteStores/index.tsx
import { getFavoriteStores } from "@/features/favorites/api/get-favorite-stores";
import { FavoriteStoresClient } from "./FavoriteStoresClient";
import FavoriteStoresEmpty from "./empty";
import FavoriteStoresSkeleton from "./skeleton";

export const FavoriteStores = Object.assign(
  async function FavoriteStores() {
    // const data = MOCK_PAGED_FAVORITE_STORES;
    const result = await getFavoriteStores(1, 20);

    if (!result.success || result.data.items.length === 0) {
      return <FavoriteStoresEmpty />;
    }

    return <FavoriteStoresClient initialData={result.data} />;
  },
  { skeleton: FavoriteStoresSkeleton, empty: FavoriteStoresEmpty },
);