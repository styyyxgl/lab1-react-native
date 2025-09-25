import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef } from "react";
import { useGameStore } from "~/libs/modules/store.module.js";
import { Cell } from "../cell/cell.jsx";
import { type Item, type CraftingSlot } from "~/libs/types/types.ts";

const ItemTypes = {
	ITEM: "item",
};

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

function DraggableCell({ item, index, context }: DroppableCellProps) {
	const [{ isDragging }, dragRef] = useDrag<DragItem, void, { isDragging: boolean }>({
		type: ItemTypes.ITEM,
		item: { item, index, context },
		canDrag: Boolean(item),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const divRef = useRef<HTMLDivElement>(null);
	dragRef(divRef);

	return (
		<div
			ref={divRef}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: item ? "grab" : "default",
			}}
		>
			<Cell item={item} context={context} index={index} />
		</div>
	);
}

function DroppableCell({ item, index, context }: DroppableCellProps) {
	const moveItem = useGameStore((state) => state.moveItem);

	const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
		accept: ItemTypes.ITEM,
		drop: (dragged) => {
			if (dragged.context !== context || dragged.index !== index) {
				moveItem(dragged, { context, index });
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const divRef = useRef<HTMLDivElement>(null);
	dropRef(divRef);

	return (
		<div
			ref={divRef}
			style={{
				backgroundColor: isOver ? "rgba(0,255,0,0.2)" : "transparent",
			}}
		>
			<DraggableCell item={item} index={index} context={context} />
		</div>
	);
}

function InventoryDnd() {
	const inventory = useGameStore((state) => state.inventory);

	return (
		<div>
			<h3>Inventory</h3>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 64px)", gap: "8px" }}>
				{inventory.items.map((item: Item | undefined, index: number) => (
					<DroppableCell key={index} item={item} index={index} context="inventory" />
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
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: "8px" }}>
				{craftingTable.map((slot: CraftingSlot, index: number) => (
					<DroppableCell key={slot.id} item={slot.item} index={index} context="crafting" />
				))}
			</div>
		</div>
	);
}

export function DndWrapper() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div style={{ display: "flex", gap: "32px" }}>
				<InventoryDnd />
				<CraftingDnd />
			</div>
		</DndProvider>
	);
}
