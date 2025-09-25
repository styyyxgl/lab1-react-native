import styles from "./discovery.module.css";
import { DiscoveryPanel } from "./discovery-panel/discovery-panel.jsx";

const Discovery = () => {
	return (
		<div className={styles["discovery"]}>
			<DiscoveryPanel />
		</div>
	);
};

export { Discovery };
