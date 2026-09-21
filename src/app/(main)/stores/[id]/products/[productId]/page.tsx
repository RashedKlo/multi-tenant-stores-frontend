// app/(main)/products/[storeId]/products/[productId]/page.tsx
import { Suspense } from "react";
import {
  ProductShell,
  ProductDetail,
  ProductDetailSkeleton,
} from "@/features/products";

interface ProductPageProps {
  params: Promise<{ id: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: storeId, productId } = await params;

  return (
    <ProductShell>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail productId={productId} storeId={storeId} />
      </Suspense>
    </ProductShell>
  );
}