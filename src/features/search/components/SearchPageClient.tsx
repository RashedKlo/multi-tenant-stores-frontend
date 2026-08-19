// features/search/components/SearchPageClient.tsx
"use client";

import { useState } from "react";
import type { Module, PagedStores } from "@/features/search/types";
import { ModuleTabs } from "./ModuleTabs";
import { StoresResults } from "./StoresResults";

interface SearchPageClientProps {
  modules: Module[];
  defaultModuleId: string;
  initialStores: PagedStores;
}

export function SearchPageClient({
  modules,
  defaultModuleId,
  initialStores,
}: SearchPageClientProps) {
  const [selectedModuleId, setSelectedModuleId] = useState(defaultModuleId);

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
        onSelect={setSelectedModuleId}
      />

      {/* Key forces remount when module changes → clean state */}
      <StoresResults
        key={selectedModuleId}
        moduleId={selectedModuleId}
        initialData={
          selectedModuleId === defaultModuleId
            ? initialStores
            : { items: [], page: 1, pageSize: 20, totalCount: 0, hasNextPage: false }
        }
      />
    </div>
  );
}