// app/(main)/checkout/success/page.tsx
import { CheckoutSuccess } from "@/features/checkout";

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;
  return <CheckoutSuccess orderId={orderId} />;
}
