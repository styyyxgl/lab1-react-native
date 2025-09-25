import { Cell } from "../cell/cell.jsx";

import { useGameStore } from "~/libs/modules/store.module.js";
import { type Item } from "~/libs/types/types.js";

import styles from "./resources.module.css";

const Resources = () => {
	const baseResources = useGameStore((state) => state.baseItems);
	const addToInventory = useGameStore((state) => state.addToInventory);

	const handleClick = (item: Item) => {
		addToInventory(item);
	};

	return (
		<div className={styles["resources"]}>
			{baseResources.map((item: Item) => (
				<div key={item.id} onClick={() => handleClick(item)}>
					<Cell item={item} />
				</div>
			))}
		</div>
	);
};

export { Resources };
