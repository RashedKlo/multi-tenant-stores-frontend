// features/stores/constants/products.ts
import type { PagedProducts, ProductSummary } from "../types";

export const MOCK_PRODUCTS: ProductSummary[] = [
  {
    id: "prod-1",
    name: "Organic Honeycrisp Apples (1kg)",
    thumbnailUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    price: 14.50,
    comparePrice: 18.00,
    inStock: true,
    isFavorite: true,
  },
  {
    id: "prod-2",
    name: "Fresh Whole Milk 1L",
    thumbnailUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
    price: 7.50,
    inStock: true,
    isFavorite: false,
  },
  {
    id: "prod-3",
    name: "Artisanal Sourdough Bread",
    thumbnailUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&q=80",
    price: 12.00,
    comparePrice: 15.00,
    inStock: true,
    isFavorite: false,
  },
  {
    id: "prod-4",
    name: "Grass-Fed Beef Ribeye Steak (300g)",
    thumbnailUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&q=80",
    price: 58.00,
    comparePrice: 65.00,
    inStock: true,
    isFavorite: true,
  },
  {
    id: "prod-5",
    name: "Cold-Pressed Orange Juice 1L",
    thumbnailUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80",
    price: 16.50,
    inStock: true,
    isFavorite: false,
  },
  {
    id: "prod-6",
    name: "Organic Cavendish Bananas (1kg)",
    thumbnailUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80",
    price: 6.50,
    comparePrice: 8.50,
    inStock: true,
    isFavorite: false,
  },
  {
    id: "prod-7",
    name: "Extra Virgin Olive Oil 500ml",
    thumbnailUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
    price: 34.00,
    inStock: false,
    isFavorite: false,
  },
  {
    id: "prod-8",
    name: "Dark Chocolate 85% Cocoa (100g)",
    thumbnailUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
    price: 11.00,
    comparePrice: 13.50,
    inStock: true,
    isFavorite: true,
  },
];

export const MOCK_PAGED_PRODUCTS: PagedProducts = {
  items: MOCK_PRODUCTS,
  pageNumber: 1,
  pageSize: 8,
  totalCount: 32,
  totalPages: 4,
  hasPreviousPage: false,
  hasNextPage: true,
};