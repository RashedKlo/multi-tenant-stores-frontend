// shared/config/cache.ts
export const CACHE_TAGS = {
  homeBanners: "home-banners",
  modules: "modules",
  cart:"cart",
  moduleDetail:(id:string)=>"modules"+id,
  moduleStores:(id:string)=>"modules"+id+"stores",
} as const;

export const REVALIDATE = {
  hour: 3600,
  minute:60
} as const;