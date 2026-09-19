// app/(main)/modules/[id]/page.tsx
import { Suspense } from "react";
import { ModuleShell } from "@/features/modules/components/ModuleShell";
import { ModuleDetail } from "@/features/modules/components/ModuleDetail";
import { Stores } from "@/features/modules/components/sections/Stores";

import ModuleHeaderSkeleton from "@/features/modules/components/sections/ModuleHeader/skeleton";
import ModuleBannersSkeleton from "@/features/modules/components/sections/ModuleBanners/skeleton";
import CategoriesSkeleton from "@/features/modules/components/sections/Categories/skeleton";
import StoresSkeleton from "@/features/modules/components/sections/Stores/skeleton";

interface ModulePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ categoryId?: string; search?: string }>;
}

export default async function ModulePage({
  params,
  searchParams,
}: ModulePageProps) {
  const { id } = await params;
  const { categoryId, search } = await searchParams;

  return (
    <ModuleShell>
      {/* One Suspense for the whole detail block (fetched once) */}
      <Suspense
        fallback={
          <>
            <ModuleHeaderSkeleton />
            <ModuleBannersSkeleton />
            <CategoriesSkeleton />
          </>
        }
      >
        <ModuleDetail moduleId={id} categoryId={categoryId} />
      </Suspense>

      {/* Stores has its own endpoint → own Suspense */}
    <Suspense
      key={`${categoryId ?? "all"}-${search ?? ""}`}   
     fallback={<StoresSkeleton />}
    >
     <Stores
    moduleId={id}
    categoryId={categoryId}
    search={search}
    />
 
    </Suspense>
    </ModuleShell>
  );
}