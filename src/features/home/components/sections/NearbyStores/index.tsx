import { getDefaultAddress } from "@/features/addresses/api";
import { getNearbyStores } from "@/features/home/api/get-nearby-stores";
import { getUserLocation } from "@/shared/lib/http/token-storage";
import { getTranslations } from "next-intl/server";
import { LocationPrompt } from "./LocationPrompt";
import NearbyStoresEmpty from "./empty";
import { StoreCard } from "./StoreCard";
import NearbyStoresSkeleton from "./skeleton";

export const NearbyStores = Object.assign(
  async function NearbyStores() {
    const t = await getTranslations("home.nearbyStores");
    const defaultAddressResult = await getDefaultAddress();
    const savedLocation = defaultAddressResult.success
      ? null
      : await getUserLocation();

    const location =
      defaultAddressResult.success
        ? {
            lat: defaultAddressResult.data.latitude,
            lng: defaultAddressResult.data.longitude,
          }
        : savedLocation;

    if (!location) return <LocationPrompt />;

    const result = await getNearbyStores({
      lat: location.lat,
      lng: location.lng,
    });

    if (!result.success || result.data.items.length === 0) {
      return <NearbyStoresEmpty />;
    }

    return (
      <section className="space-y-3">
        <h2 className="px-4 text-base font-semibold sm:px-0">{t("title")}</h2>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-1 sm:px-0">
          {result.data.items.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    );
  },
  { skeleton: NearbyStoresSkeleton, empty: NearbyStoresEmpty },
);