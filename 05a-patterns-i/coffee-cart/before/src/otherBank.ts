/**
 * Client for the Bank2 payment API (second provider).
 */
export interface Bank2ChargeResult {
	status: "succeeded" | "failed";
	chargeId: string;
	networkCode: string;
}

function makeActualCharge(amount: number) {
	console.log(`charging ${amount} to bank2!`);
	return Math.random() < 0.85; // pretend this makes a call to bank2 in dollars;
}

export class Bank2Client {
	public createCharge(amountDollars: number, currency: string, description: string): Bank2ChargeResult {
		const succeeded = makeActualCharge(amountDollars);
		const chargeId = `ch_${Math.random().toString(36).slice(2, 11)}`;
		return {
			status: succeeded ? "succeeded" : "failed",
			chargeId,
			networkCode: succeeded ? "00" : "51",
		};
	}
}
