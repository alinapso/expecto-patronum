import { MutableRefObject, RefObject } from "react";

export default class FormElemenetDto {
	id: string;
	name: string;
	labelText: string;
	elemetType: FormElementTypes;
	required: boolean = false;
	placeholder: string;
	ref?: MutableRefObject<any>;
	style?: string;
	initValue?: any;
	constructor(
		id: string,
		name: string,
		elemetType: FormElementTypes,
		labelText: string,
		required?: boolean,
		placeholder?: string,
		initValue?: any,
		ref?: MutableRefObject<any>,
		style?: string
	) {
		this.id = id;
		this.name = name;
		this.elemetType = elemetType;
		this.labelText = labelText;
		this.required = required ? required : false;
		this.placeholder = placeholder ? placeholder : "";
		this.ref = ref;
		this.style = style;
		this.initValue = initValue;
	}
}
export enum FormElementTypes {
	Text,
	Email,
	Textarea,
	Datepicker,
	Profile,
	Images,
	Docs,
	Custom,
}
