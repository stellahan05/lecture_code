import { Employee } from "./Employee";

export class Manager implements Employee {
	private reports: Employee[] = [];

	constructor(
		public name: string,
		private salary: number
	) {}

	add(report: Employee): void {
		this.reports.push(report);
	}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Manager] ${this.name}`);
		for (const report of this.reports) report.traverse(depth + 1);
	}

	getTotalSalary(): number {
		let total = this.salary;
		for (const report of this.reports) total += report.getTotalSalary();
		return total;
	}

	getHeadcount(): number {
		let count = 1;
		for (const report of this.reports) count += report.getHeadcount();
		return count;
	}
}
