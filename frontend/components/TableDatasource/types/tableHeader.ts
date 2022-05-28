import { SortDirection } from "./sortDirection";

export class TableHeader {
	name: string;
	mapKey: string;
	sortDirection?: SortDirection = SortDirection.None;
	customDecorators?: (id: any, arg: any) => any;
	constructor(name: string, mapKey: string, sortDirection?: SortDirection, customDecorators?: (id: any, arg: any) => any) {
		this.name = name;
		this.mapKey = mapKey;
		this.sortDirection = sortDirection ? sortDirection : SortDirection.None;
		this.customDecorators = customDecorators;
	}
}
