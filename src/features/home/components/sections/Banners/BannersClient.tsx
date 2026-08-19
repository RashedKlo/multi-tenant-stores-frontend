"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { HomeBanner } from "@/features/home/types/home.types";

import "swiper/css";
import "swiper/css/pagination";

interface BannersClientProps {
  banners: HomeBanner[];
}

/**
 * Auto-advancing promo carousel. Pure presentational — receives
 * already-fetched, already-localized data. `dir` is set explicitly from
 * the active locale so Swiper mirrors slide order and swipe direction
 * for Arabic instead of only mirroring the surrounding layout.
 */
export function BannersClient({ banners }: BannersClientProps) {
  const locale = useLocale();
  const t = useTranslations("banners");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const hasMultiple = banners.length > 1;

  if (banners.length === 0) return null;

  return (
    <section aria-label={t("ariaLabel")} className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        dir={direction}
        key={direction}
        loop={hasMultiple}
        autoplay={
          hasMultiple
            ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={hasMultiple ? { clickable: true } : false}
        spaceBetween={12}
        slidesPerView={1.08}
        centeredSlides={hasMultiple}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 16, centeredSlides: false },
          1024: { slidesPerView: 2.2, spaceBetween: 20 },
        }}
        style={{ "--swiper-theme-color": "var(--primary)" } as React.CSSProperties}
        className="!overflow-visible pb-8"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id} className="!h-auto">
            <a
              href={banner.actionUrl ?? "#"}
              className="group relative block h-full overflow-hidden rounded-2xl bg-muted"
            >
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                width={1200}
                height={525}
                className="aspect-[16/8] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 45vw"
                priority={index === 0}
              />

              {(banner.title || banner.subtitle) && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white">
                  {banner.title && (
                    <p className="font-semibold leading-tight sm:text-lg">
                      {banner.title}
                    </p>
                  )}
                  {banner.subtitle && (
                    <p className="mt-0.5 text-sm text-white/85">{banner.subtitle}</p>
                  )}
                </div>
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}