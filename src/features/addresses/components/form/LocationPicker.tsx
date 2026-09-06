// features/addresses/components/LocationPicker.tsx
"use client";

import { useTranslations } from "next-intl";
import { DEFAULT_MAP_CENTER } from "../../constants/addresses";

interface LocationPickerProps {
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
}

/**
 * Lightweight location controls.
 * Replace the placeholder map area with Google Maps / Mapbox when ready.
 * Keeps the same props so the form does not need to change.
 */
export function LocationPicker({
  latitude,
  longitude,
  onChange,
}: LocationPickerProps) {
  const t = useTranslations("addresses");

  function useCurrentLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        // Silently fall back — form still works with manual coords
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function resetToDefault() {
    onChange(DEFAULT_MAP_CENTER.latitude, DEFAULT_MAP_CENTER.longitude);
  }

  const hasValidCoords =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);

  return (
    <div className="space-y-3">
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40">
        <div className="text-center text-sm text-muted-foreground">
          {hasValidCoords ? (
            <>
              <p className="font-medium text-foreground">
                {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </p>
              <p className="mt-1 text-xs">{t("location.selected")}</p>
            </>
          ) : (
            <p>{t("location.placeholder")}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={useCurrentLocation}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
        >
          {t("location.useCurrent")}
        </button>
        <button
          type="button"
          onClick={resetToDefault}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
        >
          {t("location.reset")}
        </button>
      </div>
    </div>
  );
}