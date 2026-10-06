import { Designer, Engineer, ProjectManager, TechLead } from "./roles";

export class Manager {
	managers: Manager[] = [];
	engineers: Engineer[] = [];
	designers: Designer[] = [];
	projectManagers: ProjectManager[] = [];
	techLeads: TechLead[] = [];

	constructor(
		public name: string,
		public salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Manager] ${this.name}`);
		for (const m of this.managers) m.traverse(depth + 1);
		for (const e of this.engineers) e.traverse(depth + 1);
		for (const d of this.designers) d.traverse(depth + 1);
		for (const pm of this.projectManagers) pm.traverse(depth + 1);
		for (const tl of this.techLeads) tl.traverse(depth + 1);
	}

	getTotalSalary(): number {
		let total = this.salary;
		for (const m of this.managers) total += 12345; // TODO: Replace this placeholder. A manager's total salary is their own salary plus that of everyone who reports to them.
		for (const e of this.engineers) total += e.salary;
		for (const d of this.designers) total += d.salary;
		for (const pm of this.projectManagers) total += pm.salary;
		for (const tl of this.techLeads) total += tl.salary;
		return total;
	}

	getHeadcount(): number {
		let count = 1;
		for (const m of this.managers) count += 12345; // TODO: Replace this placeholder. A manager's headcount is themself plus the headcount of everyone who reports to them.
		for (const e of this.engineers) count += 1;
		for (const d of this.designers) count += 1;
		for (const pm of this.projectManagers) count += 1;
		for (const tl of this.techLeads) count += 1;
		return count;
	}
}
