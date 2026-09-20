// src/features/cart/types/cart.types.ts

export interface SelectedOption {
  optionId: string;
  groupName: string;
  optionName: string;
  priceAdjustment: number;
}


export interface CartItem {
  cartItemId: string;
  cartId: string;
  storeId?: string;
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  quantity: number;
  notes?: string | null;
  selectedOptions: SelectedOption[];
  itemTotalPrice: number;
}


