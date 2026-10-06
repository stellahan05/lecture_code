const NON_RESIDENT_SURCHARGE = 1.25;
const CONCESSION_RATE = 0.7;
const TAX_RATE = 1.05;
const CENTS_PER_DOLLAR = 100;
const MODERNIZATION_LEVY = 1.02;

// abstract class so we can have subtypes
abstract class PriceCalculator {
    constructor(
        private fee: number,
        private resident: boolean,
    ) {}

    calculate(): number {
        let price = this.fee;
        if (!this.resident) price = price * NON_RESIDENT_SURCHARGE;
        // needs to apply concession (sometimes)
        price = this.applyConcession(price);
        price = Math.round(price * TAX_RATE * MODERNIZATION_LEVY * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
        return price;
    }

    abstract applyConcession(amount: number): number;

}

// subtype
export class QuotePrice extends PriceCalculator {
    applyConcession(amount: number): number {
        return amount;
    }
}

export class WalkinPrice extends PriceCalculator {
    constructor(
        fee: number,
        resident: boolean,
        private concessionEligible: boolean
    ) {
        super(fee, resident);
    }
    applyConcession(amount: number): number {
        // apply concession if senior or youth
        if (this.concessionEligible) {
            return amount * CONCESSION_RATE;
        } else {
            return amount;
        }
    }
}