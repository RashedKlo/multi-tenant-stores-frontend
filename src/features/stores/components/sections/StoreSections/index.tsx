// features/stores/components/sections/StoreSections/index.tsx
import { getStoreSections } from "@/features/stores/api";
import { StoreSectionsClient } from "./StoreSectionsClient";
import StoreSectionsEmpty from "./empty";
import StoreSectionsSkeleton from "./skeleton";
import { MOCK_STORE_SECTIONS } from "@/features/stores/constants/store-sections";

interface StoreSectionsProps {
  storeId: string;
}

export const StoreSections = Object.assign(
  async function StoreSections({ storeId }: StoreSectionsProps) {


    // const data = await getStoreSections({ storeId, page: 1, pageSize: 30 });
    const data = MOCK_STORE_SECTIONS;

    if (!data.items.length) {
      return <StoreSectionsEmpty />;
    }

    return (
      <StoreSectionsClient
        initialData={data}
        storeId={storeId}
      />
    );
  },
  { skeleton: StoreSectionsSkeleton, empty: StoreSectionsEmpty }
);