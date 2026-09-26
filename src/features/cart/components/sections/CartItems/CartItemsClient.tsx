"use client";

import type { CartItem } from "@/features/cart/types/cart.types";
import { CartItemCard } from "./CartItemCard";

interface CartItemsClientProps {
	items: CartItem[];
	pendingId: string | null;
	onQuantityChange: (item: CartItem, quantity: number) => void;
	onRemove: (item: CartItem) => void;
}

export function CartItemsClient({
	items,
	pendingId,
	onQuantityChange,
	onRemove,
}: CartItemsClientProps) {
	return (
		<ul role="list" className="space-y-3">
			{items.map((item) => (
				<li key={item.cartItemId}>
					<CartItemCard
						item={item}
						pending={pendingId === item.cartItemId}
						onQuantityChange={(quantity) => onQuantityChange(item, quantity)}
						onRemove={() => onRemove(item)}
					/>
				</li>
			))}
		</ul>
	);
}