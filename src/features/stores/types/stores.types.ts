export type StoreDetail = {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  phone?: string;
  rating: number;
  latitude?: number;
  longitude?: number;
  isFavorite?: boolean;
};

export type StoreBanner = {
  id: string;
  imageUrl: string;
  title?: string;
  actionUrl?: string;
};

export type StoreSection = {
  id: string;
  name: string;
  imageUrl?: string;
};



export type PagedStoreSections = {
  items: StoreSection[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
};

export type ProductSummary = {
  id: string;
  name: string;
  thumbnailUrl?: string;
  price: number;
  comparePrice?: number;
  inStock: boolean;
  isFavorite?: boolean;
};
export type PagedProducts = {
  items: ProductSummary[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};