// features/favorites/constants/favorites.ts
import type {
  FavoriteProduct,
  FavoriteStore,
  PagedFavoriteProducts,
  PagedFavoriteStores,
} from "../types";

export const MOCK_FAVORITE_PRODUCTS: FavoriteProduct[] = [
  {
    productId: "prod-1",
    name: "Organic Honeycrisp Apples (1kg)",
    thumbnailUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    price: 14.50,
    inStock: true,
    favoritedAt: "2026-08-12T10:15:30.000Z",
  },
  {
    productId: "prod-4",
    name: "Grass-Fed Beef Ribeye Steak (300g)",
    thumbnailUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&q=80",
    price: 58.00,
    inStock: true,
    favoritedAt: "2026-08-10T18:42:10.000Z",
  },
  {
    productId: "prod-8",
    name: "Dark Chocolate 85% Cocoa (100g)",
    thumbnailUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
    price: 11.00,
    inStock: true,
    favoritedAt: "2026-08-05T09:20:00.000Z",
  },
  {
    productId: "prod-12",
    name: "Cold-Pressed Organic Matcha Green Tea",
    thumbnailUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80",
    price: 24.00,
    inStock: false,
    favoritedAt: "2026-07-28T14:05:45.000Z",
  },
];

export const MOCK_FAVORITE_STORES: FavoriteStore[] = [
  {
    storeId: "store-101",
    name: "Green Market Express",
    logoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80",
    rating: 4.8,
    favoritedAt: "2026-08-11T12:00:00.000Z",
  },
  {
    storeId: "store-102",
    name: "Artisan Bakery & Roastery",
    logoUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80",
    rating: 4.9,
    favoritedAt: "2026-08-08T16:30:00.000Z",
  },
  {
    storeId: "store-103",
    name: "Prime Meat & Butchery",
    logoUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80",
    rating: 4.6,
    favoritedAt: "2026-07-30T08:15:20.000Z",
  },
];

export const MOCK_PAGED_FAVORITE_PRODUCTS: PagedFavoriteProducts = {
  items: MOCK_FAVORITE_PRODUCTS,
  page: 1,
  pageSize: 10,
  totalCount: MOCK_FAVORITE_PRODUCTS.length,
  hasNextPage: false,
};

export const MOCK_PAGED_FAVORITE_STORES: PagedFavoriteStores = {
  items: MOCK_FAVORITE_STORES,
  page: 1,
  pageSize: 10,
  totalCount: MOCK_FAVORITE_STORES.length,
  hasNextPage: false,
};