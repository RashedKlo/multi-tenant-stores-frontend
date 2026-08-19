// features/favorites/types/favorites.types.ts
export type FavoriteProduct = {
  productId: string;
  name: string;
  thumbnailUrl?: string;
  price: number;
  inStock: boolean;
  favoritedAt: string; // ISO date
};

export type FavoriteStore = {
  storeId: string;
  name: string;
  logoUrl?: string;
  rating: number;
  favoritedAt: string;
};

export type PagedFavoriteProducts = {
  items: FavoriteProduct[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
};

export type PagedFavoriteStores = {
  items: FavoriteStore[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
};