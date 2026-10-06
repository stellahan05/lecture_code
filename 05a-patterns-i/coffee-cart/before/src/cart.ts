import { BankCardReader } from "./bank";
import { Bank2Client } from "./otherBank";
import { MENU, MenuItem } from "./menu";

type OrderItem = { item: MenuItem; quantity: number; modifications: string[] };

export type PaymentProvider = "bank" | "bank2";

export class CoffeeCart {
	private items: OrderItem[] = [];
	private provider: PaymentProvider;

	private bankReader?: BankCardReader;
	private bank2Client?: Bank2Client;

	constructor(provider: PaymentProvider) {
		this.provider = provider;

		if (provider === "bank") {
			this.bankReader = new BankCardReader();
		} else if (provider === "bank2") {
			this.bank2Client = new Bank2Client();
		}
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
		console.log(`│  Provider: ${this.provider.padEnd(31)}│`);
		console.log("└───────────────────────────────────────────┘");
	}

	// ── checkout ─────────────────────────────────────────────────────────────────

	checkout(): { success: boolean; message: string; transactionId?: string } {
		if (this.items.length === 0) throw new Error("Cart is empty");

		const total = this.getTotal();
		const description = this.items.map((o) => `${o.item.name} x${o.quantity}`).join(", ");

		if (this.provider === "bank") {
			// BankCardReader speaks cents — pass total directly
			const approved = this.bankReader!.charge(total);
			if (approved) {
				return { success: true, message: "Approved by bank", transactionId: `bank-tx-${CoffeeCart.txCounter++}` };
			} else {
				return { success: false, message: "Declined by bank" };
			}
		} else if (this.provider === "bank2") {
			// Bank2Client speaks DOLLARS (not cents) — must convert
			// It also needs a currency string and a description the bank portal can read
			const amountDollars = total / 100;
			const result = this.bank2Client!.createCharge(amountDollars, "CAD", description);

			if (result.status === "succeeded") {
				return { success: true, message: "Processed via Bank2", transactionId: result.chargeId };
			} else {
				return { success: false, message: `Bank2 declined (network code: ${result.networkCode})` };
			}
		}

		throw new Error(`Unknown provider: ${this.provider}`);
	}

	private static txCounter = 1;
}
