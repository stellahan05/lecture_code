import { PaymentGateway, PaymentResult } from "./payments";

function makeActualCharge(amount: number) {
	console.log(`charging ${amount} to bank2!`);
	return Math.random() < 0.85; // pretend this makes a call to bank2 in dollars;
}

export class Bank2Client implements PaymentGateway {
	readonly providerName = "Bank2";

	pay(amountCents: number, description: string): PaymentResult {
		const amountDollars = amountCents / 100; // Bank2 speaks dollars, not cents
		const succeeded = makeActualCharge(amountDollars);
		const chargeId = `ch_${Math.random().toString(36).slice(2, 11)}`;
		const networkCode = succeeded ? "00" : "51";

		return succeeded
			? { success: true, transactionId: chargeId }
			: { success: false, errorMessage: `Bank2 declined (network code: ${networkCode})` };
	}
}
