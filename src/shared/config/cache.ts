export const CACHE_TAGS = {
  homeBanners: "home-banners",
  modules: "modules",
  addresses: "addresses",
  address: (id: string) => `addresses${id}`,
  cart: "cart",
  profile: "profile",
  storeDetail: (id: string) => `stores${id}`,
  storeBanners: (id: string) => `stores${id}banners`,
  storeSections: (id: string) => `stores${id}sections`,
  sectionProducts: (id: string) => `sections${id}products`,
  moduleDetail: (id: string) => `modules${id}`,
  moduleStores: (id: string) => `modules${id}stores`,
  supportConversations: "support-conversations",
  supportMessages: (conversationId: string) => `support-messages-${conversationId}`,
} as const;

export const REVALIDATE = {
  hour: 3600,
  minute: 60,
} as const;