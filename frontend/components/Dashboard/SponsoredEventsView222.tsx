import { SponsoredEvents, Expenses } from "expecto-patronum-common";
import { Card, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { partition } from "lodash";
import ImageGallery from "react-image-gallery";
import { RowImage, getFileType } from "components/Form/components/DragAndDrop/common";
import { useUserState } from "context/user";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export default function SponsoredEventView({ sponsoredEvent }: { sponsoredEvent: SponsoredEvents }) {
	const [imagesList] = partition(sponsoredEvent.files, (file) => file.fileCategory === "DOC");
	const images = imagesList.map((image) => ({
		original: `${ENDPOINT}/${image.id}.${image.postfix}`,
		thumbnail: `${ENDPOINT}/${image.id}.${image.postfix}`,
	}));
	const sponsored = sponsoredEvent.sponsored;
	return (
		<Col sm={12}>
			<Card>
				<Card.Body>
					<div className="post-item">
						<div className="user-post-data pb-3">
							<div className="d-flex justify-content-between">
								<div className="me-3"></div>
								<div className="w-100">
									<div className="d-flex justify-content-between flex-wrap">
										<div>
											<h5 className="mb-0 d-inline-block">
												<Link
													href={`/admin/sponsored/${sponsored.id}`}>{`${sponsored.firstName} ${sponsored.lastName}`}</Link>
											</h5>
											<h2>{sponsoredEvent.title}</h2>
											<p className="mb-0">{new Date(sponsoredEvent.eventDate).toLocaleDateString()}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="user-post">
							<p>{sponsoredEvent.description}</p>
							{images && images.length > 0 ? <ImageGallery items={images} /> : <></>}
						</div>
						<table className="files-lists table table-striped ">
							<thead>
								<tr>
									<th scope="col">
										<div className=" text-center">
											<input type="checkbox" className="form-check-input" />
										</div>
									</th>
									<th scope="col">file</th>
									<th scope="col">title</th>
									<th scope="col">sum</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{sponsoredEvent.Expenses.map((rowData, index) => (
									<TableRow data={rowData} key={index} />
								))}
							</tbody>
						</table>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}
export const TableRow = ({ data }: { data: Expenses }) => {
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
				<RowImage fileType={getFileType(data.uploadedFile ? data.uploadedFile.postfix : "")} />
				<span className="overflow-hidden">{fileNameSnip(data.title)}</span>
			</td>
			<td>{data.title}</td>
			<td>{data.sum}$</td>
			<td className="overflow-hidden">
				{data.uploadedFile ? (
					<div className="flex align-items-center list-user-action">
						<Link href={`${ENDPOINT}/${data.uploadedFile.id}.${data.uploadedFile.postfix}`}>
							<Button type="button" className="btn btn-labeled btn-success">
								<i className="ri-download-line"></i>
							</Button>
						</Link>
					</div>
				) : (
					<></>
				)}
			</td>
		</tr>
	);
};
