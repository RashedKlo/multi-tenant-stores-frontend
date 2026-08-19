import { Suspense } from "react";
import { HomeShell } from "@/features/home/components/HomeShell";
import { Banners } from "@/features/home/components/sections/Banners";
import { Modules } from "@/features/home/components/sections/Modules";

/**
 * /home — composition only.
 * No fetch, no business logic.
 */
export default async function HomePage() {

  return (
    <HomeShell >
      <Suspense fallback={<Banners.skeleton />}>
        <Banners />
      </Suspense>

      <Suspense fallback={<Modules.skeleton />}>
        <Modules />
      </Suspense>
    </HomeShell>
  );
}