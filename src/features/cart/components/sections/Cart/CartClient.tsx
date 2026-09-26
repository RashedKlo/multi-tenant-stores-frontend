"use client";

import { startTransition, useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { CartItem } from "@/features/cart/types/cart.types";
import { updateCartItemAction } from "@/features/cart/actions/update-cart-item";
import { removeCartItemAction } from "@/features/cart/actions/remove-cart-item";
import { ConfirmModal, Notification } from "@/shared/lib/ui";
import { CartSummary } from "../CartSummary/CartSummary";
import { CartItemsClient } from "../CartItems/CartItemsClient";
import { CartEmpty } from "../CartItems/empty";

interface CartClientProps {
	items: CartItem[];
}

type OptimisticAction =
	| { type: "update"; id: string; quantity: number }
	| { type: "remove"; id: string };

export function CartClient({ items }: CartClientProps) {
	const t = useTranslations("cart");
	const router = useRouter();
	const [pendingId, setPendingId] = useState<string | null>(null);
	const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
	const [notice, setNotice] = useState<
		{ message: string; variant: "success" | "error" } | null
	>(null);
	const [optimisticItems, dispatchOptimistic] = useOptimistic(
		items,
		(state: CartItem[], action: OptimisticAction): CartItem[] => {
			if (action.type === "update") {
				return state.map((item) =>
					item.cartItemId === action.id
						? {
								...item,
								quantity: action.quantity,
								itemTotalPrice:
									(item.basePrice +
										item.selectedOptions.reduce(
											(total, option) => total + option.price_adjustment,
											0,
										)) * action.quantity,
								}
						: item,
				);
			}
			return state.filter((item) => item.cartItemId !== action.id);
		},
	);

	const handleQuantityChange = (item: CartItem, quantity: number) => {
		if (quantity < 1 || pendingId) return;

		startTransition(async () => {
			setPendingId(item.cartItemId);
			dispatchOptimistic({ type: "update", id: item.cartItemId, quantity });
			const result = await updateCartItemAction({
				cartItemId: item.cartItemId,
				storeId: item.storeId ?? "",
				quantity,
			});
			setPendingId(null);
			if (!result.success) {
				setNotice({ message: result.error || t("updateError"), variant: "error" });
				router.refresh();
				return;
			}
			setNotice({ message: t("updateSuccess"), variant: "success" });
			router.refresh();
		});
	};

	const handleRemoveConfirm = async () => {
		if (!itemToRemove || pendingId) return;

		const item = itemToRemove;
		setItemToRemove(null);

		startTransition(async () => {
			setPendingId(item.cartItemId);
			dispatchOptimistic({ type: "remove", id: item.cartItemId });
			const result = await removeCartItemAction({
				cartItemId: item.cartItemId,
				storeId: item.storeId ?? "",
			});
			setPendingId(null);
			if (!result.success) {
				setNotice({ message: result.error || t("removeError"), variant: "error" });
				router.refresh();
				return;
			}
			setNotice({ message: t("removeSuccess"), variant: "success" });
			router.refresh();
		});
	};

	if (optimisticItems.length === 0) return <CartEmpty />;

	const itemCount = optimisticItems.length;
	const subtotal = optimisticItems.reduce((total, item) => total + item.itemTotalPrice, 0);
	const storeId = optimisticItems[0]?.storeId ?? "";

	return (
		<div className="space-y-6" aria-label={t("itemsLabel")}>
			{notice && (
				<Notification
					message={notice.message}
					variant={notice.variant}
					onDismiss={() => setNotice(null)}
				/>
			)}
			<div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
				<CartItemsClient
					items={optimisticItems}
					pendingId={pendingId}
					onQuantityChange={handleQuantityChange}
					onRemove={setItemToRemove}
				/>
				<aside className="lg:sticky lg:top-20">
					<CartSummary subtotal={subtotal} storeId={storeId} itemCount={itemCount} />
				</aside>
			</div>
			<ConfirmModal
				open={Boolean(itemToRemove)}
				title={t("confirmRemove.title")}
				description={t("confirmRemove.description", {
					name: itemToRemove?.productName ?? "",
				})}
				cancelLabel={t("confirmRemove.cancel")}
				confirmLabel={t("confirmRemove.confirm")}
				onClose={() => setItemToRemove(null)}
				onConfirm={handleRemoveConfirm}
				isLoading={pendingId === itemToRemove?.cartItemId}
			/>
		</div>
	);
}