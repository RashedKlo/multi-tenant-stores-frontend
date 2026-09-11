// features/search/components/SearchPageClient.tsx
"use client";

import type { Module, PagedStores } from "@/features/search/types";
import { ModuleTabs } from "./ModuleTabs";
import { StoresResults } from "./StoresResults";

interface SearchPageClientProps {
  modules: Module[];
  defaultModuleId: string;
  selectedModuleId: string;
  initialSearch: string;
  initialStores: PagedStores;
}

export function SearchPageClient({
  modules,
  defaultModuleId,
  selectedModuleId,
  initialSearch,
  initialStores,
}: SearchPageClientProps) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a category then search stores
        </p>
      </div>

      <ModuleTabs
        modules={modules}
        selectedId={selectedModuleId}
        search={initialSearch}
      />

      <StoresResults
        key={selectedModuleId + "|" + initialSearch}
        moduleId={selectedModuleId}
        initialQuery={initialSearch}
        initialData={initialStores}
      />
    </div>
  );
}