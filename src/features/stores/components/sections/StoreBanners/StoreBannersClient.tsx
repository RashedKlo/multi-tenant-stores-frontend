// features/stores/components/sections/StoreBanners/StoreBannersClient.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { StoreBanner } from "@/features/stores/types";

interface StoreBannersClientProps {
  banners: StoreBanner[];
}

export function StoreBannersClient({ banners }: StoreBannersClientProps) {
  const t = useTranslations("storeBanners");

  if (banners.length === 1) {
    return <BannerCard banner={banners[0]} priority alt={t("bannerImageAlt")} />;
  }

  return (
    <section aria-label={t("ariaLabel")} className="marquee w-full overflow-hidden">
      {/* Two identical tracks = seamless infinite loop */}
      {[0].map((trackIndex) => (
        <div
          key={trackIndex}
          className="marquee__track flex w-max gap-3 will-change-transform"
          aria-hidden={trackIndex === 1 || undefined}
        >
          {banners.map((banner, i) => (
            <BannerCard
              key={`banner.id−{banner.id}-banner.id−{trackIndex}`}
              banner={banner}
              priority={trackIndex === 0 && i === 0}
              tabIndex={-1}
              alt={t("bannerImageAlt")}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

function BannerCard({
  banner,
  priority,
  tabIndex,
  alt,
}: {
  banner: StoreBanner;
  priority?: boolean;
  tabIndex?: number;
  alt: string;
}) {
  const isExternal = banner.actionUrl?.startsWith("http");

  return (
    <a
      href={banner.actionUrl ?? "#"}
      tabIndex={tabIndex}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative block w-[85vw] max-w-105 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-sm transition-shadow hover:shadow-md sm:w-[70vw] md:w-120"
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title ? `alt:{alt}:alt:{banner.title}` : alt}
        width={1200}
        height={420}
        priority={priority}
        quality={80}
        sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, 480px"
        className="aspect-16/6 w-full object-cover"
      />
      {banner.title && (
        <p className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4 text-sm font-semibold text-white drop-shadow sm:text-base">
          {banner.title}
        </p>
      )}
    </a>
  );
}
