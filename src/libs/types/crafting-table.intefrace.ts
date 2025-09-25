import { type Item } from "./item.interface.js";

export interface CraftingSlot {
	id: string;
	item?: Item;
}

export type CraftingTable = CraftingSlot[];
