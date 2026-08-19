import { getHomeBanners } from "@/features/home/api";
import { BannersClient } from "./BannersClient";
import BannerEmpty from "./empty";
import BannerSkeleton from "./skeleton";
import { MOCK_BANNERS } from "@/features/home/constants/banners";

/**
 * Server entry for home banners.
 * Fetches data → empty guard → pure client UI.
 */
export const Banners = Object.assign(
  async function Banners() {
    //fetch Backend Data
    const banners = await getHomeBanners();
    
    //fetch Mock Data
    // const banners = MOCK_BANNERS;


    if (!banners.length) {
      return <BannerEmpty />;
    }

    return <BannersClient banners={banners} />;
  },
  { skeleton: BannerSkeleton, empty: BannerEmpty }
);