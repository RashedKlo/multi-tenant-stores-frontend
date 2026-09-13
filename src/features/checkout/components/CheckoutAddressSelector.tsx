"use client";

// features/checkout/components/CheckoutAddressSelector.tsx
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import type { Address } from "@/features/addresses";
import { createCheckoutAction } from "../actions/create-checkout.action";
import { addAddressHref } from "../constants";

interface CheckoutAddressSelectorProps {
  addresses: Address[];
  storeId: string;
  selectedAddressId?: string;
}

export function CheckoutAddressSelector({
  addresses,
  storeId,
  selectedAddressId,
}: CheckoutAddressSelectorProps) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const defaultId =
    selectedAddressId ??
    addresses.find((a) => a.isDefault)?.id ??
    addresses[0]?.id ??
    "";

  const [selectedId, setSelectedId] = useState(defaultId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedId || !storeId) {
      setError(t("missingSelection"));
      return;
    }

    startTransition(async () => {
      const result = await createCheckoutAction({
        storeId,
        addressId: selectedId,
        deliveryPhone: null,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      // Full navigation to Stripe hosted checkout
      window.location.href = result.data.checkoutUrl;
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <legend className="text-sm font-semibold text-foreground">
            {t("addressSection")}
          </legend>
          <a
            href={addAddressHref(storeId)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("addAddress")}
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => {
            const isSelected = selectedId === address.id;

            return (
              <label
                key={address.id}
                className={`relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-muted/50"
                }`}
              >
                <input
                  type="radio"
                  name="addressId"
                  value={address.id}
                  checked={isSelected}
                  onChange={() => setSelectedId(address.id)}
                  className="mt-1 h-4 w-4 accent-primary"
                  disabled={isPending}
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                    {address.label}
                    {address.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {t("defaultAddress")}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                    {address.addressText}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedId || isPending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            {t("processing")}
          </>
        ) : (
          t("confirmAndPay")
        )}
      </button>

      <button
        type="button"
        onClick={() => router.back()}
        disabled={isPending}
        className="flex h-11 w-full items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
      >
        {t("back")}
      </button>
    </form>
  );
}
