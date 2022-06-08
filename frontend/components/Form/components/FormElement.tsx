import { DragDropMulti, DragDropSingle, DragDropExpenses } from "./DragAndDrop";
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
		case FormElementTypes.Number:
			params = { type: "text", pattern: "([0-9]*[.])?[0-9]+" };
			break;
		case FormElementTypes.Email:
			params = { type: "email" };
			break;
		case FormElementTypes.Textarea:
			params = { as: "textarea", rows: 5, pattern: "[a-zA-Z0-9_.-:]+" };
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
					defualtValue={elem.initValue}
					label={elem.labelText}></DragDropMulti>
			);
		case FormElementTypes.Docs:
			return (
				<DragDropMulti
					fileTypes={["JPG", "PNG", "GIF", "DOC", "DOCX", "PDF"]}
					ref={elem.ref}
					categoryType="DOC"
					defualtValue={elem.initValue}></DragDropMulti>
			);
		case FormElementTypes.Expenses:
			return (
				<DragDropExpenses
					fileTypes={["JPG", "PNG", "GIF", "DOC", "DOCX", "PDF"]}
					ref={elem.ref}
					categoryType="DOC"
					defualtValue={elem.initValue}
					label={elem.labelText}></DragDropExpenses>
			);
		case FormElementTypes.Datepicker:
			params = { type: "date" };
			break;
		case FormElementTypes.DropDownList:
			return elem.options ? (
				<Form.Group className={`${elem.style} form-group`}>
					<Form.Label htmlFor="exampleFormControlSelect1">{elem.labelText}</Form.Label>

					<select className="form-select" id={elem.id} ref={elem.ref}>
						{elem.options.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
				</Form.Group>
			) : (
				<h5>no options</h5>
			);
		default:
			params = {};
	}
	return (
		<Form.Group className={`${elem.style} form-group`} key={elem.name}>
			<Form.Label>{elem.labelText}</Form.Label>
			<Form.Control
				type=""
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
