export class Engineer {
	constructor(
		public name: string,
		public salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Engineer] ${this.name}`);
	}
}

export class Designer {
	constructor(
		public name: string,
		public salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Designer] ${this.name}`);
	}
}

export class ProjectManager {
	constructor(
		public name: string,
		public salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[ProjectManager] ${this.name}`);
	}
}

export class TechLead {
	constructor(
		public name: string,
		public salary: number
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[TechLead] ${this.name}`);
	}
}
