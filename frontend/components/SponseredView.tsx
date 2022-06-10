import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Button, Modal, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";

import Link from "next/link";
import img1 from "../assets/images/page-img/profile-bg1.jpg";

import loader from "../assets/images/page-img/page-load-loader.gif";

import DynamicForm from "./Form";
import { FormElementTypes } from "./Form/types/FormElementDto";
import { RemoteApiCall } from "lib/remoteAPI";
import { Sponsored, SponsoredEvents, UploadedFile } from "expecto-patronum-common";
import { partition } from "lodash";
import { RowImage, getFileType } from "./Form/components/DragAndDrop/common";
import moment from "moment";
import Expenses from "expecto-patronum-common/entities/expenses";
import { useUserState, UserStatus } from "context/user";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const TableRow = ({ data }: { data: Expenses }) => {
	const fileNameSnip = (name: string | undefined) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};
	return (
		<tr>
			<td></td>
			<td>{data.title}</td>
			<td>{data.sum}$</td>
			<td className="overflow-hidden pb-2">
				{data.UploadedFile ? (
					<div className="flex align-items-center list-user-action">
						<Link href={`${ENDPOINT}/${data.UploadedFile.id}.${data.UploadedFile.postfix}`}>
							<a>
								<RowImage fileType={getFileType(data.UploadedFile ? data.UploadedFile.postfix : "")} />
							</a>
						</Link>
					</div>
				) : (
					<></>
				)}
			</td>
		</tr>
	);
};

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
const CreateEventMenuAndHeader = ({
	sponsored,
	show,
	setShow,
	isAdmin,
}: {
	sponsored: Sponsored;
	show: boolean;
	setShow: any;
	isAdmin: boolean;
}) => {
	const handleSubmit = async (values: any) => {
		const payload = {
			title: values.title,
			description: values.description,
			eventDate: values.eventDate,
			sponsoredId: sponsored.id,
			files: [...values.images],
			expenses: values.expenses,
		};
		const res = await RemoteApiCall({
			method: "POST",
			url: `/sponsored-events`,
			body: payload,
		});
		setShow(false);
	};
	const updateEvent = async () => {};
	const deleteEvent = async () => {};
	return (
		<Col sm={12}>
			<Card>
				<Card.Body className="profile-page p-0">
					{isAdmin && (
						<div className="card-post-toolbar d-flex justify-content-end">
							<Dropdown>
								<Dropdown.Toggle className="bg-transparent border-white">
									<i className="ri-more-fill"></i>
								</Dropdown.Toggle>
								<Dropdown.Menu className=" m-0 p-0">
									<Dropdown.Item className=" p-3" onClick={() => updateEvent()}>
										<div className="d-flex align-items-top">
											<i className="ri-pencil-line h4"></i>
											<div className="data ms-2">
												<h6>Edit User</h6>
												<p className="mb-0">Update this user</p>
											</div>
										</div>
									</Dropdown.Item>

									<Dropdown.Item className=" p-3" onClick={() => deleteEvent()}>
										<div className="d-flex align-items-top">
											<i className="ri-delete-bin-7-line h4"></i>
											<div className="data ms-2">
												<h6>Delete</h6>
												<p className="mb-0">Delete this User</p>
											</div>
										</div>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					)}
					<div className="profile-header">
						<div className="position-relative text-center pt-3  ">
							<div className="profile-img ">
								<img
									src={
										sponsored.profilePic
											? `${ENDPOINT}/${sponsored.profilePic?.id}.${sponsored.profilePic?.postfix}`
											: img1.src
									}
									alt="profile-img1"
									className="avatar-130 img-fluid"
								/>
							</div>
							<div className="profile-detail">
								<div className="profile-detail">
									<h3>{`${sponsored.firstName} ${sponsored.lastName}`}</h3>
								</div>
								<div className="d-flex justify-content-between px-5   ">
									<span>Father name : {sponsored.fatherName}</span>
									<span>Birthdate : {new Date(sponsored.birthDate).toLocaleDateString()}</span>
									<span>Place of birth : {sponsored.placeOfBirth}</span>
									<span>Active : {sponsored.isActive ? "Yes" : "No"}</span>
									<span>
										patron :{" "}
										{sponsored.patronId
											? `${sponsored.patron?.firstName} ${sponsored.patron?.lastName}`
											: "Not Sponsored"}
									</span>
								</div>
								<div className="profile-detail">
									<p>{sponsored.description}</p>
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
			{isAdmin && (
				<Card>
					<Card.Body className="profile-page p-0">
						<div className="profile-header">
							<div className="profile-info p-3 d-flex align-items-center justify-content-start position-relative">
								<div className="social-info">
									<button className="btn btn-secondary m-1" onClick={() => setShow(true)}>
										Create a new Post
									</button>
									<Link href={`/dashboard/sponsored/expenses/${sponsored.id}`}>
										<button className="btn btn-secondary m-1" onClick={() => setShow(true)}>
											Expenses
										</button>
									</Link>
								</div>
							</div>
						</div>
					</Card.Body>
					<AddOrEditEvent show={show} setShow={setShow} handleSubmit={handleSubmit}></AddOrEditEvent>
				</Card>
			)}
		</Col>
	);
};
const AddOrEditEvent = ({
	show,
	setShow,
	handleSubmit,
	initValue,
}: {
	show: boolean;
	setShow: any;
	handleSubmit: (values: any) => void;
	initValue?: any;
}) => {
	const formTabs = [
		{
			id: 1,
			name: "Event Details",
			title: "Event Details",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "title",
					name: "title",
					labelText: "Event title",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "Event title",
				},
				{
					id: "eventDate",
					name: "eventDate",
					labelText: "Evenet time",
					elemetType: FormElementTypes.Datepicker,
					required: false,
					placeholder: "Evenet Time",
				},
				{
					id: "description",
					name: "description",
					labelText: "Event Description",
					elemetType: FormElementTypes.Textarea,
					required: true,
					placeholder: "write description here",
				},

				{
					id: "images",
					name: "images",
					labelText: "Images",
					elemetType: FormElementTypes.Images,
					required: true,
					placeholder: "Images",
				},
				{
					id: "expenses",
					name: "expenses",
					labelText: "Expenses",
					elemetType: FormElementTypes.Expenses,
					required: true,
					placeholder: "Expenses",
				},
			],
		},
	];
	return (
		<Modal size="lg" show={show}>
			<Modal.Header className="d-flex justify-content-between">
				<h5 className="modal-title" id="post-modalLabel">
					{initValue ? "Edit event" : "Add New Event"}
				</h5>
				<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
					<i className="ri-close-fill"></i>
				</button>
			</Modal.Header>
			<Modal.Body>
				<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} initValue={initValue} />
			</Modal.Body>
		</Modal>
	);
};
const SponseredView = () => {
	const [showAdd, setShowAdd] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	const [refresh, setRefresh] = useState(false);
	const { user } = useUserState();
	const {
		data: result,
		error,
		mutate,
	} = useSWR(
		{
			method: "GET",
			url: `/sponsored/${id}`,
		},

		RemoteApiCall
	);
	const refreshView = () => {
		setRefresh(!refresh);
	};
	const sponsored: Sponsored = result?.data[0];
	useEffect(() => {
		if (showAdd == false) mutate();
	}, [showAdd]);
	useEffect(() => {
		mutate();
	}, [refresh]);

	const isAdmin = user && user.status == UserStatus.loggedIn && user.data.role === "ADMIN";

	if (sponsored)
		return (
			<Container>
				<Row>
					<CreateEventMenuAndHeader sponsored={sponsored} show={showAdd} setShow={setShowAdd} isAdmin={isAdmin} />
					{sponsored.SponsoredEvents && sponsored.SponsoredEvents.length > 0 ? (
						sponsored.SponsoredEvents.map((se) => (
							<SponsoredEventView
								sponsored={sponsored}
								sponsoredEvent={se}
								refresh={refreshView}
								key={se.id}
								isAdmin={isAdmin}
							/>
						))
					) : (
						<h3>No post exist yet</h3>
					)}
				</Row>
			</Container>
		);
	return (
		<Col>
			<div className="col-sm-12 text-center">
				<img src={loader.src} alt="loader" style={{ height: "100px" }} />
			</div>
		</Col>
	);
};
export default SponseredView;
