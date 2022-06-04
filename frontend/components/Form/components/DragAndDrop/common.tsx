import React from "react";
import { Button } from "react-bootstrap";
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
	fileSize: number;
	constructor({ name, fileType, fileSize }: { name: string; fileType: FileTypes; fileSize: number }) {
		this.name = name;
		this.fileType = fileType;
		this.fileSize = fileSize;
	}
}

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

export const TableRow = ({
	data,
	onDownload,
	onDelete,
}: {
	data: TableItems;
	onDownload: () => void;
	onDelete: () => void;
}) => {
	const fileNameSnip = (name: string) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};
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
};
