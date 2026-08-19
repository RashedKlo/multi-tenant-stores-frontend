import type { HomeBanner } from "../types/home.types";

export const MOCK_BANNERS: HomeBanner[] = [
  {
    id: "1",
    title: "Summer Collection",
    subtitle: "Up to 50% off",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    actionUrl: "/offers/summer",
  },
  {
    id: "2",
    title: "Fresh Markets",
    subtitle: "Daily deals near you",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    actionUrl: "/modules/markets",
  },
  {
    id: "3",
    title: "Pharmacy Essentials",
    subtitle: "Fast delivery",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
    actionUrl: "/modules/pharmacies",
  },
];