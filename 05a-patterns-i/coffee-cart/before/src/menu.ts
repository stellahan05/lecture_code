export type MenuItem = {
	id: string;
	name: string;
	priceCents: number;
	category: "drink" | "food";
};

export const MENU: MenuItem[] = [
	{ id: "esp", name: "Espresso", priceCents: 350, category: "drink" },
	{ id: "cap", name: "Cappuccino", priceCents: 450, category: "drink" },
	{ id: "lat", name: "Latte", priceCents: 500, category: "drink" },
	{ id: "cld", name: "Cold Brew", priceCents: 550, category: "drink" },
	{ id: "mat", name: "Matcha Latte", priceCents: 600, category: "drink" },
	{ id: "cro", name: "Croissant", priceCents: 375, category: "food" },
	{ id: "muf", name: "Blueberry Muffin", priceCents: 325, category: "food" },
	{ id: "avo", name: "Avocado Toast", priceCents: 850, category: "food" },
];
