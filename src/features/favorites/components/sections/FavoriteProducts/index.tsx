// features/favorites/components/sections/FavoriteProducts/index.tsx
import { getFavoriteProducts } from "@/features/favorites/api/get-favorite-products";
import { FavoriteProductsClient } from "./FavoriteProductsClient";
import FavoriteProductsEmpty from "./empty";
import FavoriteProductsSkeleton from "./skeleton";

export const FavoriteProducts = Object.assign(
  async function FavoriteProducts() {
    // const data =MOCK_PAGED_FAVORITE_PRODUCTS;;
    const data = await getFavoriteProducts(1, 20);

    if (!data.items.length) {
      return <FavoriteProductsEmpty />;
    }

    return <FavoriteProductsClient initialData={data} />;
  },
  { skeleton: FavoriteProductsSkeleton, empty: FavoriteProductsEmpty },
);