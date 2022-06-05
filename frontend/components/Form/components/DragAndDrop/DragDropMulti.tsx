import React, { Component, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card } from "react-bootstrap";

import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";

import { getFileType, TableItems, TableRow, dialogYesNo } from "./common";
import { UploadedFile } from "expecto-patronum-common";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
type DragDropMultiProps = {
	fileTypes: string[];
	defualtValue?: any[];
	categoryType: string;
};
type DragDropMultiState = {
	value: TableItems[];
	showDeleteDialog: boolean;
};
export class DragDropMulti extends Component<DragDropMultiProps> {
	fileTypes: string[];
	value: string[];
	constructor(props: DragDropMultiProps) {
		super(props);
		//console.log("in constructor", this.props.defualtValue);

		this.fileTypes = props.fileTypes;
		let valuesInitArray: string[] = [];
		let tableInitArray: TableItems[] = [];
		if (this.props.defualtValue != undefined) {
			this.props.defualtValue.forEach((file) => {
				valuesInitArray.push(file.id);
				tableInitArray.push(
					new TableItems({
						name: file.title,
						fileType: getFileType(file.postfix),
						fileHerf: `${file.id}.${file.postfix}`,
						//fileSize: file.size,
					})
				);
			});
		}
		this.value = valuesInitArray;

		this.state = {
			value: tableInitArray,
			showDeleteDialog: false,
		};
	}
	state: DragDropMultiState = {
		value: [],
		showDeleteDialog: false,
	};
	// componentDidMount() {
	// 	console.log(this.initTableValue);
	// 	this.setState((state) => ({ value: this.initTableValue }));
	// }

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

	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file, this.props.categoryType);
			//console.log(result);
			if (result && result.status == 201) {
				this.value.push(result.data.id);
				this.setState((state) => ({
					value: [
						...this.state.value,
						new TableItems({
							name: file.name,
							fileType: getFileType(file.name),
							fileHerf: `${result.data.id}.${result.data.postfix}`,
							//fileSize: file.size,
						}),
					],
				}));
			}
		}
	};

	render() {
		//console.log("this.state.value", this.state.value);
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
							<div>
								<table className="files-lists table table-striped ">
									<thead>
										<tr>
											<th scope="col">
												<div className=" text-center">
													<input type="checkbox" className="form-check-input" />
												</div>
											</th>
											<th scope="col">File Name</th>
											{/* <th scope="col">Size</th> */}
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{this.state.value.map((rowData, index) => (
											<TableRow data={rowData} key={index} onDelete={() => () => () => this.handleDelete(index)} />
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
