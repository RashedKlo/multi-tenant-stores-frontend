// src/features/cart/types/cart.types.ts

/** Mirrors backend SelectedOptionDto */
export interface SelectedOption {
  optionId: string;
  groupNameEn: string;
  groupNameAr: string;
  optionNameEn: string;
  optionNameAr: string;
  priceAdjustment: number;
}

/** Mirrors backend CartItemDto */
export interface CartItem {
  cartItemId: string;
  cartId: string;
  productId: string;
  productNameEn: string;
  productNameAr: string;
  basePrice: number;
  quantity: number;
  notes?: string | null;
  selectedOptions: SelectedOption[];
  itemTotalPrice: number;
}

/**
 * Mirrors backend CartDto.
 * Backend always returns a cart (empty if none) — never fails for missing cart.
 */
export interface Cart {
  cartId: string | null;
  storeId: string;
  items: CartItem[];
  subtotal: number;
  totalItemCount: number;
}

/** UI-ready item after locale resolution */
export interface LocalizedSelectedOption {
  optionId: string;
  groupName: string;
  optionName: string;
  priceAdjustment: number;
}

export type LocalizedCartItem = {
  cartItemId: string;
  cartId: string;
  productId: string;
  name: string;
  basePrice: number;
  quantity: number;
  notes?: string | null;
  selectedOptions: LocalizedSelectedOption[];
  itemTotalPrice: number;
};