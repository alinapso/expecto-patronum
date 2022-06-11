import React, { useState } from "react";
import { Col, Dropdown, Card } from "react-bootstrap";
import moment from "moment";
import Link from "next/link";
import ImageGallery from "react-image-gallery";

import { RemoteApiCall } from "lib/remoteAPI";
import { Sponsored, SponsoredEvents, Expenses } from "expecto-patronum-common";

import AddOrEditEvent from "./AddOrEditEvent";
import { TableRow } from ".";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function SponsoredEventView({
	sponsored,
	sponsoredEvent,
	refresh,
	isAdmin,
}: {
	sponsored: Sponsored;
	sponsoredEvent: SponsoredEvents;
	refresh: () => void;
	isAdmin: boolean;
}) {
	const imagesList = sponsoredEvent.files;
	const images = imagesList.map((image) => ({
		original: `${ENDPOINT}/${image.id}.${image.postfix}`,
		thumbnail: `${ENDPOINT}/${image.id}.${image.postfix}`,
	}));
	const [showEdit, setShowEdit] = useState(false);
	const deleteEvent = async () => {
		const res = await RemoteApiCall({
			method: "DELETE",
			url: `/sponsored-events/${sponsoredEvent.id}`,
		});
		refresh();
	};
	const updateEvent = () => {
		setShowEdit(true);
	};
	const handleEdit = async (values: any) => {
		const date = new Date(values.eventDate);
		const payload = {
			title: values.title,
			description: values.description,
			eventDate: date,
			sponsoredId: sponsored.id,
			files: [...values.images],
			expenses: values.expenses,
		};
		const res = await RemoteApiCall({
			method: "PATCH",
			url: `/sponsored-events/${sponsoredEvent.id}`,
			body: payload,
		});
		refresh();
		setShowEdit(false);
	};
	const getInitValueForEdit = () => {
		const date = new Date(sponsoredEvent.eventDate);

		return {
			title: sponsoredEvent.title,
			eventDate: moment(date).format("YYYY-MM-DD"),
			description: sponsoredEvent.description,
			images: imagesList,
			expenses: sponsoredEvent.Expenses,
		};
	};
	const initValues = getInitValueForEdit();
	const getTotal = (expenses: Expenses[] | undefined) => {
		if (!expenses) return 0;
		let totalSum = 0;
		expenses.forEach((exp) => {
			totalSum += exp.sum;
		});
		return totalSum;
	};
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
													href={`/dashboard/sponsored/${sponsored.id}`}>{`${sponsored.firstName} ${sponsored.lastName}`}</Link>
											</h5>
											<h2>{sponsoredEvent.title}</h2>
											<p className="mb-0">{new Date(sponsoredEvent.eventDate).toLocaleDateString()}</p>
										</div>
										{isAdmin && (
											<div className="card-post-toolbar">
												<Dropdown>
													<Dropdown.Toggle className="bg-transparent border-white">
														<i className="ri-more-fill"></i>
													</Dropdown.Toggle>
													<Dropdown.Menu className=" m-0 p-0">
														<Dropdown.Item className=" p-3" onClick={() => updateEvent()}>
															<div className="d-flex align-items-top">
																<i className="ri-pencil-line h4"></i>
																<div className="data ms-2">
																	<h6>Edit Post</h6>
																	<p className="mb-0">Update this event and saved items</p>
																</div>
															</div>
														</Dropdown.Item>

														<Dropdown.Item className=" p-3" onClick={() => deleteEvent()}>
															<div className="d-flex align-items-top">
																<i className="ri-delete-bin-7-line h4"></i>
																<div className="data ms-2">
																	<h6>Delete</h6>
																	<p className="mb-0">Delete this event</p>
																</div>
															</div>
														</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="user-post">
							<p>{sponsoredEvent.description}</p>
							{images && images.length > 0 ? <ImageGallery items={images} /> : <></>}
						</div>
						<div>
							<table className="files-lists table table-striped w-100 ">
								<thead className="">
									<tr>
										<th scope="col" className="mx-auto"></th>
										<th scope="col" className="mx-auto ">
											title
										</th>
										<th scope="col">sum</th>
										<th scope="col">Invoice</th>
									</tr>
								</thead>
								<tbody className="w-100">
									{sponsoredEvent.Expenses.map((rowData, index) => (
										<TableRow data={rowData} key={index} />
									))}
									<tr className="table-warning">
										<td></td>
										<td></td>
										<td>
											<h5>Total : {getTotal(sponsoredEvent.Expenses)}$</h5>
										</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Card.Body>
			</Card>
			<AddOrEditEvent
				show={showEdit}
				setShow={setShowEdit}
				handleSubmit={handleEdit}
				initValue={initValues}></AddOrEditEvent>
		</Col>
	);
}
export default SponsoredEventView;
