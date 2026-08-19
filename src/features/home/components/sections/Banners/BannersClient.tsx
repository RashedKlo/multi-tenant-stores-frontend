"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { HomeBanner } from "@/features/home/types/home.types";

interface BannersClientProps {
  banners: HomeBanner[];
}

/**
 * Infinite auto-scrolling banner slider.
 * Pure presentational – receives already-fetched data.
 * Uses CSS transform + minimal JS for a seamless loop.
 */
export function BannersClient({ banners }: BannersClientProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate items once for a seamless infinite loop
  const items = [...banners, ...banners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || banners.length <= 1) return;

    let animationId: number;
    let position = 0;
    const speed = 0.4; // px per frame

    const step = () => {
      position += speed;

      if (position >= track.scrollWidth / 2) {
        position = 0;
      }

      track.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => {
      animationId = requestAnimationFrame(step);
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="w-full overflow-hidden" aria-label="Promotions">
      <div
        ref={trackRef}
        className="flex gap-3 will-change-transform sm:gap-4"
        style={{ width: "max-content" }}
      >
        {items.map((banner, index) => (
          <a
            key={`${banner.id}-${index}`}
            href={banner.actionUrl ?? "#"}
            className="relative block w-[85vw] max-w-[420px] shrink-0 overflow-hidden rounded-2xl bg-muted transition-opacity hover:opacity-95 sm:w-[70vw] md:w-[480px] lg:w-[560px]"
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              width={1200}
              height={525}
              className="aspect-[16/7] w-full object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 560px"
              priority={index === 0}
            />

            {(banner.title || banner.subtitle) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                {banner.title && (
                  <p className="font-semibold leading-tight sm:text-lg">
                    {banner.title}
                  </p>
                )}
                {banner.subtitle && (
                  <p className="mt-0.5 text-sm opacity-90">{banner.subtitle}</p>
                )}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}