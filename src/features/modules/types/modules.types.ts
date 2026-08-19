// features/modules/types/modules.types.ts
export type ModuleBanner = {
  id: string;
  imageUrl: string;
  title?: string;
  actionUrl?: string;
};

export type Category = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type ModuleDetail = {
  id: string;
  name: string;
  iconUrl?: string;
  banners: ModuleBanner[];
  categories: Category[];
};

export type StoreSummary = {
  id: string;
  name: string;
  logoUrl?: string;
  rating: number;
  isFavorite?: boolean;
};

export type PagedStores = {
  items: StoreSummary[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
};