// app/(main)/stores/[storeId]/sections/[sectionId]/page.tsx
import { Suspense } from "react";
import { StoreShell } from "@/features/stores/components/StoreShell";
import { Products } from "@/features/stores/components/sections/Products";
import ProductsSkeleton from "@/features/stores/components/sections/Products/skeleton";

interface SectionProductsPageProps {
  params: Promise<{ id: string; sectionId: string }>;
  searchParams: Promise<{
    inStockOnly?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function SectionProductsPage({
  params,
  searchParams,
}: SectionProductsPageProps) {
  const { id, sectionId } = await params;
  const { inStockOnly, minPrice, maxPrice } = await searchParams;

  return (
    <StoreShell>
      <Suspense fallback={<ProductsSkeleton />}>
        <Products
          sectionId={sectionId}
          storeId={id}
          inStockOnly={inStockOnly === "true"}
          minPrice={minPrice ? Number(minPrice) : undefined}
          maxPrice={maxPrice ? Number(maxPrice) : undefined}
        />
      </Suspense>
    </StoreShell>
  );
}