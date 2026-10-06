// CONTEXT — depends only on the PaymentGateway interface.
// No provider-specific fields, no branches, no unit conversions.

import { PaymentGateway, PaymentResult } from "./payments";
import { MENU, MenuItem } from "./menu";

type OrderItem = { item: MenuItem; quantity: number; modifications: string[] };

export class CoffeeCart {
	private items: OrderItem[] = [];
	private payment: PaymentGateway; // any PaymentGateway implementation works here

	constructor(payment: PaymentGateway) {
		this.payment = payment;
	}

	// ── cart management ─────────────────────────────────────────────────────────

	addItem(name: string, quantity = 1, modifications: string[] = []): void {
		const item = MENU.find((m) => m.name.toLowerCase() === name.toLowerCase());
		if (!item) throw new Error(`"${name}" is not on the menu`);
		const existing = this.items.find((o) => o.item.name === item.name);
		if (existing) {
			existing.quantity += quantity;
		} else {
			this.items.push({ item, quantity, modifications });
		}
	}

	removeItem(name: string): void {
		const idx = this.items.findIndex((o) => o.item.name.toLowerCase() === name.toLowerCase());
		if (idx !== -1) this.items.splice(idx, 1);
	}

	updateQuantity(name: string, quantity: number): void {
		const order = this.items.find((o) => o.item.name.toLowerCase() === name.toLowerCase());
		if (!order) throw new Error(`"${name}" is not in your cart`);
		if (quantity <= 0) {
			this.removeItem(name);
		} else {
			order.quantity = quantity;
		}
	}

	getItems(): ReadonlyArray<{ name: string; quantity: number; priceCents: number }> {
		return this.items.map((o) => ({
			name: o.item.name,
			quantity: o.quantity,
			priceCents: o.item.priceCents,
		}));
	}

	// ── pricing ──────────────────────────────────────────────────────────────────

	getSubtotal(): number {
		return this.items.reduce((sum, o) => sum + o.item.priceCents * o.quantity, 0);
	}

	getTax(): number {
		return Math.round(this.getSubtotal() * 0.13);
	}

	getTotal(): number {
		return this.getSubtotal() + this.getTax();
	}

	// ── receipt ──────────────────────────────────────────────────────────────────

	printReceipt(): void {
		console.log("\n┌─── RECEIPT ───────────────────────────────┐");
		for (const o of this.items) {
			const mods = o.modifications.length ? ` (${o.modifications.join(", ")})` : "";
			const label = o.item.name + mods;
			const lineAmt = ((o.item.priceCents * o.quantity) / 100).toFixed(2);
			console.log(`│  ${label.padEnd(28)} x${o.quantity}  $${lineAmt.padStart(6)}`);
		}
		console.log("├───────────────────────────────────────────┤");
		console.log(`│  Subtotal:                          $${(this.getSubtotal() / 100).toFixed(2).padStart(6)}`);
		console.log(`│  Tax (13%):                         $${(this.getTax() / 100).toFixed(2).padStart(6)}`);
		console.log(`│  TOTAL:                             $${(this.getTotal() / 100).toFixed(2).padStart(6)}`);
		console.log(`│  Provider: ${this.payment.providerName.padEnd(31)}│`);
		console.log("└───────────────────────────────────────────┘");
	}

	// ── checkout ─────────────────────────────────────────────────────────────────

	checkout(): PaymentResult {
		if (this.items.length === 0) throw new Error("Cart is empty");
		const total = this.getTotal();
		const description = this.items.map((o) => `${o.item.name} x${o.quantity}`).join(", ");
		// One call, no branching — every PaymentGateway speaks the same language.
		return this.payment.pay(total, description);
	}
}
