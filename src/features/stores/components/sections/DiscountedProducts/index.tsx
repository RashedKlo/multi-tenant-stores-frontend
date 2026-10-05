import { getDiscountedProducts } from "@/features/stores/api";
import { DiscountedProductsClient } from "./DiscountedProductsClient";
import DiscountedProductsEmpty from "./empty";
import DiscountedProductsSkeleton from "./skeleton";

interface DiscountedProductsProps {
  storeId: string;
}

export const DiscountedProducts = Object.assign(
  async function DiscountedProducts({ storeId }: DiscountedProductsProps) {
    const result = await getDiscountedProducts({ storeId, page: 1, pageSize: 20 });

    if (!result.success || result.data.totalCount === 0) {
      return <DiscountedProductsEmpty />;
    }

    return <DiscountedProductsClient data={result.data} storeId={storeId} />;
  },
  { skeleton: DiscountedProductsSkeleton, empty: DiscountedProductsEmpty },
);
