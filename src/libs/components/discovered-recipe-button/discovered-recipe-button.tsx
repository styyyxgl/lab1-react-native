import { useState } from "react";
import { DiscoveredRecipeModal } from "../discovered-recipe-modal/discovered-recipe-modal.jsx";
import styles from "./discovered-recipe-button.module.css";

const DiscoveredRecipeButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => setIsOpen((prev) => !prev);

	return (
		<>
			<button className={styles.button} onClick={toggleModal} />
			<DiscoveredRecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};

export { DiscoveredRecipeButton };
