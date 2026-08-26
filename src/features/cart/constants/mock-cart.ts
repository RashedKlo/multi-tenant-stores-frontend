// src/features/cart/constants/mock-cart.ts
import type { Cart, CartItem } from "../types";

/** Fixed IDs for stable demos / Storybook / empty-state tests */
const STORE_ID = "11111111-1111-1111-1111-111111111111";
const CART_ID = "22222222-2222-2222-2222-222222222222";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    cartItemId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    cartId: CART_ID,
    productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    productNameEn: "Chicken Shawarma Wrap",
    productNameAr: "ساندويش شاورما دجاج",
    basePrice: 25000,
    quantity: 2,
    notes: "Extra garlic sauce",
    selectedOptions: [
      {
        optionId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        groupNameEn: "Size",
        groupNameAr: "الحجم",
        optionNameEn: "Large",
        optionNameAr: "كبير",
        priceAdjustment: 5000,
      },
      {
        optionId: "dddddddd-dddd-dddd-dddd-dddddddddddd",
        groupNameEn: "Extras",
        groupNameAr: "إضافات",
        optionNameEn: "Cheese",
        optionNameAr: "جبنة",
        priceAdjustment: 3000,
      },
    ],
    // (25000 + 5000 + 3000) * 2
    itemTotalPrice: 66000,
  },
  {
    cartItemId: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    cartId: CART_ID,
    productId: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    productNameEn: "Fresh Orange Juice",
    productNameAr: "عصير برتقال طازج",
    basePrice: 12000,
    quantity: 1,
    notes: null,
    selectedOptions: [
      {
        optionId: "99999999-9999-9999-9999-999999999999",
        groupNameEn: "Size",
        groupNameAr: "الحجم",
        optionNameEn: "Medium",
        optionNameAr: "وسط",
        priceAdjustment: 0,
      },
    ],
    itemTotalPrice: 12000,
  },
  {
    cartItemId: "10101010-1010-1010-1010-101010101010",
    cartId: CART_ID,
    productId: "12121212-1212-1212-1212-121212121212",
    productNameEn: "Mixed Nuts Box",
    productNameAr: "علبة مكسرات مشكلة",
    basePrice: 45000,
    quantity: 1,
    notes: "No peanuts please",
    selectedOptions: [],
    itemTotalPrice: 45000,
  },
];

/** Full cart with items — use in UI previews / tests */
export const MOCK_CART: Cart = {
  cartId: CART_ID,
  storeId: STORE_ID,
  items: MOCK_CART_ITEMS,
  subtotal: MOCK_CART_ITEMS.reduce((sum, i) => sum + i.itemTotalPrice, 0),
  totalItemCount: MOCK_CART_ITEMS.reduce((sum, i) => sum + i.quantity, 0),
};

/** Empty cart — same shape the backend returns when no cart exists */
export const MOCK_EMPTY_CART: Cart = {
  cartId: null,
  storeId: STORE_ID,
  items: [],
  subtotal: 0,
  totalItemCount: 0,
};

/** Single-item cart for simpler stories */
export const MOCK_SINGLE_ITEM_CART: Cart = {
  cartId: CART_ID,
  storeId: STORE_ID,
  items: [MOCK_CART_ITEMS[0]],
  subtotal: MOCK_CART_ITEMS[0].itemTotalPrice,
  totalItemCount: MOCK_CART_ITEMS[0].quantity,
};