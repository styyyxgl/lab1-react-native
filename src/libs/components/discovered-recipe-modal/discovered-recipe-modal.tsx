import { useEffect } from "react";
import styles from "./discovered-recipe-modal.module.css";
import { DiscoveredRecipeCard } from "./discovered-recipe-card/discovered-recipe-card.jsx";
import { useGameStore } from "~/libs/modules/store.module.js";
import type { AdvancedItem } from "~/libs/types/types.ts";

type Properties = {
	isOpen: boolean;
	onClose: () => void;
};

const DiscoveredRecipeModal = ({ isOpen, onClose }: Properties) => {
	const unlockedItems = useGameStore((state) => state.unlockedItems);

	// Явно указываем, что это массив AdvancedItem
	const discoveredItems: AdvancedItem[] = Array.isArray(unlockedItems)
		? unlockedItems
		: (Array.from(unlockedItems ?? []) as AdvancedItem[]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	return isOpen ? (
		<div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header"]}>
					<h2 className={styles["modal-title"]}>
						🔍 Discovered Recipes ({discoveredItems.length})
					</h2>
					<button className={styles["close-button"]} onClick={onClose}>
						×
					</button>
				</div>
				<div className={styles["modal-body"]}>
					<div className={styles["recipes-list"]}>
						{discoveredItems.length === 0 ? (
							<div className={styles["empty-state"]}>
								<span className={styles["empty-icon"]}>📋</span>
								<div className={styles["empty-text"]}>
									No recipes discovered yet! Start crafting to discover new
									recipes.
								</div>
							</div>
						) : (
							discoveredItems.map((recipe) => (
								<DiscoveredRecipeCard key={recipe.item.id} recipe={recipe} />
							))
						)}
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export { DiscoveredRecipeModal };
