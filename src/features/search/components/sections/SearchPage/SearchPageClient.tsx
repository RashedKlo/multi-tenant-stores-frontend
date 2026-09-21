"use client";

import { useTranslations } from "next-intl";
import type { Module, PagedStores } from "@/features/search/types";
import { ModuleTabsClient } from "../ModuleTabs/ModuleTabsClient";
import { StoresResultsClient } from "../StoresResults/StoresResultsClient";

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
  const t = useTranslations("search");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <ModuleTabsClient
        modules={modules}
        selectedId={selectedModuleId}
        search={initialSearch}
      />

      <StoresResultsClient
        key={selectedModuleId + "|" + initialSearch}
        moduleId={selectedModuleId}
        initialQuery={initialSearch}
        initialData={initialStores}
      />
    </div>
  );
}