// app/(main)/stores/[id]/page.tsx
import { Suspense } from "react";
import { StoreShell } from "@/features/stores/components/StoreShell";
import { StoreHeader } from "@/features/stores/components/sections/StoreHeader";
import { StoreBanners } from "@/features/stores/components/sections/StoreBanners";
import { StoreSections } from "@/features/stores/components/sections/StoreSections";

import StoreHeaderSkeleton from "@/features/stores/components/sections/StoreHeader/skeleton";
import StoreBannersSkeleton from "@/features/stores/components/sections/StoreBanners/skeleton";
import StoreSectionsSkeleton from "@/features/stores/components/sections/StoreSections/skeleton";

interface StorePageProps {
  params: Promise<{ id: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const { id } = await params;

  return (
    <StoreShell>
      <Suspense fallback={<StoreHeaderSkeleton/>}>
        <StoreHeader storeId={id}/>
      </Suspense>
       <Suspense fallback={<StoreBannersSkeleton/>}>
        <StoreBanners storeId={id}/>
      </Suspense>

      <Suspense fallback={<StoreSectionsSkeleton />}>
        <StoreSections storeId={id} />
      </Suspense>
    </StoreShell>
  );
}