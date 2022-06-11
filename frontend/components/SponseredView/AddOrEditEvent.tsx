import React from "react";
import { Modal } from "react-bootstrap";
import DynamicForm from "../Form";
import { FormElementTypes } from "../Form/types/FormElementDto";

export const AddOrEditEvent = ({
	show,
	setShow,
	handleSubmit,
	initValue,
}: {
	show: boolean;
	setShow: any;
	handleSubmit: (values: any) => void;
	initValue?: any;
}) => {
	const formTabs = [
		{
			id: 1,
			name: "Event Details",
			title: "Event Details",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "title",
					name: "title",
					labelText: "Event title",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "Event title",
				},
				{
					id: "eventDate",
					name: "eventDate",
					labelText: "Evenet time",
					elemetType: FormElementTypes.Datepicker,
					required: false,
					placeholder: "Evenet Time",
				},
				{
					id: "description",
					name: "description",
					labelText: "Event Description",
					elemetType: FormElementTypes.Textarea,
					required: true,
					placeholder: "write description here",
				},

				{
					id: "images",
					name: "images",
					labelText: "Images",
					elemetType: FormElementTypes.Images,
					required: true,
					placeholder: "Images",
				},
				{
					id: "expenses",
					name: "expenses",
					labelText: "Expenses",
					elemetType: FormElementTypes.Expenses,
					required: true,
					placeholder: "Expenses",
				},
			],
		},
	];
	return (
		<Modal size="lg" show={show}>
			<Modal.Header className="d-flex justify-content-between">
				<h5 className="modal-title" id="post-modalLabel">
					{initValue ? "Edit event" : "Add New Event"}
				</h5>
				<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
					<i className="ri-close-fill"></i>
				</button>
			</Modal.Header>
			<Modal.Body>
				<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} initValue={initValue} />
			</Modal.Body>
		</Modal>
	);
};
export default AddOrEditEvent;
