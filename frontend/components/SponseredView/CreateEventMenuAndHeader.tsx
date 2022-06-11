import React from "react";

import { Col, Container, Card } from "react-bootstrap";

import Link from "next/link";
import img1 from "../../assets/images/page-img/profile-bg1.jpg";

import { RemoteApiCall } from "lib/remoteAPI";
import { Sponsored } from "expecto-patronum-common";
import AddOrEditEvent from "./AddOrEditEvent";
const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const CreateEventMenuAndHeader = ({
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
							{/* <Dropdown>
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
							</Dropdown> */}
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
									{/* <span>Active : {sponsored.isActive ? "Yes" : "No"}</span> */}
									{isAdmin && (
										<span>
											patron :{" "}
											{sponsored.patronId ? (
												<Link href={`/admin/patrons/${sponsored.patronId}`}>
													<a>{`${sponsored.patron?.firstName} ${sponsored.patron?.lastName}`}</a>
												</Link>
											) : (
												"Not Sponsored"
											)}
										</span>
									)}
								</div>
								<Container className="profile-detail text-start mt-3 px-5">
									<h5>Description : </h5>
									<p>{sponsored.description}</p>
								</Container>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body className="profile-page p-0">
					<div className="profile-header">
						<div className="profile-info p-3 d-flex align-items-center justify-content-start position-relative">
							<div className="social-info">
								{isAdmin && (
									<button className="btn btn-secondary m-1" onClick={() => setShow(true)}>
										Create a new Post
									</button>
								)}
								<Link href={`/dashboard/sponsored/expenses/${sponsored.id}`}>
									<button className="btn btn-secondary m-1">Expenses</button>
								</Link>
							</div>
						</div>
					</div>
				</Card.Body>
				<AddOrEditEvent show={show} setShow={setShow} handleSubmit={handleSubmit}></AddOrEditEvent>
			</Card>
		</Col>
	);
};
export default CreateEventMenuAndHeader;
