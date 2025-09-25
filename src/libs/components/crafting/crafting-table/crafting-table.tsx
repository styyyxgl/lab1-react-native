import { useGameStore } from "~/libs/modules/store.module.js";
import { CraftingSlotComponent } from "../CraftingSlotComponent";

import styles from "./crafting-table.module.css";

const CraftingTable = () => {
	const craftingTable = useGameStore((s) => s.craftingTable);
console.log(craftingTable)
	return (
		<div className={styles["crafting-table"]}>
			{craftingTable.map((slot, index) => (
				<CraftingSlotComponent key={slot.id} slot={slot} index={index} />
			))}
		</div>
	);
};

export { CraftingTable };
