// features/stores/components/sections/Products/index.tsx
import { getProductsBySection } from "@/features/stores/api";
import { ProductsClient } from "./ProductsClient";
import ProductsEmpty from "./empty";
import ProductsSkeleton from "./skeleton";

interface ProductsProps {
  sectionId: string;
  storeId: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export const Products = Object.assign(
  async function Products({
    sectionId,
    storeId,
    inStockOnly,
    minPrice,
    maxPrice,
  }: ProductsProps) {
    const data = await getProductsBySection({
      sectionId,
      inStockOnly,
      minPrice,
      maxPrice,
      page: 1,
      pageSize: 20,
    });
    if (!data.items.length) {
      return <ProductsEmpty />;
    }

    return (
      <ProductsClient
        initialData={data}
        sectionId={sectionId}
        storeId={storeId}
        inStockOnly={inStockOnly}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    );
  },
  { skeleton: ProductsSkeleton, empty: ProductsEmpty }
);