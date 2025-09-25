import { type Inventory } from "./inventory.interface.js";
import { type AdvancedItem } from "./advanced-item.interface.js";
import { type CraftingTable } from "./crafting-table.intefrace.js";
import { type Item } from "./item.interface.js";

export interface Game {
	inventory: Inventory;
	craftingTable: CraftingTable;
	unlockedItems: AdvancedItem[];
	baseItems: Item[];
	availableForCrafting: AdvancedItem[],
	advancedCraftItems: AdvancedItem[],
	finalCraftItem: AdvancedItem[];
}
