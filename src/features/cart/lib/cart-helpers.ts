// features/cart/lib/cart-helpers.ts
import type { CartItem, LocalizedCartItem, LocalizedSelectedOption } from "./types-local";

export interface LocalizedSelectedOption {
  optionId: string;
  groupName: string;
  optionName: string;
  priceAdjustment: number;
}

export function localizeCartItems(items: CartItem[], locale: string): LocalizedCartItem[] {
  const ar = locale.startsWith("ar");
  return items.map((item) => ({
    cartItemId: item.cartItemId,
    cartId: item.cartId,
    productId: item.productId,
    name: ar ? item.productNameAr : item.productNameEn,
    basePrice: item.basePrice,
    quantity: item.quantity,
    notes: item.notes,
    selectedOptions: item.selectedOptions.map((o) => ({
      optionId: o.optionId,
      groupName: ar ? o.groupNameAr : o.groupNameEn,
      optionName: ar ? o.optionNameAr : o.optionNameEn,
      priceAdjustment: o.priceAdjustment,
    })),
    itemTotalPrice: item.itemTotalPrice,
  }));
}
