/**
 * Coffee Cart — payments demo (before: no Adapter pattern)
 *
 * Run:  npm start
 */
import { CoffeeCart, PaymentProvider } from "./cart";

function runOrder(provider: PaymentProvider): void {
	console.log(`\n═══════════ ORDER (${provider.toUpperCase()}) ═══════════`);

	const cart = new CoffeeCart(provider);
	cart.addItem("Latte", 2, ["oat milk"]);
	cart.addItem("Espresso", 1);
	cart.addItem("Croissant", 2);
	cart.addItem("Cold Brew", 1);
	cart.addItem("Avocado Toast", 1);

	cart.printReceipt();

	const result = cart.checkout();
	if (result.success) {
		console.log(`\nPayment: ✓ ${result.message}`);
		console.log(`TX ID:   ${result.transactionId}`);
	} else {
		console.log(`\nPayment: ✗ ${result.message}`);
	}
}

// ─── Run both providers ───────────────────────────────────────────────────────
runOrder("bank");
runOrder("bank2");
