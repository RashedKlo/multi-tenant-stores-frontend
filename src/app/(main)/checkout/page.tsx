// app/(main)/checkout/page.tsx
import { Suspense } from "react";
import {
  CheckoutPage as CheckoutContent,
  CheckoutSkeleton,
} from "@/features/checkout";
import { AuthGate } from "@/shared/lib/ui";



export default async function CheckoutPage({  }) {


  return (
    <AuthGate redirectTo={"/checkout"}>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutContent   />
      </Suspense>
    </AuthGate>
  );
}
