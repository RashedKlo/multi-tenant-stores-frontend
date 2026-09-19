// features/addresses/components/AddressForm.tsx
"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Address, CreateAddressInput } from "../../types";
import { LocationPicker } from "./LocationPicker";
import { createAddressAction, updateAddressAction } from "../../actions";
import { DEFAULT_MAP_CENTER } from "../../constants/addresses";

interface AddressFormProps {
  mode: "create" | "edit";
  initial?: Address;
  /** After successful create — e.g. redirect back to checkout */
  returnTo?: string
  
}

export function AddressForm({ mode, initial, returnTo }: AddressFormProps) {
  const t = useTranslations("addresses");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
const [serverError, setServerError] = useState<string | null>(null);

  const [values, setValues] = useState({
    label: initial?.label ?? "",
    addressText: initial?.addressText ?? "",
    latitude: initial?.latitude ?? DEFAULT_MAP_CENTER.latitude,
    longitude: initial?.longitude ?? DEFAULT_MAP_CENTER.longitude,
    isDefault: initial?.isDefault ?? mode === "create",
  });


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    startTransition(async () => {
      if (mode === "create") {
        const input: CreateAddressInput = {
          label: values.label.trim(),
          addressText: values.addressText.trim(),
          latitude: values.latitude,
          longitude: values.longitude,
          isDefault: values.isDefault,
        };
        const result = await createAddressAction(input);
        if (!result.success) {
          setServerError(result.error);
          return;
        }
        router.push(returnTo || "/addresses");
        router.refresh();
        return;
      }

      if (!initial) return;
      const result = await updateAddressAction(initial.id, {
        label: values.label.trim(),
        addressText: values.addressText.trim(),
        latitude: values.latitude,
        longitude: values.longitude,
      });
      if (!result.success) {
        setServerError(result.error);
        return;
      }
      router.push("/addresses");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {serverError && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {serverError}
        </p>
      )}

      <div className="space-y-1.5">
        <label htmlFor="label" className="text-sm font-medium">
          {t("form.label")}
        </label>
        <input
          id="label"
          type="text"
          value={values.label}
          onChange={(e) => setValues((prev) => ({ ...prev, label: e.target.value }))}
          placeholder={t("form.labelPlaceholder")}
          className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring-2"
          autoComplete="off"
        />
 
      </div>

      <div className="space-y-1.5">
        <label htmlFor="addressText" className="text-sm font-medium">
          {t("form.addressText")}
        </label>
        <textarea
          id="addressText"
          value={values.addressText}
          onChange={(e) => setValues((prev) => ({ ...prev, addressText: e.target.value }))}
          placeholder={t("form.addressPlaceholder")}
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
        />
  
      </div>

      <div className="space-y-1.5">
        <span className="text-sm font-medium">{t("form.location")}</span>
        <LocationPicker
          latitude={values.latitude}
          longitude={values.longitude}
          onChange={(lat, lng) => {
            setValues((prev) => ({ ...prev, latitude: lat, longitude: lng }));
          }}
        />

      </div>

      {mode === "create" && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isDefault}
            onChange={(e) => setValues((prev) => ({ ...prev, isDefault: e.target.checked }))}
            className="h-4 w-4 rounded border-border"
          />
          {t("form.setAsDefault")}
        </label>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {isPending
          ? t("form.saving")
          : mode === "create"
            ? t("form.create")
            : t("form.save")}
      </button>
    </form>
  );
}