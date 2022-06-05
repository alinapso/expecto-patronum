import { StringChain } from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import image from "../../../../assets/images/image.png";
import pdf from "../../../../assets/images/pdf.png";
import word from "../../../../assets/images/word.png";

export const fileTypesDefualt = ["JPG", "PNG", "GIF"];
export const enum FileTypes {
	Undefined,
	Image,
	PDF,
	Word,
}

export class TableItems {
	name: string;
	fileType: FileTypes;
	fileHerf: string;
	//fileSize: number;
	constructor({
		name,
		fileType,
		fileHerf /*fileSize*/,
	}: {
		name: string;
		fileType: FileTypes;
		fileHerf: string /*fileSize: number*/;
	}) {
		this.name = name;
		this.fileType = fileType;
		this.fileHerf = fileHerf;
		//this.fileSize = fileSize;
	}
}
export const dialogYesNo = ({ msg, onYes }: { msg: string; onYes: () => void }) => {
	const [showDialog, setShowDialog] = useState(true);

	return (
		<Modal show={showDialog}>
			<Modal.Header closeButton>
				<Modal.Title>{msg}</Modal.Title>
			</Modal.Header>
			showDialog
			<Modal.Body></Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						setShowDialog(false);
					}}>
					Close
				</Button>
				<Button variant="primary" onClick={() => onYes()}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export const getFileType = function (name: string): FileTypes {
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
export const RowImage = ({ fileType }: { fileType: FileTypes }) => {
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

export const TableRow = ({ data, onDelete }: { data: TableItems; onDelete: () => void }) => {
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
				<span className="overflow-hidden">{fileNameSnip(data.name)}</span>
			</td>
			{/* <td className="overflow-hidden">{data.fileSize}</td> */}
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
