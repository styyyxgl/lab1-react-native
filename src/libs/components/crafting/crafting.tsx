import { Cell } from "../cell/cell";
import { CraftingTable } from "./crafting-table/crafting-table";
import { useGameStore } from "~/libs/modules/store.module.js";

import styles from "./crafting.module.css";

const Crafting = () => {
	const craftedItem = useGameStore((s) => s.craftedItem());
	const takeCraftedItem = useGameStore((s) => s.takeCraftedItem);

	return (
		<div className={styles["wrapper"]}>
			<h2>Crafting</h2>
			<div className={styles["crafting-container"]}>
				<CraftingTable />
				{"->"}
				<div onClick={takeCraftedItem}>
					<Cell item={craftedItem} />
				</div>
			</div>
		</div>
	);
};

export { Crafting };
