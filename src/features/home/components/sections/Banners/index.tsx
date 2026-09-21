import { getHomeBanners } from "@/features/home/api";
import { BannersClient } from "./BannersClient";
import BannerEmpty from "./empty";
import BannerSkeleton from "./skeleton";

/**
 * Server entry for home banners.
 * Fetches data → empty guard → pure client UI.
 */
export const Banners = Object.assign(
  async function Banners() {
    //fetch Backend Data
    const result = await getHomeBanners();
    
    //fetch Mock Data
    // const banners = MOCK_BANNERS;



    if (!result.success || result.data.length === 0) {
      return <BannerEmpty />;
    }

    return <BannersClient banners={result.data} />
  },
  { skeleton: BannerSkeleton, empty: BannerEmpty }
);