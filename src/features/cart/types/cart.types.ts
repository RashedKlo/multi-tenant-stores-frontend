// features/cart/types/cart.types.ts
export interface SelectedOption {
  optionId: string;
  groupNameEn: string;
  groupNameAr: string;
  optionNameEn: string;
  optionNameAr: string;
  priceAdjustment: number;
}

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

/** Mirrors backend CartDto — always returned, never fails. */
export interface Cart {
  cartId: string | null;
  storeId: string;
  items: CartItem[];
  subtotal: number;
  totalItemCount: number;
}

/** Localized name helper — pick by locale once, not in every component. */
export type LocalizedCartItem = Omit<CartItem, "productNameEn" | "productNameAr"> & {
  name: string;
};
