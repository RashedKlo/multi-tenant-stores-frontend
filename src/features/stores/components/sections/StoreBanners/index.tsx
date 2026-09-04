// features/stores/components/Banners/StoreBanners/index.tsx
import { getStoreBanners } from "@/features/stores/api";
import { StoreBannersClient } from "./StoreBannersClient";
import StoreBannersEmpty from "./empty";
import StoreBannersSkeleton from "./skeleton";
import { MOCK_STORE_BANNERS } from "@/features/stores/constants/store-banners";

interface StoreBannersProps {
  storeId: string;
}

export const StoreBanners = Object.assign(
  async function StoreBanners({ storeId }: StoreBannersProps) {
    // const banners = MOCK_STORE_BANNERS;
    const banners = await getStoreBanners(storeId);

    if (!banners.length) {
      return <StoreBannersEmpty />;
    }

    return (
      <StoreBannersClient
        banners={banners}
      />
    );
  },
  { skeleton: StoreBannersSkeleton, empty: StoreBannersEmpty }
);