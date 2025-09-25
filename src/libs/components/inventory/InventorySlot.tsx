import { useDrag, useDrop } from "react-dnd";
import { useGameStore } from "~/libs/modules/store.module.js";
import { Cell } from "../cell/cell.jsx";
import { type Item } from "~/libs/types/types.js";
import React from "react";

const ItemTypes = { ITEM: "item" };

type InventorySlotProps = {
	item?: Item | null;
	index: number;
};

export const InventorySlot = ({ item, index }: InventorySlotProps) => {
	const moveItem = useGameStore((s) => s.moveItem);
	const ref = React.useRef<HTMLDivElement>(null);

	const [, drag] = useDrag({
		type: ItemTypes.ITEM,
		item: { item, index, context: "inventory" as const },
		canDrag: !!item,
	});

	const [, drop] = useDrop({
		accept: ItemTypes.ITEM,
		drop: (dragged: { item?: Item | null; index: number; context: string }) => {
			moveItem(
				{ context: dragged.context as "inventory" | "crafting", index: dragged.index },
				{ context: "inventory", index }
			);
		},
	});

	drag(drop(ref)); // merge drag & drop

	return (
		<div ref={ref}>
			<Cell item={item ?? undefined} context="inventory" index={index} />
		</div>
	);
};
