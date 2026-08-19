// features/addresses/components/AddressForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { addressSchema, type AddressFormValues } from "../schemas/address.schema";
import { LocationPicker } from "./LocationPicker";

interface AddressFormProps {
  defaultValues?: Partial<AddressFormValues>;
  onSubmit: (values: AddressFormValues) => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save address",
  isSubmitting,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: {
      label: "",
      addressText: "",
      latitude: 24.7136,
      longitude: 46.6753,
      isDefault: false,
      ...defaultValues,
    },
  });

  const lat = watch("latitude");
  const lng = watch("longitude");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Map first – as requested */}
      <LocationPicker
        latitude={lat}
        longitude={lng}
        onChange={(newLat, newLng) => {
          setValue("latitude", newLat, { shouldValidate: true });
          setValue("longitude", newLng, { shouldValidate: true });
        }}
      />

      {/* Label */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Label</label>
        <input
          {...register("label")}
          placeholder="Home, Work, ..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        {errors.label && (
          <p className="text-xs text-red-500">{errors.label.message}</p>
        )}
      </div>

      {/* Address text */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Address details</label>
        <textarea
          {...register("addressText")}
          rows={3}
          placeholder="Street, building, floor, apartment..."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        {errors.addressText && (
          <p className="text-xs text-red-500">{errors.addressText.message}</p>
        )}
      </div>

      {/* Default checkbox (only on create) */}
      {"isDefault" in (defaultValues ?? {}) === false && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("isDefault")} className="rounded" />
          Set as default address
        </label>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}