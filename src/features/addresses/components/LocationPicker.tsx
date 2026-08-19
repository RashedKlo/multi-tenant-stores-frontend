// features/addresses/components/LocationPicker.tsx
"use client";

import { useState } from "react";

interface LocationPickerProps {
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
}

export function LocationPicker({
  latitude = 24.7136, // Riyadh default
  longitude = 46.6753,
  onChange,
}: LocationPickerProps) {
  const [lat, setLat] = useState(latitude);
  const [lng, setLng] = useState(longitude);

  // In real app replace this box with Google Maps / Leaflet
  const handleMapClick = () => {
    // Simulate picking a location (replace with real map click)
    const newLat = lat + (Math.random() - 0.5) * 0.01;
    const newLng = lng + (Math.random() - 0.5) * 0.01;
    setLat(newLat);
    setLng(newLng);
    onChange(newLat, newLng);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Choose location on map</p>

      <div
        onClick={handleMapClick}
        className="relative flex aspect-[16/10] w-full cursor-crosshair items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
      >
        {/* Replace this with real map component */}
        <div className="text-center">
          <div className="mb-2 text-3xl">📍</div>
          <p className="text-sm font-medium">Tap to pick location</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Drag the pin or tap on the map to set your exact location
      </p>
    </div>
  );
}