import { RefObject, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import FormElementDto, { FormElementTypes } from "../types/FormElementDto";

const FormElement = ({ elementDef }: { elementDef: FormElementDto }) => {
	return elemenetFactorey(elementDef);
};
function elemenetFactorey(elem: FormElementDto) {
	let params = {};
	if (!elem.ref) elem.ref = useRef<HTMLInputElement>(null);
	switch (elem.elemetType) {
		case FormElementTypes.Text:
			params = { type: "text" };
		case FormElementTypes.Email:
			params = { type: "email" };
		case FormElementTypes.Textarea:
			params = { as: "textarea", rows: 5 };
		default:
			params = {};
	}
	return (
		<Form.Group className="col-md-6 form-group">
			<Form.Label>{elem.labelText}</Form.Label>
			<Form.Control
				{...params}
				className="form-control"
				required={elem.required}
				id={elem.id}
				name={elem.name}
				placeholder={elem.placeholder}
				ref={elem.ref}
			/>
		</Form.Group>
	);
}
export default FormElement;
