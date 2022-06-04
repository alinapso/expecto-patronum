import React, { Component, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card } from "react-bootstrap";
import image from "../assets/images/image.png";
import pdf from "../assets/images/pdf.png";
import word from "../assets/images/word.png";
import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";
import useSWR, { useSWRConfig } from "swr";
import { FileCategory } from "expecto-patronum-common";
import { getFileType, TableItems, TableRow } from "./common";
type DragDropSingleProps = {
	fileTypes: string[];
	defualtValue?: string;
};
type DragDropSingleState = {
	tableItems: TableItems | undefined;
};

export class DragDropSingle extends Component<DragDropSingleProps> {
	fileTypes: string[];
	value = "";
	constructor(props: DragDropSingleProps) {
		super(props);
		this.value = props.defualtValue ? props.defualtValue : "";

		this.fileTypes = props.fileTypes;
	}
	state: DragDropSingleState = {
		tableItems: undefined,
	};

	handleDownload = (index: number) => {
		console.log(index);
	};
	handleDelete = (index: number) => {
		const deletedFile = this.value;
		this.value = "";
		this.setState((state) => ({ tableItems: undefined }));

		//do delete
	};
	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file);
			if (result && result.status == 201) {
				this.value = result.data.id;
				this.setState((state) => ({
					tableItems: new TableItems({
						name: file.name,
						fileType: getFileType(file.name),
						fileSize: file.size,
					}),
				}));
				return;
			}
		}
		throw new Error("Somthing went wrong with the file upload");
	};

	render() {
		return (
			<Col sm={12} className="mb-3">
				<Card>
					<Card.Header className="">
						<div className="input-block-level">
							<FileUploader
								handleChange={this.handleUpload}
								name="file"
								types={this.fileTypes}
								multiple={false}
								disabled={this.value != ""}
							/>
						</div>
					</Card.Header>
					<Card.Body>
						{this.state.tableItems ? (
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
										<TableRow
											data={this.state.tableItems}
											key={0}
											onDelete={() => this.handleDelete(0)}
											onDownload={() => this.handleDownload(0)}
										/>
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
