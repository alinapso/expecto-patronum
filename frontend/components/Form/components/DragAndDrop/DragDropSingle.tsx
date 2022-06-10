import React, { Component, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card } from "react-bootstrap";
import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";
import { UploadedFile } from "expecto-patronum-common";
import { getFileType, TableItems, TableRow } from "./common";
type DragDropSingleProps = {
	fileTypes: string[];
	defualtValue?: UploadedFile;
};
type DragDropSingleState = {
	tableItems: TableItems | undefined;
};

export class DragDropSingle extends Component<DragDropSingleProps> {
	fileTypes: string[];
	value = "";
	constructor(props: DragDropSingleProps) {
		super(props);
		if (this.props.defualtValue != undefined) {
			this.value = this.props.defualtValue.id;
			const file = this.props.defualtValue;
			this.state = {
				tableItems: new TableItems({
					name: file.title,
					fileType: getFileType(file.postfix),
					fileHerf: `${file.id}.${file.postfix}`,
					//fileSize: file.size,
				}),
			};
		}

		this.fileTypes = props.fileTypes;
	}
	state: DragDropSingleState = {
		tableItems: undefined,
	};

	handleDelete = async (index: number) => {
		const deletedFile = this.value;
		this.value = "";
		this.setState((state) => ({ tableItems: undefined }));
		//do delete
		const res = await RemoteApiCall({
			method: "DELETE",
			url: `/uploaded-file/${deletedFile}`,
		});
	};
	handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file, "PROFILE");
			if (result && result.status == 201) {
				this.value = result.data.id;
				this.setState((state) => ({
					tableItems: new TableItems({
						name: file.name,
						fileType: getFileType(file.name),
						fileHerf: `${file.id}.${file.postfix}`,
						//fileSize: file.size,
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
				<div>
					<div className="">
						<div className="input-block-level">
							<span> Profile image : </span>
							<FileUploader
								handleChange={this.handleUpload}
								name="file"
								types={this.fileTypes}
								multiple={false}
								disabled={this.value != ""}
							/>
						</div>
					</div>
					<div>
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
											{/* <th scope="col">Size</th> */}
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										<TableRow data={this.state.tableItems} key={0} onDelete={() => this.handleDelete(0)} />
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
