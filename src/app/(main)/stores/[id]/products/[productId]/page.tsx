// app/(main)/products/[storeId]/products/[productId]/page.tsx
import { Suspense } from "react";
import { ProductShell } from "@/features/products/components/ProductShell";
import { ProductDetail } from "@/features/products/components/sections/index";
import ProductDetailSkeleton from "@/features/products/components/sections/skeleton";

interface ProductPageProps {
  params: Promise<{ storeId: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { storeId, productId } = await params;

  return (
    <ProductShell>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail productId={productId} storeId={storeId} />
      </Suspense>
    </ProductShell>
  );
}