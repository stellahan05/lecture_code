// CLIENT — imports only the interface and the two concrete classes.
// No wrapper objects. No provider-string branching.
import { PaymentGateway } from "./payments";
import { BankCardReader } from "./bank";
import { Bank2Client } from "./otherBank";
import { CoffeeCart } from "./cart";

// ─── Register payment providers ───────────────────────────────────────────────
const gateways: PaymentGateway[] = [new BankCardReader(), new Bank2Client()];

// ─── Run an order through every registered provider ───────────────────────────
for (const gateway of gateways) {
	runOrder(gateway);
}

function runOrder(payment: PaymentGateway): void {
	console.log(`\n═══════════ ORDER (${payment.providerName.toUpperCase()}) ═══════════`);

	const cart = new CoffeeCart(payment);
	cart.addItem("Latte", 2, ["oat milk"]);
	cart.addItem("Espresso", 1);
	cart.addItem("Croissant", 2);
	cart.addItem("Cold Brew", 1);
	cart.addItem("Avocado Toast", 1);

	cart.printReceipt();

	const result = cart.checkout();
	if (result.success) {
		console.log(`\nPayment: ✓ Approved`);
		console.log(`TX ID:   ${result.transactionId}`);
	} else {
		console.log(`\nPayment: ✗ ${result.errorMessage}`);
	}
}
