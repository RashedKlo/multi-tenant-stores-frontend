"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function CartEmpty() {
	const t = useTranslations("cart.empty");

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
			<h2 className="text-base font-semibold text-foreground">{t("title")}</h2>
			<p className="mt-1 max-w-xs text-sm text-muted-foreground">{t("description")}</p>
			<Link href="/home" className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95">{t("browseCta")}</Link>
		</div>
	);
}