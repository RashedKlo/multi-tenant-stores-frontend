import { getStoreCoupons } from "@/features/stores/api";
import { StoreCouponsClient } from "./StoreCouponsClient";
import StoreCouponsEmpty from "./empty";
import StoreCouponsSkeleton from "./skeleton";

interface StoreCouponsProps {
  storeId: string;
}

export const StoreCoupons = Object.assign(
  async function StoreCoupons({ storeId }: StoreCouponsProps) {
    const result = await getStoreCoupons(storeId);

    if (!result.success || result.data.length === 0) {
      return <StoreCouponsEmpty />;
    }

    return <StoreCouponsClient coupons={result.data} />;
  },
  { skeleton: StoreCouponsSkeleton, empty: StoreCouponsEmpty },
);
