// features/stores/constants/store-banners.ts
import type { StoreBanner } from "../types";

export const MOCK_STORE_BANNERS: StoreBanner[] = [
  {
    id: "sb1",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80",
    title: "Fresh Organic Produce - 20% Off Today",
    actionUrl: "/promotions/organic-fresh",
  },
  {
    id: "sb2",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80",
    title: "Free Delivery on Orders Over 50 SAR",
    actionUrl: "/promotions/free-shipping",
  },
  {
    id: "sb3",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    title: "Daily Fresh Bakery Specials",
    actionUrl: "/sections/bakery",
  },
];