import { useState } from "react";
import { useGameStore } from "~/libs/modules/store.module.js";
import { Cell } from "../cell/cell.jsx";
import { type Item, type CraftingSlot } from "~/libs/types/types.ts";

type ContextType = "inventory" | "crafting";

type DragItem = {
	item: Item | undefined;
	index: number;
	context: ContextType;
};

type DroppableCellProps = {
	item: Item | undefined;
	index: number;
	context: ContextType;
};

function DroppableCell({ item, index, context }: DroppableCellProps) {
	const moveItem = useGameStore((state) => state.moveItem);

	const [isOver, setIsOver] = useState(false);

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		const dragData: DragItem = { item, index, context };
		e.dataTransfer.setData("application/json", JSON.stringify(dragData));
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault(); // иначе drop не сработает
		setIsOver(true);
	};

	const handleDragLeave = () => {
		setIsOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsOver(false);

		try {
			const dragged: DragItem = JSON.parse(
				e.dataTransfer.getData("application/json"),
			);
			if (dragged.context !== context || dragged.index !== index) {
				moveItem(dragged, { context, index });
			}
		} catch (err) {
			console.error("Error on drop:", err);
		}
	};

	return (
		<div
			draggable={!!item}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			style={{
				backgroundColor: isOver ? "rgba(0,255,0,0.2)" : "transparent",
				cursor: item ? "grab" : "default",
			}}
		>
			<Cell item={item} context={context} index={index} />
		</div>
	);
}

function InventoryDnd() {
	const inventory = useGameStore((state) => state.inventory);

	return (
		<div>
			<h3>Inventory</h3>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(5, 64px)",
					gap: "8px",
				}}
			>
				{inventory.items.map((item: Item | undefined, index: number) => (
					<DroppableCell
						key={index}
						item={item}
						index={index}
						context="inventory"
					/>
				))}
			</div>
		</div>
	);
}

function CraftingDnd() {
	const craftingTable = useGameStore((state) => state.craftingTable);

	return (
		<div>
			<h3>Crafting Table</h3>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 64px)",
					gap: "8px",
				}}
			>
				{craftingTable.map((slot: CraftingSlot, index: number) => (
					<DroppableCell
						key={slot.id}
						item={slot.item}
						index={index}
						context="crafting"
					/>
				))}
			</div>
		</div>
	);
}

export function DndWrapper() {
	return (
		<div style={{ display: "flex", gap: "32px" }}>
			<InventoryDnd />
			<CraftingDnd />
		</div>
	);
}
