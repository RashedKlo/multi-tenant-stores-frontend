// features/stores/constants/product-detail.ts
import type { ProductDetail } from "../types/products.types";

export const MOCK_PRODUCT_DETAIL: ProductDetail = {
  id: "prod-detail-101",
  name: "Artisanal Cold Brew & Breakfast Sandwich Combo",
  description: "Rich, 18-hour slow-steeped organic cold brew coffee paired with a freshly toasted brioche breakfast sandwich, customized to your exact preferences.",
  price: 28.00,
  comparePrice: 34.00,
  inStock: true,
  stockQuantity: 42,
  isFavorite: true,
  images: [
    {
      id: "img-1",
      imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1000&q=80",
    },
    {
      id: "img-2",
      imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1000&q=80",
    },
    {
      id: "img-3",
      imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1000&q=80",
    },
  ],
  optionGroups: [
    {
      id: "og-size",
      name: "Beverage Size",
      selectionType: "Single",
      minSelection: 1,
      maxSelection: 1,
      options: [
        { id: "opt-1", name: "Medium (12 oz)", priceAdjustment: 0, isDefault: true },
        { id: "opt-2", name: "Large (16 oz)", priceAdjustment: 3.50, isDefault: false },
        { id: "opt-3", name: "Extra Large (20 oz)", priceAdjustment: 5.50, isDefault: false },
      ],
    },
    {
      id: "og-milk",
      name: "Milk Preference",
      selectionType: "Single",
      minSelection: 1,
      maxSelection: 1,
      options: [
        { id: "opt-4", name: "Whole Milk", priceAdjustment: 0, isDefault: true },
        { id: "opt-5", name: "Oat Milk", priceAdjustment: 2.50, isDefault: false },
        { id: "opt-6", name: "Almond Milk", priceAdjustment: 2.50, isDefault: false },
      ],
    },
    {
      id: "og-addons",
      name: "Sandwich Add-ons",
      selectionType: "Multiple",
      minSelection: 0,
      maxSelection: 3,
      options: [
        { id: "opt-7", name: "Extra Aged Cheddar", priceAdjustment: 3.00, isDefault: false },
        { id: "opt-8", name: "Avocado Slices", priceAdjustment: 4.50, isDefault: false },
        { id: "opt-9", name: "Smoked Turkey Bacon", priceAdjustment: 5.00, isDefault: false },
        { id: "opt-10", name: "Caramelized Onions", priceAdjustment: 2.00, isDefault: false },
      ],
    },
  ],
};