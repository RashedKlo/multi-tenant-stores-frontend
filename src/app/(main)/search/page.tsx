// app/(main)/search/page.tsx
import { Suspense } from "react";
import { SearchShell, SearchPage, SearchSkeleton } from "@/features/search";

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