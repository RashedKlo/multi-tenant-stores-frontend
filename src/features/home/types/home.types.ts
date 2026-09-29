import { StoreSummary } from "@/features/modules/types/modules.types";

export type HomeBanner = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  actionUrl?: string;
};

export type Module = {
  id: string;
  name: string;
  iconUrl?: string;
};

export type NearByStore = {
  id: string;
  name: string;
  logoUrl?: string;
  rating: number;
  distanceKm: number;
};

export type PagedNearbyStores = {
  items: NearByStore[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type NewStore = {
  id: string;
  name: string;
  logoUrl?: string | null;

};

export type PagedNewStores = {
  items: NewStore[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type DiscountedStore = {
  id: string;
  name: string;
  logoUrl?: string | null;
  rating: number;
  maxPercentageOff?: number | null;
};

export type PagedDiscountedStores = {
  items: DiscountedStore[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
