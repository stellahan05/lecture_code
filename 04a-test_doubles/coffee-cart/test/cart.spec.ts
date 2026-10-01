import { expect } from "chai";
import { buyCoffee, IReader } from "../src/cart";

class ApprovingReader implements IReader {
	charge(price: number): boolean {
		this.charged.push(price);
		return true;
	}
}

class RejectingReader implements IReader {
	charge(price: number): boolean {
		return false;
	}
}

describe("buyCoffee", () => {
	it("serves coffee when the card is charged", () => {
		const reader = n ew ApprovingReader();
		expect(buyCoffee(reader, "iced")).to.equal("enjoy your coffee");
		expect(reader.charged).to.deep.equal([500]);
	});

	it("refuses when the card is declined", () => {
		expect(buyCoffee(new RejectingReader(), "decaf")).to.equal("card declined");
	});
});
