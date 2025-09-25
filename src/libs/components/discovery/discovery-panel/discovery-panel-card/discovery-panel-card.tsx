import styles from "./discovery-panel-card.module.css";
import { type AdvancedItem } from "~/libs/types/types.ts";

type Props = {
	item: AdvancedItem;
};

const DiscoveryPanelCard = ({ item }: Props) => {
	return (
		<div className={styles["card"]}>
			<div className={styles["card-image-container"]}>
				<img
					src={item.item.icon}
					alt={item.item.name}
					className={styles["card-image"]}
				/>
			</div>
			<div>
				<div className={styles["item-name"]}>{item.item.name}</div>
				<div className={styles["item-status"]}>Ready to craft</div>
			</div>
		</div>
	);
};

export { DiscoveryPanelCard };
