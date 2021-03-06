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
	label?: string;
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

	handleDelete = async (index: number) => {
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
		return (
			<Col sm={12} className="mb-3">
				<div>
					<div>
						<div className="mb-3">
							<h4>{this.props.label}</h4>
						</div>
						<div className="input-block-level">
							<FileUploader handleChange={this.handleUpload} name="file" types={this.fileTypes} />
						</div>
					</div>
					<div>
						{this.state.value && this.state.value.length > 0 ? (
							<div>
								<table className="files-lists table table-striped">
									<thead>
										<tr>
											<th scope="col">File Name</th>
											{/* <th scope="col">Size</th> */}
											<th scope="col" style={{ width: "120px" }}>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{this.state.value.map((rowData, index) => (
											<TableRow data={rowData} key={index} onDelete={() => this.handleDelete(index)} />
										))}
									</tbody>
								</table>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</Col>
		);
	}
}
