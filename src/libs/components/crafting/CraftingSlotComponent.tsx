import { useDrag, useDrop } from "react-dnd";
import { useGameStore } from "~/libs/modules/store.module.js";
import { Cell } from "../cell/cell.jsx";
import { type Item, type CraftingSlot } from "~/libs/types/types.js";

const ItemTypes = { ITEM: "item" };

type CraftingSlotProps = {
	slot: CraftingSlot;
	index: number;
};

export const CraftingSlotComponent = ({ slot, index }: CraftingSlotProps) => {
	const moveItem = useGameStore((s) => s.moveItem);

	const [, dragRef] = useDrag({
		type: ItemTypes.ITEM,
		item: { item: slot.item, index, context: "crafting" as const, slotId: slot.id },
		canDrag: !!slot.item,
	});

	const [, dropRef] = useDrop({
		accept: ItemTypes.ITEM,
		drop: (dragged: { item?: Item | null; index: number; context: string; slotId?: string }) => {
			moveItem(
				{ context: dragged.context as "inventory" | "crafting", index: dragged.index },
				{ context: "crafting", index }
			);
		},
	});

	// merge drag & drop refs
	const ref = (node: HTMLDivElement | null) => {
		dragRef(node);
		dropRef(node);
	};

	return (
		<div ref={ref}>
			<Cell item={slot.item} context="crafting" index={index} />
		</div>
	);
};
