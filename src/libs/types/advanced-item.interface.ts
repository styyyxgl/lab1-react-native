import { type Item } from "./item.interface.js";

export interface AdvancedItem  {
	schema: (Item | null)[][];
	item: Item;
}
