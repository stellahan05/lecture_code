import { BankCardReader } from "./bank";

export function getPrice(modification?: string): number {
	let price = 450;
	if (modification === "decaf") price += 100;
	else if (modification === "iced") price += 50;
	return price

}

export interface IReader {
	//** Returns true if the card was charged, false if it was declined. Never throws. */
	charge(price: number): boolean;
}

// prices are in cents
export function buyCoffee(reader: IReader, modification?: string): string {
	// const reader = new BankCardReader();
	// let price = 450;
	// if (modification === "decaf") price += 100;
	// else if (modification === "iced") price += 50;
	const price = getPrice(modification);
	return reader.charge(price) ? "enjoy your coffee" : "card declined";
}