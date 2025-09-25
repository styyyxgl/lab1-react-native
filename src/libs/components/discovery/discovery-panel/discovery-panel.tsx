import styles from "./discovery-panel.module.css";
import { DiscoveryPanelCard } from "./discovery-panel-card/discovery-panel-card.jsx";
import { useGameStore } from "~/libs/modules/store.module.js";
import { INITIAL_ITEMS } from "~/libs/constants/constants.js";

const DiscoveryPanel = () => {
	const unlockedItems = useGameStore((state) => state.unlockedItems);

	// Get all recipes: basic + advanced
	const availableForCrafting = useGameStore((state) => state.availableForCrafting);
	const advancedCraftItems = useGameStore((state) => state.advancedCraftItems);
	const allRecipes = [...availableForCrafting, ...advancedCraftItems];

	const baseTypes = INITIAL_ITEMS.map((i) => i.type);

	const discoverableRecipes = allRecipes.filter((recipe) => {
		if (unlockedItems.find((r) => r.item.id === recipe.item.id)) return false;

		const flatSchema = recipe.schema.flat().filter(Boolean);

		// Show recipe immediately if all ingredients are base items
		const allBase = flatSchema.every((ingredient) => baseTypes.includes(ingredient!.type));
		if (allBase) return true;

		// Show advanced recipe only if all non-base ingredients are already unlocked
		return flatSchema.every((ingredient) => {
			if (!ingredient) return true;
			if (baseTypes.includes(ingredient.type)) return true;
			return unlockedItems.some((r) => r.item.type === ingredient.type);
		});
	});

	return (
		<div className={styles["discovery-panel"]}>
			{discoverableRecipes.length === 0 ? (
				<div className={styles["empty-state"]}>
					No recipes available to discover yet.
				</div>
			) : (
				discoverableRecipes.map((recipe) => (
					<DiscoveryPanelCard key={recipe.item.id} item={recipe} />
				))
			)}
		</div>
	);
};

export { DiscoveryPanel };
