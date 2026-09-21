// features/stores/components/Details/StoreDetails/index.tsx
import { getStoreDetail } from "@/features/stores/api";
import { StoreHeaderClient } from "./StoreHeaderClient";
import StoreHeaderEmpty from "./empty";
import StoreHeaderSkeleton from "./skeleton";

interface StoreDetailsProps {
  storeId: string;
}

export const StoreHeader = Object.assign(
  async function StoreDetails({ storeId }: StoreDetailsProps) {
    // const storeDetails =MOCK_STORE_DETAIL;
    const result = await getStoreDetail(storeId);

    if (!result.success) {
      return <StoreHeaderEmpty />;
    }

    return (
      <StoreHeaderClient
        store={result.data}
      />
    );
  },
  { skeleton: StoreHeaderSkeleton, empty: StoreHeaderEmpty }
);