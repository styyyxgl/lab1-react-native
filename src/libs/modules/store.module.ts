import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type {
	Inventory,
	CraftingSlot,
	CraftingTable,
	Game,
	Item,
	AdvancedItem,
} from "~/libs/types/types.js";
import {
	INITIAL_ITEMS,
	INITIAL_AVALIABLE_CRAFT_ITEMS,
	ADVANCED_CRAFT_ITEMS,
} from "~/libs/constants/constants.js";
import { FINAL_CRAFT_ITEM } from "~/libs/constants/advanced-craft-items.ts";

export const initialCraftingTable: CraftingSlot[] = Array.from(
	{ length: 9 },
	(_, i) => ({ id: `slot${i + 1}` }),
);

const useGameStore = create<
	Game & {
	addToInventory: (item: Item) => void;
	removeFromInventory: (itemId: string) => void;
	unlockRecipe: (recipe: AdvancedItem) => void;
	addToCraftingTable: (slotId: string, item: Item) => void;
	removeFromCraftingTable: (slotId: string) => void;
	moveItem: (
		from: { context: "inventory" | "crafting"; index: number },
		to: { context: "inventory" | "crafting"; index: number },
	) => void;
	craftedItem: () => Item | null;
	takeCraftedItem: () => void;
}
>()(
	persist(
		(set, get) => ({
			// !!! Inventory теперь может содержать undefined
			inventory: { items: [] as Array<Item | undefined> } as Inventory,
			craftingTable: initialCraftingTable as CraftingTable,
			baseItems: INITIAL_ITEMS,
			unlockedItems: [] as AdvancedItem[],
			availableForCrafting: INITIAL_AVALIABLE_CRAFT_ITEMS,
			advancedCraftItems: ADVANCED_CRAFT_ITEMS,
			finalCraftItem: FINAL_CRAFT_ITEM,

			addToInventory: (item: Item) =>
				set((state) => ({
					inventory: {
						items: [...state.inventory.items, { ...item, id: nanoid() }],
					},
				})),

			removeFromInventory: (id: string) =>
				set((state) => ({
					inventory: {
						items: state.inventory.items.filter(
							(i): i is Item => i !== undefined && i.id !== id,
						),
					},
				})),

			unlockRecipe: (recipe: AdvancedItem) =>
				set((state) => {
					if (!state.unlockedItems.find((r) => r.item.id === recipe.item.id)) {
						return { unlockedItems: [...state.unlockedItems, recipe] };
					}
					return state;
				}),

			addToCraftingTable: (slotId, item) =>
				set((state) => ({
					craftingTable: state.craftingTable.map((slot) =>
						slot.id === slotId ? { ...slot, item } : slot,
					),
				})),

			removeFromCraftingTable: (slotId) =>
				set((state) => ({
					craftingTable: state.craftingTable.map((slot) =>
						slot.id === slotId ? { ...slot, item: undefined } : slot,
					),
				})),

			moveItem: (from, to) =>
				set((state) => {
					const newInventory = [...state.inventory.items];
					const newCrafting = [...state.craftingTable];

					let dragged: Item | undefined;

					// 1. достаём предмет из исходного места
					if (from.context === "inventory") {
						dragged = newInventory[from.index];
						if (!dragged) return state;
						newInventory[from.index] = undefined;
					} else {
						dragged = newCrafting[from.index].item;
						if (!dragged) return state;
						newCrafting[from.index] = {
							...newCrafting[from.index],
							item: undefined,
						};
					}

					// 2. кладём предмет в новое место
					if (to.context === "inventory") {
						const target = newInventory[to.index];

						if (target) {
							// swap
							if (from.context === "inventory") {
								newInventory[from.index] = target;
							} else {
								newCrafting[from.index] = {
									...newCrafting[from.index],
									item: target,
								};
							}
						}

						newInventory[to.index] = dragged;
					} else {
						const target = newCrafting[to.index].item;

						if (target) {
							// swap
							if (from.context === "inventory") {
								newInventory[from.index] = target;
							} else {
								newCrafting[from.index] = {
									...newCrafting[from.index],
									item: target,
								};
							}
						}

						newCrafting[to.index] = { ...newCrafting[to.index], item: dragged };
					}

					// 3. чистим массив inventory от "undefined"
					const cleanedInventory = newInventory.filter(
						(item): item is Item => Boolean(item),
					);

					return {
						...state,
						inventory: { ...state.inventory, items: cleanedInventory },
						craftingTable: newCrafting,
					};
				}),

			craftedItem: () => {
				const {
					craftingTable,
					availableForCrafting,
					advancedCraftItems,
					finalCraftItem,
				} = get();
				const currentSchema = craftingTable.map((slot) => slot.item ?? null);

				const allRecipes = [
					...availableForCrafting,
					...advancedCraftItems,
					...finalCraftItem,
				];

				for (const recipe of allRecipes) {
					const flatSchema = recipe.schema.flat();
					let matches = true;

					for (let i = 0; i < flatSchema.length; i++) {
						const expected = flatSchema[i];
						const actual = currentSchema[i];

						if (expected === null && actual === null) continue;
						if (expected === null && actual !== null) {
							matches = false;
							break;
						}
						if (expected !== null && actual === null) {
							matches = false;
							break;
						}
						const expectedType = expected?.type ?? expected?.item?.type;
						const actualType = actual?.type;

						if (expectedType !== actualType) {
							matches = false;
							break;
						}
					}

					if (matches) return recipe.item;
				}
				return null;
			},

			takeCraftedItem: () =>
				set((state) => {
					const crafted = get().craftedItem();
					if (!crafted) return state;

					const allRecipes = [
						...state.availableForCrafting,
						...state.advancedCraftItems,
						...state.finalCraftItem,
					];

					const recipe = allRecipes.find((r) => r.item.id === crafted.id);

					const newUnlockedItems = recipe
						? state.unlockedItems.find((r) => r.item.id === recipe.item.id)
							? state.unlockedItems
							: [...state.unlockedItems, recipe]
						: state.unlockedItems;

					const newState = {
						...state,
						inventory: {
							items: [...state.inventory.items, { ...crafted, id: nanoid() }],
						},
						craftingTable: state.craftingTable.map((slot) => ({
							...slot,
							item: undefined,
						})),
						unlockedItems: newUnlockedItems,
					};

					if (crafted.type === "george") {
						alert("🎉 Поздравляем! Вы создали George и выиграли игру!");
					}

					return newState;
				}),
		}),
		{
			name: "storage",
			partialize: (state) => ({
				inventory: state.inventory,
				craftingTable: state.craftingTable,
				unlockedItems: state.unlockedItems,
			}),
		},
	),
);

export { useGameStore };
