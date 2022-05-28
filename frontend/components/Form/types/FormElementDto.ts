export default class FormElemenetDto {
	id: string;
	name: string;
	labelText: string;
	elemetType: FormElementTypes;
	required: boolean = false;
	placeholder: string;
	constructor(
		id: string,
		name: string,
		elemetType: FormElementTypes,
		labelText: string,
		required?: boolean,
		placeholder?: string
	) {
		this.id = id;
		this.name = name;
		this.elemetType = elemetType;
		this.labelText = labelText;
		this.required = required ? required : false;
		this.placeholder = placeholder ? placeholder : "";
	}
}
export enum FormElementTypes {
	Text,
	Email,
	Textarea,
	Datepicker,
	File,
	Custom,
}
