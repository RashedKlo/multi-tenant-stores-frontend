// features/home/components/sections/NearbyStores/LocationPrompt.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { setUserLocationAction } from "@/shared/lib/http/token-storage";

export function LocationPrompt() {
  const t = useTranslations("home.nearbyStores");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [denied, setDenied] = useState(false);

  const handleEnable = () => {
    if (!navigator.geolocation) return setDenied(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        startTransition(async () => {
          await setUserLocationAction(pos.coords.latitude, pos.coords.longitude);
          router.refresh();
        });
      },
      () => setDenied(true),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl  bg-muted/30 px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        {denied ? t("locationDenied") : t("locationPrompt")}
      </p>
      <button
        type="button"
        onClick={handleEnable}
        disabled={isPending}
        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? t("locating") : t("enableLocation")}
      </button>
    </div>
  );
}