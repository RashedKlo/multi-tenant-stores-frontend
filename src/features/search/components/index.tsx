// features/search/components/SearchPage.tsx
import { getModules } from "@/features/home/api";
import { getStoresByModule } from "@/features/modules/api";
import { SearchPageClient } from "./SearchPageClient";
import SearchEmpty from "./empty";

interface SearchPageProps {
  search?: string;
  moduleId?: string;
}

export async function SearchPage({ search, moduleId }: SearchPageProps) {
  const modules = await getModules();

  if (!modules.length) {
    return <SearchEmpty />;
  }

  const defaultModuleId = modules[0].id;
  const selectedModuleId = moduleId ?? defaultModuleId;
  const initialSearch = search ?? "";

  const initialStores = await getStoresByModule({
    moduleId: selectedModuleId,
    search: initialSearch ,
    page: 1,
    pageSize: 20,
  });
  return (
    <SearchPageClient
      modules={modules}
      defaultModuleId={defaultModuleId}
      selectedModuleId={selectedModuleId}
      initialSearch={initialSearch}
      initialStores={initialStores}
    />
  );
}