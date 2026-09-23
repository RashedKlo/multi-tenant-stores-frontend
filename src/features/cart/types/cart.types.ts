// src/features/cart/types/cart.types.ts

export interface SelectedOption {
  option_id: string;
  group_name: string;
  option_name: string;
  price_adjustment: number;
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


