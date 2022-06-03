import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Col, Button, Card } from "react-bootstrap";
import image from "../assets/images/image.png";
import pdf from "../assets/images/pdf.png";
import word from "../assets/images/word.png";
import { ApiUploadFile, RemoteApiCall } from "lib/remoteAPI";
import useSWR, { useSWRConfig } from "swr";

const fileTypesDefualt = ["JPG", "PNG", "GIF"];
export const enum FileTypes {
	Undefined,
	Image,
	PDF,
	Word,
}

class TableItems {
	name: string;
	fileType: FileTypes;
	fileSize: number;
	constructor({ name, fileType, fileSize }: { name: string; fileType: FileTypes; fileSize: number }) {
		this.name = name;
		this.fileType = fileType;
		this.fileSize = fileSize;
	}
}
const testData: TableItems[] = [
	{
		name: "post report",
		fileType: FileTypes.PDF,
		fileSize: 50100,
	},
	{
		name: "usages",
		fileType: FileTypes.Word,
		fileSize: 7100,
	},
	{
		name: "Images file",
		fileType: FileTypes.Image,
		fileSize: 50,
	},
];
const DragDrop = ({
	fileTypes = fileTypesDefualt,
	defualtValue = [],
}: {
	fileTypes: string[];
	defualtValue?: TableItems[];
}) => {
	const [filesList, setFilesList] = useState(defualtValue);

	const handleDownload = (index: number) => {
		console.log(index);
	};
	const handleDelete = (index: number) => {
		const deletedFile = filesList[index];
		filesList.splice(index, 1);
		setFilesList([...filesList]);
	};
	const handleUpload = async (file: any) => {
		if (file) {
			const result = await ApiUploadFile(file);
			console.log(result);
			setFilesList([
				...filesList,
				new TableItems({
					name: file.name,
					fileType: getFileType(file.name),
					fileSize: file.size,
				}),
			]);
		}
	};
	const fileNameSnip = (name: string) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};
	const RowImage = ({ fileType }: { fileType: FileTypes }) => {
		switch (fileType) {
			case FileTypes.PDF:
				return <img src={pdf.src} />;
			case FileTypes.Word:
				return <img src={word.src} />;
			case FileTypes.Image:
				return <img src={image.src} />;
			default:
				return <></>;
		}
	};

	const TableRow = ({
		data,
		onDownload,
		onDelete,
	}: {
		data: TableItems;
		onDownload: () => void;
		onDelete: () => void;
	}) => (
		<tr>
			<td>
				<div className=" text-center">
					<input type="checkbox" className="form-check-input" />
				</div>
			</td>
			<td>
				<RowImage fileType={data.fileType} />
				<span className="overflow-hidden">{fileNameSnip(data.name)}</span>
			</td>
			<td className="overflow-hidden">{data.fileSize}</td>
			<td className="overflow-hidden">
				<div className="flex align-items-center list-user-action">
					<Button type="button" className="btn btn-labeled btn-success" onClick={() => onDownload()}>
						<i className="ri-download-line"></i>
					</Button>
					<Button type="button" className="btn  btn-labeled btn-danger ms-2" onClick={() => onDelete()}>
						<i className="ri-delete-bin-line "></i>
					</Button>
				</div>
			</td>
		</tr>
	);
	const getFileType = function (name: string): FileTypes {
		if (!name) return FileTypes.Undefined;
		const type = name.split(".").at(-1)?.toUpperCase();
		switch (type) {
			case "DOC":
			case "DOCX":
				return FileTypes.Word;
			case "PDF":
				return FileTypes.PDF;
			default:
				return FileTypes.Image;
		}
	};

	return (
		<Col sm={12} className="mb-3">
			<Card>
				<Card.Header className="">
					<div className="input-block-level">
						<FileUploader handleChange={handleUpload} name="file" types={fileTypes} />
					</div>
				</Card.Header>
				<Card.Body>
					{filesList && filesList.length > 0 ? (
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
									{filesList.map((rowData, index) => (
										<TableRow
											data={rowData}
											key={index}
											onDelete={() => handleDelete(index)}
											onDownload={() => handleDownload(index)}
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
};

export default DragDrop;
