"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import type { HomeBanner } from "@/features/home/types/home.types";

import "swiper/css";
import "swiper/css/pagination";

interface BannersClientProps {
  banners: HomeBanner[];
}

const SWIPER_VARS = {
  "--swiper-theme-color": "var(--primary)",
  "--swiper-pagination-bullet-inactive-color": "var(--muted-foreground)",
  "--swiper-pagination-bullet-size": "6px",
} as React.CSSProperties;

const BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
  480: { slidesPerView: 1.15, spaceBetween: 10, centeredSlides: true },
  640: { slidesPerView: 1.3, spaceBetween: 14, centeredSlides: true },
  1024: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
  1280: { slidesPerView: 2.25, spaceBetween: 24, centeredSlides: false },
} as const;

export function BannersClient({ banners }: BannersClientProps) {
  const locale = useLocale();
  const t = useTranslations("banners");
  const direction = locale === "ar" ? ("rtl" as const) : ("ltr" as const);
  const hasMultiple = banners.length > 1;

  if (banners.length === 0) return null;

  return (
    <section aria-label={t("ariaLabel")} className="w-full">
      <div className="banners-carousel relative w-full">
        <Swiper
          modules={[A11y, Autoplay, Keyboard, Pagination]}
          dir={direction}
          key={direction}
          loop={hasMultiple}
          autoplay={hasMultiple ? { delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          pagination={hasMultiple ? { clickable: true } : false}
          keyboard={{ enabled: hasMultiple }}
          speed={500}
          grabCursor
          watchSlidesProgress
          breakpoints={{ ...BREAKPOINTS }}
          style={SWIPER_VARS}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <BannerCard banner={banner} priority={index === 0} imageAlt={banner.title || t("bannerImageAlt")} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* ---------- Presentational card (kept in-file; extract if reused) ---------- */

function BannerCard({
  banner,
  priority,
  imageAlt,
}: {
  banner: HomeBanner;
  priority: boolean;
  imageAlt: string;
}) {
  const isExternal = banner.actionUrl?.startsWith("http");

  return (
    <a
      href={banner.actionUrl ?? "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative block w-full overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5"
    >
      {/* Fixed mobile height → fluid aspect ratio on larger screens */}
      <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-auto md:aspect-video lg:aspect-21/9">
        <Image
          src={banner.imageUrl}
          alt={imageAlt}
          fill
          priority={priority}
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent"
        />
      </div>

      {(banner.title || banner.subtitle) && (
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow sm:text-base md:text-lg">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="mt-1 line-clamp-2 text-xs text-white/90 sm:text-sm">{banner.subtitle}</p>
          )}
        </div>
      )}
    </a>
  );
}
