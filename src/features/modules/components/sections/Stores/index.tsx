// features/modules/components/sections/Stores/index.tsx
import { getStoresByModule } from "@/features/modules/api";
import { StoresClient } from "./StoresClient";
import StoresEmpty from "./empty";
import StoresSkeleton from "./skeleton";
import { MOCK_STORES } from "@/features/modules/constants/stores";

interface StoresProps {
  moduleId: string;
  categoryId?: string;
  search?: string;
}

export const Stores = Object.assign(
  async function Stores({ moduleId, categoryId, search }: StoresProps) {
    const data = await getStoresByModule({
      moduleId,
      categoryId,
      search,
      page: 1,
      pageSize: 20,
    });
    // const data=MOCK_STORES;
    if (!data.items.length) {
      return <StoresEmpty />;
    }

    return (
      <StoresClient
        initialData={data}
        moduleId={moduleId}
        categoryId={categoryId}
        search={search}
      />
    );
  },
  { skeleton: StoresSkeleton, empty: StoresEmpty }
);