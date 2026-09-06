import { getProductDetail } from "@/features/products/api/get-product-detail";
import { ProductDetailClient } from "./ProductDetailClient";
import ProductDetailEmpty from "./empty";
import { MOCK_PRODUCT_DETAIL } from "../../constants/product-detail";

interface ProductDetailProps {
  productId: string;
  storeId: string;
}

export async function ProductDetail({
  productId,
  storeId,
}: ProductDetailProps) {
  const product = await getProductDetail(productId);
  // const product=MOCK_PRODUCT_DETAIL;
  if (!product) {
    return <ProductDetailEmpty />;
  }

  return <ProductDetailClient product={product} storeId={storeId} />;
}