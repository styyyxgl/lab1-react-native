import styles from "./garbage.module.css";
import { useGameStore } from "~/libs/modules/store.module.js";
import { useDrop } from "react-dnd";
import { type Item } from "~/libs/types/types.js";

const ItemTypes = {
	ITEM: "item",
};

const Garbage = () => {
	const removeFromInventory = useGameStore((s) => s.removeFromInventory);
	const removeFromCraftingTable = useGameStore(
		(s) => s.removeFromCraftingTable,
	);

	const [{ isOver }, dropRef] = useDrop({
		accept: ItemTypes.ITEM,
		drop: (dragged: {
			item?: Item | null;
			context: "inventory" | "crafting";
			index: number;
			slotId?: string;
		}) => {
			if (!dragged.item) return;

			if (dragged.context === "inventory") {
				removeFromInventory(dragged.item.id);
			} else if (dragged.context === "crafting") {
				removeFromCraftingTable(dragged.slotId ?? dragged.index.toString());
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleClearInventory = () => {
		if (window.confirm("Clear inventory?")) {
			useGameStore.setState({ inventory: { items: [] } });
		}
	};

	const handleResetGame = () => {
		if (window.confirm("Reset game?")) {
			localStorage.removeItem("storage");
			location.reload();
		}
	};

	return (
		<div
			ref={(el) => {
				if (el) dropRef(el);
			}}
			className={styles["garbage-container"]}
		>
			<div
				className={`${styles["garbage"]} ${isOver ? styles["hovered"] : ""}`}
			/>
			<div className={styles["buttons-container"]}>
				<button
					className={styles["clear-button"]}
					title="Clear all items from inventory"
					onClick={handleClearInventory}
				>
					Clear Inventory
				</button>
				<button
					className={styles["reset-button"]}
					title="Reset entire game progress"
					onClick={handleResetGame}
				>
					Reset Game
				</button>
			</div>
		</div>
	);
};

export { Garbage };
