import { Manager } from "./Manager";
import { Designer, Engineer, ProjectManager, TechLead } from "./roles";

const cto = new Manager("CTO", 200);

const alice = new Manager("Alice", 180);
alice.engineers.push(new Engineer("Bob", 120));
alice.engineers.push(new Engineer("Carol", 110));
alice.techLeads.push(new TechLead("Deborah", 140));
alice.designers.push(new Designer("Ethan", 130));

const grace = new Manager("Grace", 140);
grace.designers.push(new Designer("Henry", 105));
grace.designers.push(new Designer("Isabel", 130));

cto.managers.push(alice);
cto.projectManagers.push(new ProjectManager("Frank", 130));
cto.managers.push(grace);

const fmt = (n: number) => `$${n.toLocaleString()}`;

console.log("=== Org Chart ===");
cto.traverse();

console.log("\n=== Reports ===");
console.log(`Alice's team:  ${alice.getHeadcount()} people, ${fmt(alice.getTotalSalary())} total salary`);
console.log(`Grace's team:  ${grace.getHeadcount()} people, ${fmt(grace.getTotalSalary())} total salary`);
console.log(`CTO's org:     ${cto.getHeadcount()} people, ${fmt(cto.getTotalSalary())} total salary`);
