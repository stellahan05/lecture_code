/** Anyone in the org chart: one person, or a manager along with everyone under them. */
export interface Employee {
	traverse(depth: number): void;
	getTotalSalary(): number;
	getHeadcount(): number;
}
