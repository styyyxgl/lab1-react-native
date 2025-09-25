import { type ItemType } from "./item.type.js";

export interface Item {
	id: string;
	type: ItemType;
	name: string;
	icon: string;
	description: string;
}
