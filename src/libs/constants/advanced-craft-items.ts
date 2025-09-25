import type { AdvancedItem } from "../types/advanced-item.interface.js";
import type { Item } from "../types/types";
import { INITIAL_AVALIABLE_CRAFT_ITEMS } from "./initial-avaliable-craft-items.ts";

const wheel = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "wheel")!;
const gear = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "gear")!;
const bolt = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "bolt")!;
const frame = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "frame")!;
const wire = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "wire")!;
const transistor = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "transistor")!;
const board = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "board")!;
const cap = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "cap")!;
const tube = INITIAL_AVALIABLE_CRAFT_ITEMS.find((i) => i.item.type === "tube")!;

export interface itempro  {
	schema: (AdvancedItem | null)[][];
	item: Item;
}

export const ADVANCED_CRAFT_ITEMS: itempro[] = [
	{
		item: {
			id: "wheels-1",
			type: "wheels",
			name: "Wheels",
			icon: "/src/assets/img/icons/wheels.png",
			description: "wheels",
		},
		schema: [
			[wheel, null, wheel],
			[null, null, null],
			[wheel, null, wheel],
		],
	},
	{
		item: {
			id: "engine-1",
			type: "engine",
			name: "Engine",
			icon: "/src/assets/img/icons/engine.png",
			description: "engine",
		},
		schema: [
			[transistor, wire, board],
			[gear, null, bolt],
			[null, null, null],
		],
	},
];

const engine = ADVANCED_CRAFT_ITEMS.find((i) => i.item.type === "engine")!;
const wheels = ADVANCED_CRAFT_ITEMS.find((i) => i.item.type === "wheels")!;

export const FINAL_CRAFT_ITEM: itempro[] = [
	{
		item: {
			id: "george-1",
			type: "george",
			name: "George",
			icon: "/src/assets/img/icons/george.png",
			description: "george",
		},
		schema: [
			[null, cap, null],
			[null, engine, null],
			[wheels, frame, tube],
		],
	}
]