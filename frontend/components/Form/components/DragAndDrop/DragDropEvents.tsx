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
type DragDropEventsProps = {
	fileTypes: string[];
	defualtValue?: any[];
	categoryType: string;
};
type DragDropEventsState = {
	value: TableItems[];
	showDeleteDialog: boolean;
};

export class TableItems {
	name: string;
	fileType: FileTypes;
	fileHerf: string;
	title: string;
	sum: string;
	constructor({
		name,
		fileType,
		fileHerf,
		title,
		sum,
	}: {
		name: string;
		fileType: FileTypes;
		fileHerf: string;
		title: string;
		sum: string;
	}) {
		this.name = name;
		this.fileType = fileType;
		this.fileHerf = fileHerf;
		this.title = title;
		this.sum = sum;
	}
}
export class DragDropEvents extends Component<DragDropEventsProps> {
	fileTypes: string[];
	value: TableItems[];

	constructor(props: DragDropEventsProps) {
		super(props);
		//console.log("in constructor", this.props.defualtValue);

		this.fileTypes = props.fileTypes;
		let tableInitArray: TableItems[] = [];
		this.value = [];
		if (this.props.defualtValue != undefined) {
			this.props.defualtValue.forEach((file, index) => {
				this.value.push(
					new TableItems({
						name: file.title,
						fileType: getFileType(file.postfix),
						fileHerf: `${file.id}.${file.postfix}`,
						title: file.name,
						sum: "0",
					})
				);
			});
		}

		this.state = {
			value: this.value,
			showDeleteDialog: false,
		};
	}
	state: DragDropEventsState = {
		value: [],
		showDeleteDialog: false,
	};

	handleDelete = async (index: number) => {
		console.log("handleDelete");
		const deletedFile = this.value[index];
		this.state.value.splice(index, 1);
		this.setState((state) => ({ value: [...this.state.value] }));
		this.value.splice(index, 1);
		const res = await RemoteApiCall({
			method: "DELETE",
			url: `/uploaded-file/${deletedFile}`,
		});
	};
	handleOnChange = (type: string, tableRow: TableItems, value: string) => {
		if (type == "title") {
			tableRow.title = value;
		}
		if (type == "sum") {
			tableRow.sum = value;
		}
	};
	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file, this.props.categoryType);
			//console.log(result);
			if (result && result.status == 201) {
				const newItem = new TableItems({
					name: file.name,
					fileType: getFileType(file.name),
					fileHerf: `${result.data.id}.${result.data.postfix}`,
					title: file.name,
					sum: "0",
				});
				this.value.push(newItem);
				this.setState((state) => ({
					value: [...this.state.value, newItem],
				}));
				console.log(this.state.value);
			}
		}
	};

	render() {
		console.log("this.state.value", this.value);
		return (
			<Col sm={12} className="mb-3">
				<Card>
					<Card.Header className="">
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
												onDelete={() => () => () => this.handleDelete(index)}
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
	data: TableItems;
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
				<RowImage fileType={data.fileType} />
			</td>
			<td>
				<Form.Group className="form-group pt-3" key={2 * index + 1}>
					<Form.Control
						type="text"
						pattern="^[a-zA-Z0-9_.-]*$"
						className="form-control"
						required={true}
						id={`${2 * index + 1}`}
						name={`${2 * index + 1}`}
						placeholder={"title"}
						onChange={(event) => handleOnChange("title", event.target.value)}
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
					/>
				</Form.Group>
			</td>
			<td className="overflow-hidden">
				<div className="flex align-items-center list-user-action">
					<Link href={`${ENDPOINT}/${data.fileHerf}`}>
						<Button type="button" className="btn btn-labeled btn-success">
							<i className="ri-download-line"></i>
						</Button>
					</Link>
					<Button type="button" className="btn  btn-labeled btn-danger ms-2" onClick={() => onDelete()}>
						<i className="ri-delete-bin-line "></i>
					</Button>
				</div>
			</td>
		</tr>
	);
};
