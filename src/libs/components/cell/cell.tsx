import { useGameStore } from "~/libs/modules/store.module.js";
import { type Item } from "~/libs/types/types.js";
import styles from "./cell.module.css";

type CellProps = {
	item?: Item | null;
	slotId?: string;
	context?: "inventory" | "crafting";
	index?: number;
};

const Cell = ({ item, context, index }: CellProps) => {
	const moveItem = useGameStore((s) => s.moveItem);

	const handleClick = () => {
		if (!item || index === undefined) return;

		const state = useGameStore.getState();

		if (context === "inventory") {
			const emptyIndex = state.craftingTable.findIndex((slot) => !slot.item);
			if (emptyIndex !== -1) {
				moveItem({ context: "inventory", index }, { context: "crafting", index: emptyIndex });
			}
		}

		if (context === "crafting") {
			const emptyIndex = state.inventory.items.findIndex((i) => !i);
			moveItem(
				{ context: "crafting", index },
				{ context: "inventory", index: emptyIndex !== -1 ? emptyIndex : state.inventory.items.length }
			);
		}
	};

	return (
		<div className={styles.cell} onClick={handleClick}>
			{item && <img src={item.icon} alt={item.name} />}
		</div>
	);
};

export { Cell };
