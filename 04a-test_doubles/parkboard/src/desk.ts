import { findOffering } from "./catalogue";

/**
 * Whether the front desk can still sign someone up for an offering.
 */

// when each season starts
const SEASON_STARTS: Record<string, string> = {
	Spring: "2026-04-13",
	Fall: "2026-09-14",
	Winter: "2026-12-01",
};
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const LAST_CALL_DAYS = 7;

export function messageFor(offeringId: string, today: Date): string {
	const offering = findOffering(offeringId);
	if (offering === undefined) {
		return `no offering '${offeringId}'`;
	}

	const daysLeft = Math.ceil((Date.parse(SEASON_STARTS[offering.season]) - today.getTime()) / MS_PER_DAY);
	if (daysLeft <= 0) {
		return `${offering.id} has already started`;
	} else if (offering.isFull()) {
		return `${offering.id} is full`;
	} else if (daysLeft <= LAST_CALL_DAYS) {
		return `${offering.id} starts in ${daysLeft} days — register now`;
	} else {
		return `${offering.id} is open`;
	}
}

export function printStatus(offeringId: string): void {
	console.log(messageFor(offeringId, new Date()));
}
