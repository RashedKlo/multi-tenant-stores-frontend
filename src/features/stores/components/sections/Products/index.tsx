// features/stores/components/sections/Products/index.tsx
import { getProductsBySection } from "@/features/stores/api";
import { ProductsClient } from "./ProductsClient";
import ProductsEmpty from "./empty";
import ProductsSkeleton from "./skeleton";
import { MOCK_PAGED_PRODUCTS } from "@/features/stores/constants/products";

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
    // const data = await getProductsBySection({
    //   sectionId,
    //   inStockOnly,
    //   minPrice,
    //   maxPrice,
    //   page: 1,
    //   pageSize: 20,
    // });
    const data=MOCK_PAGED_PRODUCTS;

    if (!data.items.length) {
      return <ProductsEmpty />;
    }

    return (
      <ProductsClient
        initialData={data}
        sectionId={sectionId}
        storeId={storeId}
   
      />
    );
  },
  { skeleton: ProductsSkeleton, empty: ProductsEmpty }
);