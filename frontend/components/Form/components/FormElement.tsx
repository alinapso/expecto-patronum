import DragDrop from "components/FileUpload";
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
			break;
		case FormElementTypes.Email:
			params = { type: "email" };
			break;
		case FormElementTypes.Textarea:
			params = { as: "textarea", rows: 5 };
			break;
		case FormElementTypes.Images:
			return <DragDrop fileTypes={["JPG", "PNG", "GIF"]}></DragDrop>;
		case FormElementTypes.Docs:
			return <DragDrop fileTypes={["DOC", "DOCX", "PDF"]}></DragDrop>;
		case FormElementTypes.Datepicker:
			params = { type: "date" };
			break;
		default:
			params = {};
	}
	return (
		<Form.Group className={`${elem.style} form-group`} key={elem.name}>
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
