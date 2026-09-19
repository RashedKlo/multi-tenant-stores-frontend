// features/favorites/components/sections/FavoriteStores/index.tsx
import { getFavoriteStores } from "@/features/favorites/api/get-favorite-stores";
import { FavoriteStoresClient } from "./FavoriteStoresClient";
import FavoriteStoresEmpty from "./empty";
import FavoriteStoresSkeleton from "./skeleton";

export const FavoriteStores = Object.assign(
  async function FavoriteStores() {
    // const data = MOCK_PAGED_FAVORITE_STORES;
    const data = await getFavoriteStores(1, 20);

    if (!data.items.length) {
      return <FavoriteStoresEmpty />;
    }

    return <FavoriteStoresClient initialData={data} />;
  },
  { skeleton: FavoriteStoresSkeleton, empty: FavoriteStoresEmpty },
);