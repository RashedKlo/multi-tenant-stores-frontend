import { Suspense } from "react";
import { HomeShell } from "@/features/home/components/HomeShell";
import { Banners } from "@/features/home/components/sections/Banners";
import { Modules } from "@/features/home/components/sections/Modules";
import { DiscountedStores } from "@/features/home/components/sections/DiscountedStores";
import { NearbyStores } from "@/features/home/components/sections/NearbyStores";
import { NewStores } from "@/features/home/components/sections/NewStores";

/**
 * /home — composition only.
 * No fetch, no business logic.
 */
export default async function HomePage() {
  return (
    <HomeShell>
      <Suspense fallback={<Banners.skeleton />}>
        <Banners />
      </Suspense>

      <Suspense fallback={<Modules.skeleton />}>
        <Modules />
      </Suspense>
      <Suspense fallback={<NearbyStores.skeleton />}>
        <NearbyStores />
      </Suspense>

      <Suspense fallback={<NewStores.skeleton />}>
        <NewStores />
      </Suspense>

      <Suspense fallback={<DiscountedStores.skeleton />}>
        <DiscountedStores />
      </Suspense>

      
    </HomeShell>
  );
}