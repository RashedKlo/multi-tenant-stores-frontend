// features/stores/components/sections/StoreBanners/StoreBannersClient.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { StoreBanner } from "@/features/stores/types";

interface StoreBannersClientProps {
  banners: StoreBanner[];
}

export function StoreBannersClient({ banners }: StoreBannersClientProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...banners, ...banners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || banners.length <= 1) return;

    let animationId: number;
    let position = 0;
    const speed = 0.35;

    const step = () => {
      position += speed;
      if (position >= track.scrollWidth / 2) position = 0;
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

  return (
    <section className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((banner, index) => (
          <a
            key={`${banner.id}-${index}`}
            href={banner.actionUrl ?? "#"}
            className="relative block w-[85vw] max-w-[420px] shrink-0 overflow-hidden rounded-xl sm:w-[70vw] md:w-[480px]"
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title ?? "Store banner"}
              width={1200}
              height={420}
              className="aspect-[16/6] w-full object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, 480px"
              priority={index === 0}
            />
            {banner.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="font-semibold">{banner.title}</p>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}