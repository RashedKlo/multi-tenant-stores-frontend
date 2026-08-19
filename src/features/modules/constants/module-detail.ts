// features/modules/constants/module-detail.ts
import type { ModuleDetail } from "../types";

export const MOCK_MODULE_DETAIL: ModuleDetail = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Markets",
  iconUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80",
  banners: [
    {
      id: "b1",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      title: "Fresh daily deals",
      actionUrl: "/offers",
    },
  ],
  categories: [
    { id: "c1", name: "Vegetables", imageUrl: undefined },
    { id: "c2", name: "Fruits", imageUrl: undefined },
    { id: "c3", name: "Dairy", imageUrl: undefined },
    { id: "c4", name: "Bakery", imageUrl: undefined },
  ],
};