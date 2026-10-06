import { Employee } from "./Employee";
import { Manager } from "./Manager";
import { Designer, Engineer, ProjectManager, TechLead } from "./roles";

const cto = new Manager("CTO", 200);

const alice = new Manager("Alice", 180);
alice.add(new Engineer("Bob", 120));
alice.add(new Engineer("Carol", 110));
alice.add(new TechLead("Deborah", 140));
alice.add(new Designer("Ethan", 130));

const grace = new Manager("Grace", 140);
grace.add(new Designer("Henry", 105));
grace.add(new Designer("Isabel", 130));

const frank = new ProjectManager("Frank", 130);

cto.add(alice);
cto.add(frank);
cto.add(grace);

const fmt = (n: number) => `$${n.toLocaleString()}`;

function report(label: string, employee: Employee): void {
	const salary = fmt(employee.getTotalSalary());
	console.log(`${label.padEnd(14)} headcount ${employee.getHeadcount()}, ${salary} total salary`);
}

console.log("=== Org Chart ===");
cto.traverse();

console.log("\n=== Reports ===");
report("Alice's team:", alice);
report("Grace's team:", grace);
report("Frank:", frank);
report("CTO's org:", cto);
