import React, { Component, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card } from "react-bootstrap";

import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";

import { getFileType, TableItems, TableRow } from "./common";

type DragDropMultiProps = {
	fileTypes: string[];
	defualtValue?: string[];
};
type DragDropMultiState = {
	value: TableItems[];
};
export class DragDropMulti extends Component<DragDropMultiProps> {
	fileTypes: string[];
	value: string[] = [];
	constructor(props: DragDropMultiProps) {
		super(props);

		this.fileTypes = props.fileTypes;
		this.value = props.defualtValue ? props.defualtValue : [];
	}
	state: DragDropMultiState = {
		value: [],
	};

	handleDownload = (index: number) => {
		console.log(index);
	};
	handleDelete = (index: number) => {
		const deletedFile = this.state.value[index];
		this.state.value.splice(index, 1);
		this.setState((state) => ({ value: [...this.state.value] }));
		this.value.splice(index, 1);
	};
	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file);
			console.log(result);
			this.setState((state) => ({
				value: [
					...this.state.value,
					new TableItems({
						name: file.name,
						fileType: getFileType(file.name),
						fileSize: file.size,
					}),
				],
			}));
		}
	};

	render() {
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
											<th scope="col">Size</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{this.state.value.map((rowData, index) => (
											<TableRow
												data={rowData}
												key={index}
												onDelete={() => this.handleDelete(index)}
												onDownload={() => this.handleDownload(index)}
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
