// app/(main)/search/page.tsx
import { Suspense } from "react";
import { SearchShell } from "@/features/search/components/SearchShell";
import { SearchPage } from "@/features/search/components/index";
import SearchSkeleton from "@/features/search/components/skeleton";

export default function SearchRoute() {
  return (
    <SearchShell>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchPage />
      </Suspense>
    </SearchShell>
  );
}