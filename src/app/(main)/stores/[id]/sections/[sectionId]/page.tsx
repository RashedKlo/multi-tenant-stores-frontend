import { Products } from "@/features/stores/components/sections/Products";
import { isNumber } from "@/shared/lib/format";
import { Suspense } from "react";

// e.g. store/[id]/sections/[sectionId]/page.tsx or wherever Products is rendered
export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; sectionId: string }>;
  searchParams: Promise<{
    inStockOnly?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const { id: storeId, sectionId } = await params;
  const sp = await searchParams;

  const inStockOnly = sp.inStockOnly === "true";
  const minPrice = isNumber(sp.minPrice);
  const maxPrice = isNumber(sp.maxPrice);

  const filterKey = [
    inStockOnly ? "stock" : "all",
    minPrice ?? "min",
    maxPrice ?? "max",
  ].join("-");
  return (
    <>
      <Suspense key={filterKey} fallback={<Products.skeleton />}>
        <Products
          sectionId={sectionId}
          storeId={storeId}
          inStockOnly={inStockOnly}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </Suspense>
    </>
  );
}

