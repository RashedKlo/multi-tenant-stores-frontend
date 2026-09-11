// app/(main)/search/page.tsx
import { Suspense } from "react";
import { SearchShell } from "@/features/search/components/SearchShell";
import { SearchPage } from "@/features/search/components/index";
import SearchSkeleton from "@/features/search/components/skeleton";

interface SearchRouteProps {
  searchParams: Promise<{ moduleId?: string; search?: string }>;
}

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const params = await searchParams;
  return (
    <SearchShell>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchPage search={params.search} moduleId={params.moduleId} />
      </Suspense>
    </SearchShell>
  );
}