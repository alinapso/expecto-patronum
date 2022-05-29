import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import FormElementDto, { FormElementTypes } from "../types/FormElementDto";

export default class FormElement extends React.Component<
	{
		elem: FormElementDto;
		ref;
	},
	{
		value: string;
	}
> {
	state = {
		value: "",
	};
	constructor(props: any) {
		super(props);
		this.state = {
			value: "",
		};

		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event: any) {
		//console.log(this);
		this.setState({ value: event.target.value });
	}
	getValue() {
		return this.state.value;
	}

	render() {
		//console.log(this.state);
		switch (this.props.elem.elemetType) {
			case FormElementTypes.Text:
				return (
					<Form.Group className="col-md-6 form-group">
						<Form.Label>{this.props.elem.labelText}</Form.Label>
						<Form.Control
							type="text"
							className="form-control"
							required={this.props.elem.required}
							id={this.props.elem.id}
							name={this.props.elem.name}
							placeholder={this.props.elem.placeholder}
							value={this.state.value}
							onChange={this.handleChange}
							ref
						/>
					</Form.Group>
				);
			case FormElementTypes.Email:
				return (
					<Form.Group className="col-md-6 form-group">
						<Form.Label>{this.props.elem.labelText}</Form.Label>
						<Form.Control
							type="email"
							className="form-control"
							required={this.props.elem.required}
							id={this.props.elem.id}
							name={this.props.elem.name}
							placeholder={this.props.elem.placeholder}
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</Form.Group>
				);
			case FormElementTypes.Textarea:
				return (
					<Form.Group className="col-md-12 form-group mb-3 ">
						<Form.Label>{this.props.elem.labelText}</Form.Label>
						<Form.Control
							as="textarea"
							id={this.props.elem.id}
							name={this.props.elem.name}
							rows={5}
							required={this.props.elem.required}
							value={this.state.value}
							onChange={this.handleChange}></Form.Control>
					</Form.Group>
				);
			default:
				return <>hi</>;
		}
	}
}
