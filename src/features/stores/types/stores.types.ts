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

export type StoreCoupon = {
  id: string;
  code: string;
  discountType: number;
  discountValue: number;
  maxDiscountAmount?: number | null;
  minOrderAmount: number;
  startsAt: string;
  expiresAt?: string | null;
};

export type DiscountedSection = {
  id: string;
  name: string;
  imageUrl?: string | null;
  discount: {
    id: string;
    type: string;
    value: number;
    endsAt?: string | null;
    source: string;
  };
};

export type PagedStoreSections = {
  items: StoreSection[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
};

export type PagedDiscountedSections = {
  items: DiscountedSection[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type DiscountedProduct = {
  id: string;
  name: string;
  thumbnailUrl?: string | null;
  price: number;
  finalPrice: number;
  comparePrice?: number | null;
  inStock: boolean;
  discount: {
    id: string;
    type: string;
    value: number;
    endsAt?: string | null;
    source: string;
  };
};

export type PagedDiscountedProducts = {
  items: DiscountedProduct[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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