"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ModuleBanner } from "@/features/modules/types";

interface ModuleBannersClientProps {
  banners: ModuleBanner[];
}

export function ModuleBannersClient({ banners }: ModuleBannersClientProps) {
  const t = useTranslations("moduleBanners");

  // Single banner → no marquee needed
  if (banners.length <= 1) {
    return (
      <section aria-label={t("ariaLabel")} className="w-full">
        <MarqueeCard banner={banners[0]} priority />
      </section>
    );
  }

  return (
    <section aria-label={t("ariaLabel")} className="marquee w-full overflow-hidden">
      {/* Two identical tracks = seamless infinite loop, GPU-composited */}
      <div className="marquee__track flex w-max gap-4 will-change-transform" aria-hidden>
        {banners.map((b, i) => (
          <MarqueeCard key={b.id} banner={b} priority={i === 0} tabIndex={-1} />
        ))}
      </div>
      <div className="marquee__track flex w-max gap-4 will-change-transform">
        {banners.map((b) => (
          <MarqueeCard key={b.id} banner={b} tabIndex={-1} />
        ))}
      </div>
    </section>
  );
}

function MarqueeCard({
  banner,
  priority,
  tabIndex,
}: {
  banner: ModuleBanner;
  priority?: boolean;
  tabIndex?: number;
}) {
  const isExternal = banner.actionUrl?.startsWith("http");
  return (
    <a
      href={banner.actionUrl ?? "#"}
      tabIndex={tabIndex}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative block w-[85vw] max-w-[440px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-sm transition-shadow hover:shadow-md"
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title ?? ""}
        width={1200}
        height={420}
        priority={priority}
        quality={80}
        sizes="(max-width: 640px) 85vw, 480px"
        className="aspect-[16/6] w-full object-cover"
      />
      {banner.title && (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-sm font-semibold text-white drop-shadow sm:text-base">
          {banner.title}
        </p>
      )}
    </a>
  );
}
