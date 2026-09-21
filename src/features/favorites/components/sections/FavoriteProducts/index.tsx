// features/favorites/components/sections/FavoriteProducts/index.tsx
import { getFavoriteProducts } from "@/features/favorites/api/get-favorite-products";
import { FavoriteProductsClient } from "./FavoriteProductsClient";
import FavoriteProductsEmpty from "./empty";
import FavoriteProductsSkeleton from "./skeleton";

export const FavoriteProducts = Object.assign(
  async function FavoriteProducts() {
    // const data =MOCK_PAGED_FAVORITE_PRODUCTS;;
    const result = await getFavoriteProducts(1, 20);

    if (!result.success || result.data.items.length === 0) {
      return <FavoriteProductsEmpty />;
    }

    return <FavoriteProductsClient initialData={result.data} />;
  },
  { skeleton: FavoriteProductsSkeleton, empty: FavoriteProductsEmpty },
);