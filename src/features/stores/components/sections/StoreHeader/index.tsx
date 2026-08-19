// features/stores/components/Details/StoreDetails/index.tsx
import { getStoreDetail } from "@/features/stores/api";
import { StoreHeaderClient } from "./StoreHeaderClient";
import StoreHeaderEmpty from "./empty";
import StoreHeaderSkeleton from "./skeleton";
import { MOCK_STORE_DETAIL } from "@/features/stores/constants/store-detail";

interface StoreDetailsProps {
  storeId: string;
}

export const StoreHeader = Object.assign(
  async function StoreDetails({ storeId }: StoreDetailsProps) {
    const storeDetails =MOCK_STORE_DETAIL;
    // const storeDetails = await getStoreDetail(storeId);

    if (!storeDetails) {
      return <StoreHeaderEmpty />;
    }

    return (
      <StoreHeaderClient
        store={storeDetails}
      />
    );
  },
  { skeleton: StoreHeaderSkeleton, empty: StoreHeaderEmpty }
);