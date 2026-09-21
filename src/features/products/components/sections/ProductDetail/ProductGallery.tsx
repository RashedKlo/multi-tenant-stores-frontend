// features/stores/components/product-detail/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ProductImage } from "@/features/products/types";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const t = useTranslations("productGallery");
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-muted text-4xl font-bold text-muted-foreground">
        <span aria-hidden>{name.charAt(0)}</span>
      </div>
    );
  }

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(images.length - 1, i + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <figure className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60">
        <Image
          src={images[activeIndex].imageUrl}
          alt={`name—{name} —name—{t("imageOf", { index: activeIndex + 1, total: images.length })}`}
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover transition-opacity duration-200"
        />

        {/* Arrows — hidden on mobile (swipe via thumbnails scroll instead) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label={t("previousImage")}
              className="absolute inset-s-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-30 sm:flex"
            >
              <ChevronIcon />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === images.length - 1}
              aria-label={t("nextImage")}
              className="absolute inset-e-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-30 sm:flex"
            >
              <ChevronIcon flip />
            </button>
          </>
        )}

        {/* Counter pill */}
        {images.length > 1 && (
          <span
            className="absolute bottom-3 inset-e-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
            dir="ltr"
          >
            {activeIndex + 1}/{images.length}
          </span>
        )}
      </figure>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={t("thumbnailsLabel")}
          className="scrollbar-hide -mx-4 flex snap-x snap-proximity gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {images.map((img, index) => (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={[
                "relative h-16 w-16 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all duration-200 active:scale-95",
                index === activeIndex
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-65 hover:opacity-100",
              ].join(" ")}
            >
              <Image src={img.imageUrl} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${flip ? "rotate-180" : ""}`} /* rotate handles both LTR/RTL arrows */
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
