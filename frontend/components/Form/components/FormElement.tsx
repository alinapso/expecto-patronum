import { DragDropMulti, DragDropSingle } from "./DragAndDrop";
import { useRef } from "react";
import { Form } from "react-bootstrap";
import FormElementDto, { FormElementTypes } from "../types/FormElementDto";

const FormElement = ({ elementDef }: { elementDef: FormElementDto }) => {
	return elemenetFactorey(elementDef);
};
function elemenetFactorey(elem: FormElementDto) {
	let params = {};
	if (!elem.ref) elem.ref = useRef<HTMLInputElement>(elem.initValue);
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
		case FormElementTypes.Profile:
			return (
				<DragDropSingle fileTypes={["JPG", "PNG", "GIF"]} ref={elem.ref} defualtValue={elem.initValue}></DragDropSingle>
			);
		case FormElementTypes.Images:
			return (
				<DragDropMulti
					fileTypes={["JPG", "PNG", "GIF"]}
					ref={elem.ref}
					categoryType="IMAGE"
					defualtValue={elem.initValue}></DragDropMulti>
			);
		case FormElementTypes.Docs:
			return (
				<DragDropMulti
					fileTypes={["JPG", "PNG", "GIF", "DOC", "DOCX", "PDF"]}
					ref={elem.ref}
					categoryType="DOC"
					defualtValue={elem.initValue}></DragDropMulti>
			);
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
				defaultValue={elem.initValue}
			/>
		</Form.Group>
	);
}
export default FormElement;
