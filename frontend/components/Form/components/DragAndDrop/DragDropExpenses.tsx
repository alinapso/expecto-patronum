import React, { Component, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card, Form } from "react-bootstrap";

import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";

import { getFileType, dialogYesNo, RowImage, FileTypes } from "./common";
import { UploadedFile } from "expecto-patronum-common";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Link from "next/link";
import FormElement from "../FormElement";
import { FormElementTypes } from "components/Form/types/FormElementDto";
import Expenses from "expecto-patronum-common/entities/expenses";
type DragDropExpensesProps = {
	fileTypes: string[];
	defualtValue?: any[];
	categoryType: string;
	label?: string;
};
type DragDropExpensesState = {
	value: Expenses[];
	showDeleteDialog: boolean;
};

export class DragDropExpenses extends Component<DragDropExpensesProps> {
	fileTypes: string[];
	value: Expenses[];

	constructor(props: DragDropExpensesProps) {
		super(props);
		this.fileTypes = props.fileTypes;
		this.value = [];
		if (this.props.defualtValue != undefined) {
			this.props.defualtValue.forEach((expense: Expenses, index) => {
				this.value.push({
					UploadedFile: expense.UploadedFile,
					uploadedFileId: expense.uploadedFileId,
					sum: expense.sum,
					title: expense.title,
					id: expense.id,
				});
			});
		}

		this.state = {
			value: this.value,
			showDeleteDialog: false,
		};
	}
	state: DragDropExpensesState = {
		value: [],
		showDeleteDialog: false,
	};

	handleDelete = async (index: number) => {
		console.log("handleDelete");
		const deletedFile = this.value[index];
		console.log(deletedFile);
		this.state.value.splice(index, 1);
		this.setState((state) => ({ value: [...this.state.value] }));
		this.value.splice(index, 1);
		const res = await RemoteApiCall({
			method: "DELETE",
			url: `/expenses/${deletedFile.id}`,
		});
	};
	handleOnChange = (type: string, tableRow: Expenses, value: string) => {
		if (type == "title") {
			tableRow.title = value;
		}
		if (type == "sum") {
			tableRow.sum = +value;
		}
	};
	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file, this.props.categoryType);
			if (result && result.status == 201) {
				const newItem = {
					UploadedFile: result.data,
					uploadedFileId: result.data.id,
					sum: 0,
					title: file.title,
				};

				this.value.push(newItem);
				this.setState((state) => ({
					value: [...this.state.value, newItem],
				}));
			}
		}
	};

	render() {
		return (
			<Col sm={12} className="mb-3">
				<Card>
					<Card.Header className="">
						<div className="mb-3">
							<h4>{this.props.label}</h4>
						</div>
						<div className="input-block-level">
							<FileUploader handleChange={this.handleUpload} name="file" types={this.fileTypes} />
						</div>
					</Card.Header>
					<Card.Body>
						{this.state.value && this.state.value.length > 0 ? (
							<div id="table" className="table-editable">
								<table className="table files-lists table table-striped ">
									<thead>
										<tr>
											<th scope="col">
												<div className=" text-center">
													<input type="checkbox" className="form-check-input" />
												</div>
											</th>
											<th scope="col">File Name</th>
											<th scope="col">Title</th>
											<th scope="col">Sum</th>
										</tr>
									</thead>
									<tbody>
										{this.value.map((rowData, index) => (
											<TableRow
												data={rowData}
												index={index}
												key={index}
												onDelete={() => this.handleDelete(index)}
												handleOnChange={(type: string, value: string) => this.handleOnChange(type, rowData, value)}
											/>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<></>
						)}
					</Card.Body>
				</Card>
			</Col>
		);
	}
}
export const TableRow = ({
	data,
	onDelete,
	index,
	handleOnChange,
}: {
	data: Expenses;
	onDelete: () => void;
	index: number;
	handleOnChange: (type: string, value: string) => void;
}) => {
	const fileNameSnip = (name: string) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};

	const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
	return (
		<tr>
			<td>
				<div className=" text-center">
					<input type="checkbox" className="form-check-input" />
				</div>
			</td>
			<td>
				<RowImage fileType={data.UploadedFile ? getFileType(data.UploadedFile.postfix) : FileTypes.Undefined} />
			</td>
			<td>
				<Form.Group className="form-group pt-3" key={2 * index + 1}>
					<Form.Control
						type="text"
						// pattern="^[a-zA-Z0-9_.-]*$"
						className="form-control"
						required={true}
						id={`${2 * index + 1}`}
						name={`${2 * index + 1}`}
						placeholder={"title"}
						onChange={(event) => handleOnChange("title", event.target.value)}
						defaultValue={data.title}
					/>
				</Form.Group>
			</td>
			<td>
				<Form.Group className="form-group pt-3" key={2 * index + 1}>
					<Form.Control
						type="text"
						pattern="^([0-9]*[.])?[0-9]+"
						className="form-control"
						required={true}
						id={`${2 * index + 1}`}
						name={`${2 * index + 1}`}
						placeholder={"sum"}
						onChange={(event) => handleOnChange("sum", event.target.value)}
						defaultValue={data.sum}
					/>
				</Form.Group>
			</td>
			<td className="overflow-hidden">
				<div className="flex align-items-center list-user-action">
					{data.UploadedFile ? (
						<>
							<Link href={`${ENDPOINT}/${data.UploadedFile.id}.${data.UploadedFile.postfix}`}>
								<Button type="button" className="btn btn-labeled btn-success">
									<i className="ri-download-line"></i>
								</Button>
							</Link>
							<Button type="button" className="btn  btn-labeled btn-danger ms-2" onClick={() => onDelete()}>
								<i className="ri-delete-bin-line "></i>
							</Button>
						</>
					) : (
						<></>
					)}
				</div>
			</td>
		</tr>
	);
};
