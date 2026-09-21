import { getModules } from "@/features/home/api";
import { getStoresByModule } from "@/features/modules/api";
import { SearchPageClient } from "./SearchPageClient";
import SearchEmpty from "./empty";
import { StoresResultsEmpty } from "../StoresResults/empty";

interface SearchPageProps {
  search?: string;
  moduleId?: string;
}

export async function SearchPage({ search, moduleId }: SearchPageProps) {
  const result = await getModules();

  if (!result.success || result.data.length==0) {
    return <SearchEmpty />;
  }

  const defaultModuleId = result.data[0].id;
  const selectedModuleId = moduleId ?? defaultModuleId;
  const initialSearch = search ?? "";

  const resultStores = await getStoresByModule({
    moduleId: selectedModuleId,
    search: initialSearch,
    page: 1,
    pageSize: 20,
  });
if(!resultStores.success || resultStores.data.items.length==0) {
    return <StoresResultsEmpty />;
  }

  return (
    <SearchPageClient
      modules={result.data}
      defaultModuleId={defaultModuleId}
      selectedModuleId={selectedModuleId}
      initialSearch={initialSearch}
      initialStores={resultStores.data}
    />
  );
}