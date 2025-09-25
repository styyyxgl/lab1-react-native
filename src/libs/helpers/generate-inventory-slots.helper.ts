import type { Item } from "~/libs/types/types.js";

const generateInventorySlots = (
	items: Item[],
	itemsPerRow = 9,
	initialRows = 3,
	maxRows = 8,
): (Item | null)[] => {
	let totalSlots = initialRows * itemsPerRow;

	while (
		items.length > totalSlots - itemsPerRow &&
		totalSlots / itemsPerRow < maxRows
	) {
		totalSlots += itemsPerRow;
	}

	return Array.from({ length: totalSlots }, (_, i) => items[i] ?? null);
};

export { generateInventorySlots };
