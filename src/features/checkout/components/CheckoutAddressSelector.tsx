"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Address } from "@/features/addresses";

interface CheckoutAddressSelectorProps {
  addresses: Address[];
  selectedAddressId?: string;
}

export function CheckoutAddressSelector({
  addresses,
  selectedAddressId,
}: CheckoutAddressSelectorProps) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(
    selectedAddressId ?? addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id ?? "",
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId) return;

    // router.push(`/checkout/payment?addressId=${encodeURIComponent(selectedId)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          {t("addressSection")}
        </legend>

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
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
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

      <button
        type="submit"
        disabled={!selectedId}
        className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("confirmAndPay")}
      </button>
    </form>
  );
}