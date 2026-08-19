// features/favorites/components/sections/FavoriteProducts/index.tsx
import { FavoriteProductsClient } from "./FavoriteProductsClient";
import FavoriteProductsEmpty from "./empty";
import FavoriteProductsSkeleton from "./skeleton";
import { MOCK_FAVORITE_PRODUCTS, MOCK_PAGED_FAVORITE_PRODUCTS, MOCK_PAGED_FAVORITE_STORES } from "@/features/favorites/constants/favorites";

export const FavoriteProducts = Object.assign(
  async function FavoriteProducts() {
    const data =MOCK_PAGED_FAVORITE_PRODUCTS;;
    // const data = await getFavoriteProducts(1, 20);

    if (!data.items.length) {
      return <FavoriteProductsEmpty />;
    }

    return <FavoriteProductsClient initialData={data} />;
  },
  { skeleton: FavoriteProductsSkeleton, empty: FavoriteProductsEmpty }
);