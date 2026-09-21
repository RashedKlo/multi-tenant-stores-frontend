// features/stores/components/sections/StoreSections/index.tsx
import { getStoreSections } from "@/features/stores/api";
import { StoreSectionsClient } from "./StoreSectionsClient";
import StoreSectionsEmpty from "./empty";
import StoreSectionsSkeleton from "./skeleton";

interface StoreSectionsProps {
  storeId: string;
}

export const StoreSections = Object.assign(
  async function StoreSections({ storeId }: StoreSectionsProps) {


    const result = await getStoreSections({ storeId, page: 1, pageSize: 30 });
    // const data = MOCK_STORE_SECTIONS;

    if (!result.success) {
      return <StoreSectionsEmpty />;
    }

    return (
      <StoreSectionsClient
        initialData={result.data}
        storeId={storeId}
      />
    );
  },
  { skeleton: StoreSectionsSkeleton, empty: StoreSectionsEmpty }
);