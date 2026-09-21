import { getProductDetail } from "../../../api";
import { ProductDetailClient } from "./ProductDetailClient";
import ProductDetailEmpty from "./empty";

interface ProductDetailProps {
  productId: string;
  storeId: string;
}

export async function ProductDetail({
  productId,
  storeId,
}: ProductDetailProps) {
  const result = await getProductDetail(productId);
  if (!result.success) {
    return <ProductDetailEmpty />;
  }

  return <ProductDetailClient product={result.data} storeId={storeId} />;
}