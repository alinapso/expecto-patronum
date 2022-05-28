import FormElemenetDto from "./FormElementDto";

export default class FormSectionDto {
	id: number;
	name: string;
	title: string;
	active?: boolean = false;
	elements: FormElemenetDto[];
	icon: string;
	onNextClick?: (id: number) => void;
	onNavClick?: (id: number) => void;
	isLast?: boolean = false;
	ref?: any;
	constructor(
		id: number,
		name: string,
		title: string,
		icon: string,
		elements: FormElemenetDto[],
		onNextClick?: (id: number) => void,
		onNavClick?: (id: number) => void,
		active?: boolean,
		isLast?: boolean,
		ref?: any
	) {
		this.id = id;
		this.name = name;
		this.title = title;
		this.icon = icon;
		this.elements = elements;
		this.active = active ? active : false;
		this.onNextClick = onNextClick;
		this.onNavClick = onNavClick;
		this.isLast = isLast;
		this.ref = ref;
	}
}
