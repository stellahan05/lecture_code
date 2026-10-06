// BankCardReader implements PaymentGateway directly.
// Already speaks cents — no unit conversion needed.

import { PaymentGateway, PaymentResult } from "./payments";

export class BankCardReader implements PaymentGateway {
	readonly providerName = "Bank";
	private static txCounter = 1;

	pay(amountCents: number, _description: string): PaymentResult {
		const approved = amountCents < 100_000;
		return approved
			? { success: true, transactionId: `bank-tx-${BankCardReader.txCounter++}` }
			: { success: false, errorMessage: "Declined by bank" };
	}
}
