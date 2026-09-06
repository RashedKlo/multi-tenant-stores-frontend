// src/features/cart/constants/mock-cart.ts
import type { CartItem } from "../types/cart.types";
const STORE_ID = "11111111-1111-1111-1111-111111111111";
const CART_ID = "22222222-2222-2222-2222-222222222222";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    cartItemId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    cartId: CART_ID,
    storeId: STORE_ID,
    productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    productName: "Chicken Shawarma Wrap",
    productImage: "https://example.com/images/chicken-shawarma.jpg",
    basePrice: 25000,
    quantity: 2,
    notes: "Extra garlic sauce",
    selectedOptions: [
      {
        optionId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        groupName: "Size",
        optionName: "Large",
        priceAdjustment: 5000,
      },
      {
        optionId: "dddddddd-dddd-dddd-dddd-dddddddddddd",
        groupName: "Extras",
        optionName: "Cheese",
        priceAdjustment: 3000,
      },
    ],
    itemTotalPrice: 66000,
  },
  {
    cartItemId: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    cartId: CART_ID,
    storeId: STORE_ID,
    productId: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    productName: "Fresh Orange Juice",
    productImage: "https://example.com/images/fresh-orange-juice.jpg",
    basePrice: 12000,
    quantity: 1,
    notes: null,
    selectedOptions: [
      {
        optionId: "99999999-9999-9999-9999-999999999999",
        groupName: "Size",
        optionName: "Medium",
        priceAdjustment: 0,
      },
    ],
    itemTotalPrice: 12000,
  },
];


