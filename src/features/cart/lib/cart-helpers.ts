// src/features/cart/lib/cart-helpers.ts
import type {
  Cart,
  CartItem,
  LocalizedCartItem,
} from "../types";

export function localizeCartItems(
  items: CartItem[],
  locale: string,
): LocalizedCartItem[] {
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

export function formatCartPrice(
  amount: number,
  locale = "en",
  currency = "SYP",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isCartEmpty(cart: Cart): boolean {
  return cart.items.length === 0 || cart.totalItemCount === 0;
}

export function recalcItemTotal(
  item: Pick<LocalizedCartItem, "basePrice" | "selectedOptions">,
  quantity: number,
): number {
  const optionsTotal = item.selectedOptions.reduce(
    (sum, o) => sum + o.priceAdjustment,
    0,
  );
  return (item.basePrice + optionsTotal) * quantity;
}