// features/modules/constants/stores.ts
import type { PagedStores } from "../types";

export const MOCK_STORES: PagedStores =
{
  items:[
  {
    id: "s1",
    name: "Green Market",
    logoUrl: undefined,
    rating: 4.6,
  },
  {
    id: "s2",
    name: "City Hyper",
    logoUrl: undefined,
    rating: 4.2,
  },
  {
    id: "s3",
    name: "Fresh Corner",
    logoUrl: undefined,
    rating: 4.8,
  },
],
page:1,
pageSize:12,
totalCount:4,
hasNextPage:false
}
 