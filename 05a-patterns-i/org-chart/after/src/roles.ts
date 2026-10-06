import { Employee } from "./Employee";

export class Engineer implements Employee {
	constructor(
		public name: string,
		private salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Engineer] ${this.name}`);
	}

	getTotalSalary(): number {
		return this.salary;
	}

	getHeadcount(): number {
		return 1;
	}
}

export class Designer implements Employee {
	constructor(
		public name: string,
		private salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Designer] ${this.name}`);
	}

	getTotalSalary(): number {
		return this.salary;
	}

	getHeadcount(): number {
		return 1;
	}
}

export class ProjectManager implements Employee {
	constructor(
		public name: string,
		private salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[ProjectManager] ${this.name}`);
	}

	getTotalSalary(): number {
		return this.salary;
	}

	getHeadcount(): number {
		return 1;
	}
}

export class TechLead implements Employee {
	constructor(
		public name: string,
		private salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[TechLead] ${this.name}`);
	}

	getTotalSalary(): number {
		return this.salary;
	}

	getHeadcount(): number {
		return 1;
	}
}
