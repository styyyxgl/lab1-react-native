import { InventorySlot } from "./InventorySlot";
import { useGameStore } from "~/libs/modules/store.module.js";
import { generateInventorySlots } from "~/libs/helpers/helpers.js";
import styles from "./inventory.module.css";

const Inventory = () => {
	const inventory = useGameStore((s) => s.inventory);
	const slots = generateInventorySlots(inventory.items);

	return (
		<div className={styles["inventory-wrapper"]}>
			<div className={styles["inventory-title"]}>Inventory</div>
			<div className={styles["inventory-container"]}>
				<div className={styles["inventory"]}>
					{slots.map((item, index) => (
						<InventorySlot key={index} item={item} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export { Inventory };
