/**
 * The coffee cart's original card reader.
 * Charges the connected bank card the given amount in cents.
 */
export class BankCardReader {
	/** Returns true if the card was approved, false if it was declined. Never throws. */
	public charge(cents: number): boolean {
		return cents < 100_000;
	}
}
