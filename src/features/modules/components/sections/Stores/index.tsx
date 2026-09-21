// features/modules/components/sections/Stores/index.tsx
import { getStoresByModule } from "@/features/modules/api";
import { StoresClient } from "./StoresClient";
import StoresEmpty from "./empty";
import StoresSkeleton from "./skeleton";

interface StoresProps {
  moduleId: string;
  categoryId?: string;
  search?: string;
}

export const Stores = Object.assign(
  async function Stores({ moduleId, categoryId, search }: StoresProps) {
    const result = await getStoresByModule({
      moduleId,
      categoryId,
      search,
      page: 1,
      pageSize: 20,
    });
    // const result=MOCK_STORES;
    if (!result.success || result.data.items.length === 0) {
      return <StoresEmpty />;
    }

    return (
      <StoresClient
        initialData={result.data}
        moduleId={moduleId}
        categoryId={categoryId}
        search={search}
      />
    );
  },
  { skeleton: StoresSkeleton, empty: StoresEmpty }
);