import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";

import { GameBoard } from "~/pages/game-board/game-board.jsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GameBoard />
	</StrictMode>,
);
