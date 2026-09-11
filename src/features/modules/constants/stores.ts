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
pageNumber:1,
pageSize:12,
totalPages:1,
totalCount:4,
hasPreviousPage:false,
hasNextPage:false
}
 