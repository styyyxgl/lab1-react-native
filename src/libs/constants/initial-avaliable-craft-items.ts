import type { AdvancedItem } from "~/libs/types/advanced-item.interface.js";

import { INITIAL_ITEMS } from "~/libs/constants/constants.js";

const iron = INITIAL_ITEMS.find((i) => i.type === "iron")!;
const plastic = INITIAL_ITEMS.find((i) => i.type === "plastic")!;
const energy = INITIAL_ITEMS.find((i) => i.type === "energy")!;

export const INITIAL_AVALIABLE_CRAFT_ITEMS: AdvancedItem[] = [
	{
		item: {
			id: "bolt-1",
			type: "bolt",
			name: "Bolt",
			icon: "/src/assets/img/icons/bolt.png",
			description: "bolt",
		},
		schema: [
			[iron, iron, null],
			[null, null, null],
			[null, null, null],
		],
	},
	{
		item: {
			id: "wheel-1",
			type: "wheel",
			name: "Wheel",
			icon: "/src/assets/img/icons/wheel.png",
			description: "wheel",
		},
		schema: [
			[null, plastic, null],
			[plastic, energy, plastic],
			[null, plastic, null],
		],
	},
	{
		item: {
			id: "gear-1",
			type: "gear",
			name: "Gear",
			icon: "/src/assets/img/icons/gear.png",
			description: "gear",
		},
		schema: [
			[null, iron, null],
			[iron, null, iron],
			[null, iron, null],
		],
	},
	{
		item: {
			id: "frame-1",
			type: "frame",
			name: "Frame",
			icon: "/src/assets/img/icons/frame.png",
			description: "frame",
		},
		schema: [
			[iron, null, iron],
			[plastic, null, plastic],
			[plastic, plastic, plastic],
		],
	},
	{
		item: {
			id: "transistor-1",
			type: "transistor",
			name: "Transistor",
			icon: "/src/assets/img/icons/transistor.png",
			description: "transistor",
		},
		schema: [
			[null, energy, null],
			[null, iron, null],
			[null, plastic, null],
		],
	},
	{
		item: {
			id: "board-1",
			type: "board",
			name: "Board",
			icon: "/src/assets/img/icons/board.png",
			description: "board",
		},
		schema: [
			[null, null, null],
			[null, iron, null],
			[plastic, plastic, plastic],
		],
	},
	{
		item: {
			id: "wire-1",
			type: "wire",
			name: "Wire",
			icon: "/src/assets/img/icons/wire.png",
			description: "wire",
		},
		schema: [
			[null, energy, null],
			[null, plastic, null],
			[null, plastic, null],
		],
	},
	{
		item: {
			id: "cap-1",
			type: "cap",
			name: "Cap",
			icon: "/src/assets/img/icons/cap.png",
			description: "cap",
		},
		schema: [
			[plastic, plastic, plastic],
			[plastic, null, plastic],
			[null, null, null],
		],
	},
	{
		item: {
			id: "tube-1",
			type: "tube",
			name: "Tube",
			icon: "/src/assets/img/icons/tube.png",
			description: "tube",
		},
		schema: [
			[plastic, plastic, plastic],
			[null, iron, null],
			[null, plastic, null],
		],
	}
];