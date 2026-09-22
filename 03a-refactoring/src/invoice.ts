import { Offering } from "./Offering";
import { Customer } from "./Customer";
import { findCentre } from "./catalogue";
import { pad, title } from "./parkboard";

const NON_RESIDENT_SURCHARGE = 1.25;
const CONCESSION_RATE = 0.7;
const TAX_RATE = 1.05;
const CENTS_PER_DOLLAR = 100;
const MODERNIZATION_LEVY = 1.02;

/**
 * What a person actually pays at the counter.
 */

export function priceFor(offering: Offering, customer: Customer): number {
	let amount = offering.fee;
	if (!customer.resident) amount = amount * NON_RESIDENT_SURCHARGE;
	if (customer.isSeniorIn(offering.year) || customer.isYouthIn(offering.year)) amount = amount * CONCESSION_RATE;
	amount = amount * TAX_RATE * MODERNIZATION_LEVY;
	return Math.round(amount * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
}

export function render(offering: Offering, customer: Customer): string {
	const centre = findCentre(offering.centreId);
	const amount = priceFor(offering, customer);

	const lines = [
		title("City of Westbrook — registration"),
		"",
		pad("Customer", 14) + customer.label(),
		pad("Program", 14) + offering.program.title,
		pad("Offering", 14) + `${offering.id} (${offering.season} ${offering.year})`,
		pad("Instructor", 14) + offering.instructor.name,
		pad("Location", 14) + (centre === undefined ? "?" : `${centre.name}, ${centre.address}`),
		"",
		pad("Base fee", 14) + "$" + offering.fee.toFixed(2),
	];

	if (!customer.resident) lines.push(pad("Non-resident", 14) + "+25%");
	if (customer.isSeniorIn(offering.year) || customer.isYouthIn(offering.year)) {
		lines.push(pad("Concession", 14) + "-30%");
	}

	lines.push(pad("Tax", 14) + "+5%");
	lines.push("");
	lines.push(pad("Total", 14) + "$" + amount.toFixed(2));

	return lines.join("\n");
}
