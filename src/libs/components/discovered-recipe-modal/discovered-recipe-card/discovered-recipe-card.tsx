import styles from "./discovered-recipe-card.module.css";
import type { AdvancedItem } from "~/libs/types/types.ts";

type Props = {
	recipe: AdvancedItem;
};

const DiscoveredRecipeCard = ({ recipe }: Props) => {
	const { item, schema } = recipe;

	return (
		<div className={styles["recipe-card"]}>
			<div className={styles["recipe-header"]}>
				<div className={styles["result-icon"]}>
					<img
						src={item.icon}
						alt={item.name}
						className={styles["card-image"]}
					/>
				</div>
				<div className={styles["recipe-info"]}>
					<h3 className={styles["recipe-name"]}>{item.name}</h3>
					<p className={styles["recipe-description"]}>{item.description}</p>
					<span className={styles["status-badge"]}>✅ Discovered</span>
				</div>
			</div>

			<div className={styles["crafting-grid"]}>
				<div>
					{schema.map((row, rowIndex) => (
						<div key={rowIndex} className={styles["crafting-row"]}>
							{row.map((slot, colIndex) => {
								if (!slot) {
									return <div key={colIndex} className={styles["empty-slot"]}></div>;
								}

								const icon = slot.icon ?? slot.item?.icon;
								const name = slot.name ?? slot.item?.name;

								return (
									<div key={colIndex} className={styles["ingredient-slot"]}>
										<img
											src={icon}
											alt={name}
											className={styles["ingredient-image"]}
										/>
									</div>
								);
							})}
						</div>
					))}
				</div>

				<div className={styles["arrow"]}>→</div>

				<div className={styles["result-slot"]}>
					<img
						src={item.icon}
						alt={item.name}
						className={styles["result-image"]}
					/>
				</div>
			</div>
		</div>
	);
};

export { DiscoveredRecipeCard };
