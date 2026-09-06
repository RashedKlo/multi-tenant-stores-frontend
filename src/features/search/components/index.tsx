// features/search/components/SearchPage.tsx
import { getModules } from "@/features/home/api";
import { getStoresByModule } from "@/features/modules/api";
import { SearchPageClient } from "./SearchPageClient";
import SearchEmpty from "./empty";
import { MOCK_MODULES } from "@/features/home/constants/modules";
import { MOCK_STORES } from "@/features/modules/constants/stores";

export async function SearchPage() {
  const modules = await getModules();
  // const modules=MOCK_MODULES;

  if (!modules.length) {
    return <SearchEmpty />;
  }

  // Default = first module
  const defaultModuleId = modules[0].id;

  const initialStores = await getStoresByModule({
    moduleId: defaultModuleId,
    page: 1,
    pageSize: 20,
  });
// const initialStores=MOCK_STORES;
  return (
    <SearchPageClient
      modules={modules}
      defaultModuleId={defaultModuleId}
      initialStores={initialStores}
    />
  );
}