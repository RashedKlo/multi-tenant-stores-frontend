export type ProductImage = {
  id: string;
  imageUrl: string;
};

export type ProductOption = {
  id: string;
  name: string;
  priceAdjustment: number;
  isDefault: boolean;
};

export type ProductOptionGroup = {
  id: string;
  name: string;
  selectionType: "Single" | "Multiple"; // matches backend enum
  minSelection: number;
  maxSelection: number;
  options: ProductOption[];
};

export type ProductDetail = {
  id: string;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  inStock: boolean;
  stockQuantity?: number;
  isFavorite?: boolean;
  images: ProductImage[];
  optionGroups: ProductOptionGroup[];
};