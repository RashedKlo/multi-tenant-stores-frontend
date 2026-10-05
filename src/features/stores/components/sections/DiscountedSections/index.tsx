import { getDiscountedSections } from "@/features/stores/api";
import { DiscountedSectionsClient } from "./DiscountedSectionsClient";
import DiscountedSectionsEmpty from "./empty";
import DiscountedSectionsSkeleton from "./skeleton";

interface DiscountedSectionsProps {
  storeId: string;
}

export const DiscountedSections = Object.assign(
  async function DiscountedSections({ storeId }: DiscountedSectionsProps) {
    const result = await getDiscountedSections({ storeId, page: 1, pageSize: 20 });

    if (!result.success || result.data.totalCount === 0) {
      return <DiscountedSectionsEmpty />;
    }

    return <DiscountedSectionsClient data={result.data} storeId={storeId} />;
  },
  { skeleton: DiscountedSectionsSkeleton, empty: DiscountedSectionsEmpty },
);
