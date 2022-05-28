import { useState } from "react";
import { Form } from "react-bootstrap";
import FormElementDto, { FormElementTypes } from "../types/FormElementDto";

const FormElement = ({ elementDef }: { elementDef: FormElementDto }) => {
	const [value, setValue] = useState("");
	const onChange = (event: any) => {
		setValue(event.target.value);
	};
	return elemenetFactorey(elementDef, value, onChange);
};
function elemenetFactorey(elem: FormElementDto, value: any, onChange: (event: any) => void) {
	switch (elem.elemetType) {
		case FormElementTypes.Text:
			return (
				<Form.Group className="col-md-6 form-group">
					<Form.Label>{elem.labelText}</Form.Label>
					<Form.Control
						type="text"
						className="form-control"
						required={elem.required}
						id={elem.id}
						name={elem.name}
						placeholder={elem.placeholder}
						value={value}
						onChange={onChange}
					/>
				</Form.Group>
			);
		case FormElementTypes.Email:
			return (
				<Form.Group className="col-md-6 form-group">
					<Form.Label>{elem.labelText}</Form.Label>
					<Form.Control
						type="email"
						className="form-control"
						required={elem.required}
						id={elem.id}
						name={elem.name}
						placeholder={elem.placeholder}
						value={value}
						onChange={onChange}
					/>
				</Form.Group>
			);
		case FormElementTypes.Textarea:
			return (
				<Form.Group className="col-md-12 form-group mb-3 ">
					<Form.Label>{elem.labelText}</Form.Label>
					<Form.Control
						as="textarea"
						id={elem.id}
						name={elem.name}
						rows={5}
						required={elem.required}
						value={value}
						onChange={onChange}></Form.Control>
				</Form.Group>
			);
		default:
			return <>hi</>;
	}
}
export default FormElement;
