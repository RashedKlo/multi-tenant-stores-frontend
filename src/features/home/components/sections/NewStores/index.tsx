import { getNewStores } from "@/features/home/api";
import { getTranslations } from "next-intl/server";
import NewStoresEmpty from "./empty";
import { StoreCard } from "./StoreCard";
import NewStoresSkeleton from "./skeleton";

export const NewStores = Object.assign(
  async function NewStores() {
    const t = await getTranslations("home.newStores");
    const result = await getNewStores();

    if (!result.success || result.data.items.length === 0) {
      return <NewStoresEmpty />;
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
  { skeleton: NewStoresSkeleton, empty: NewStoresEmpty },
);
