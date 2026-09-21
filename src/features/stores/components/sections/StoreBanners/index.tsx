// features/stores/components/Banners/StoreBanners/index.tsx
import { getStoreBanners } from "@/features/stores/api";
import { StoreBannersClient } from "./StoreBannersClient";
import StoreBannersEmpty from "./empty";
import StoreBannersSkeleton from "./skeleton";

interface StoreBannersProps {
  storeId: string;
}

export const StoreBanners = Object.assign(
  async function StoreBanners({ storeId }: StoreBannersProps) {
    // const banners = MOCK_STORE_BANNERS;
    const result = await getStoreBanners(storeId);

    if (!result.success || result.data.length==0) {
      return <StoreBannersEmpty />;
    }

    return (
      <StoreBannersClient
        banners={result.data}
      />
    );
  },
  { skeleton: StoreBannersSkeleton, empty: StoreBannersEmpty }
);