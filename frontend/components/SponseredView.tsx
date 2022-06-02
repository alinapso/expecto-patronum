import SponseredCard from "./SponseredCard";
import { Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Button, Modal, Card } from "react-bootstrap";

import Link from "next/link";
import React, { useState } from "react";
import img1 from "../assets/images/page-img/profile-bg1.jpg";
import img2 from "../assets/images/user/11.png";

import img5 from "../assets/images/icon/10.png";

import user1 from "../assets/images/user/1.jpg";

import user02 from "../assets/images/user/02.jpg";
import user03 from "../assets/images/user/03.jpg";

import p1 from "../assets/images/page-img/p1.jpg";

import loader from "../assets/images/page-img/page-load-loader.gif";
import small07 from "../assets/images/small/07.png";
import small08 from "../assets/images/small/08.png";
import small09 from "../assets/images/small/09.png";
import small1 from "../assets/images/small/07.png";

import small8 from "../assets/images/small/14.png";
import user9 from "../assets/images/user/1.jpg";
import pageimg1 from "../assets/images/page-img/43.png";
import pageimg2 from "../assets/images/page-img/44.png";
import pageimg3 from "../assets/images/page-img/45.png";
import pageimg4 from "../assets/images/page-img/46.png";
import pageimg5 from "../assets/images/page-img/47.png";
import DynamicForm from "./Form";
import { FormElementTypes } from "./Form/types/FormElementDto";
const SponsoredEvent = () => {
	return (
		<Col sm={12}>
			<Card>
				<Card.Body>
					<div className="post-item">
						<div className="user-post-data pb-3">
							<div className="d-flex justify-content-between">
								<div className="me-3">
									<img className="rounded-circle  avatar-60" src={user1.src} alt="" />
								</div>
								<div className="w-100">
									<div className="d-flex justify-content-between flex-wrap">
										<div>
											<h5 className="mb-0 d-inline-block">
												<Link href="#">Bni Cyst</Link>
											</h5>
											<p className="ms-1 mb-0 d-inline-block">Add New Post</p>
											<p className="mb-0">3 hour ago</p>
										</div>
										<div className="card-post-toolbar">
											<Dropdown>
												<Dropdown.Toggle className="bg-transparent border-white">
													<i className="ri-more-fill"></i>
												</Dropdown.Toggle>
												<Dropdown.Menu className=" m-0 p-0">
													<Dropdown.Item className=" p-3" to="#">
														<div className="d-flex align-items-top">
															<i className="ri-save-line h4"></i>
															<div className="data ms-2">
																<h6>Save Post</h6>
																<p className="mb-0">Add this to your saved items</p>
															</div>
														</div>
													</Dropdown.Item>
													<Dropdown.Item className=" p-3" to="#">
														<div className="d-flex align-items-top">
															<i className="ri-pencil-line h4"></i>
															<div className="data ms-2">
																<h6>Edit Post</h6>
																<p className="mb-0">Update your post and saved items</p>
															</div>
														</div>
													</Dropdown.Item>
													<Dropdown.Item className=" p-3" to="#">
														<div className="d-flex align-items-top">
															<i className="ri-close-circle-line h4"></i>
															<div className="data ms-2">
																<h6>Hide From Timeline</h6>
																<p className="mb-0">See fewer posts like this.</p>
															</div>
														</div>
													</Dropdown.Item>
													<Dropdown.Item className=" p-3" to="#">
														<div className="d-flex align-items-top">
															<i className="ri-delete-bin-7-line h4"></i>
															<div className="data ms-2">
																<h6>Delete</h6>
																<p className="mb-0">Remove thids Post on Timeline</p>
															</div>
														</div>
													</Dropdown.Item>
													<Dropdown.Item className=" p-3" to="#">
														<div className="d-flex align-items-top">
															<i className="ri-notification-line h4"></i>
															<div className="data ms-2">
																<h6>Notifications</h6>
																<p className="mb-0">Turn on notifications for this post</p>
															</div>
														</div>
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="user-post">
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
								industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
								scrambled it to make a type specimen book. It has survived not only five centuries,
							</p>

							<Link href="#">
								<img src={p1.src} alt="post" className="img-fluid w-100" />
							</Link>
						</div>
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<div className="header-title">
									<h4 className="card-title">Files</h4>
								</div>
								<div className="card-header-toolbar d-flex align-items-center">
									<Dropdown>
										<Dropdown.Toggle
											as="span"
											className="dropdown-btoggle text-primary"
											id="dropdownMenuButton5"
											data-bs-toggle="dropdown">
											<i className="ri-more-2-fill h4"></i>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu-right" aria-labelledby="dropdownMenuButton5">
											<Dropdown.Item href="#">
												<i className="ri-eye-fill me-2"></i>View
											</Dropdown.Item>
											<Dropdown.Item href="#">
												<i className="ri-delete-bin-6-fill me-2"></i>Delete
											</Dropdown.Item>
											<Dropdown.Item href="#">
												<i className="ri-pencil-fill me-2"></i>Edit
											</Dropdown.Item>
											<Dropdown.Item href="#">
												<i className="ri-printer-fill me-2"></i>Print
											</Dropdown.Item>
											<Dropdown.Item href="#">
												<i className="ri-file-download-fill me-2"></i>Download
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</Card.Header>
							<Card.Body>
								<div className="table-responsive">
									<Row className="justify-content-between d-flex">
										<Col sm="12" md="6">
											<div id="user_list_datatable_info" className="dataTables_filter">
												<form className="me-3 position-relative">
													<div className="form-group mb-0">
														<input
															type="search"
															className="form-control"
															id="exampleInputSearch"
															placeholder="Search"
														/>
													</div>
												</form>
											</div>
										</Col>
										<Col sm="12" md="6">
											<div className="user-list-files d-flex justify-content-end">
												<Link href="#" className="chat-icon-phone btn bg-soft-primary">
													Print
												</Link>
												<Link href="#" className="chat-icon-video btn bg-soft-primary">
													Excel
												</Link>
												<Link href="#" className="chat-icon-delete btn bg-soft-primary">
													Pdf
												</Link>
											</div>
										</Col>
									</Row>
									<table className="files-lists table table-striped mt-4">
										<thead>
											<tr>
												<th scope="col">
													<div className=" text-center">
														<input type="checkbox" className="form-check-input" />
													</div>
												</th>
												<th scope="col">File Name</th>
												<th scope="col">File Type</th>
												<th scope="col">Date</th>
												<th scope="col">Size</th>
												<th scope="col">Author</th>
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className=" text-center">
														<input type="checkbox" className="form-check-input" />
													</div>
												</td>
												<td>
													<img className="rounded-circle img-fluid avatar-40 me-2" src={pageimg1.src} alt="profile" />{" "}
													post report
												</td>
												<td>Document</td>
												<td>Mar 12, 2020</td>
												<td>390 kb</td>
												<td>Anna Sthesia</td>
												<td>
													<div className="flex align-items-center list-user-action">
														<OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
															<Link href="#">
																<i className="ri-download-line"></i>
															</Link>
														</OverlayTrigger>
														<OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
															<Link href="#">
																<i className="ri-delete-bin-line"></i>
															</Link>
														</OverlayTrigger>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className=" text-center">
														<input type="checkbox" className="form-check-input" />
													</div>
												</td>
												<td>
													<img className="rounded-circle img-fluid avatar-40 me-2" src={pageimg2.src} alt="profile" />{" "}
													usages
												</td>
												<td>Document</td>
												<td>Mar 18, 2020</td>
												<td>600 kb</td>
												<td>Paul Molive</td>
												<td>
													<div className="flex align-items-center list-user-action">
														<OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
															<Link href="#">
																<i className="ri-download-line"></i>
															</Link>
														</OverlayTrigger>
														<OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
															<Link href="#">
																<i className="ri-delete-bin-line"></i>
															</Link>
														</OverlayTrigger>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className=" text-center">
														<input type="checkbox" className="form-check-input" />
													</div>
												</td>
												<td>
													<img className="rounded-circle img-fluid avatar-40 me-2" src={pageimg3.src} alt="profile" />{" "}
													Images file
												</td>
												<td>Slide</td>
												<td>Mar 19, 2020</td>
												<td>800 kb</td>
												<td>Bob Frapples</td>
												<td>
													<div className="flex align-items-center list-user-action">
														<OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
															<Link href="#">
																<i className="ri-download-line"></i>
															</Link>
														</OverlayTrigger>
														<OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
															<Link href="#">
																<i className="ri-delete-bin-line"></i>
															</Link>
														</OverlayTrigger>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className=" text-center">
														<input type="checkbox" className="form-check-input" />
													</div>
												</td>
												<td>
													<img className="rounded-circle img-fluid avatar-40 me-2" src={pageimg4.src} alt="profile" />{" "}
													total comments
												</td>
												<td>Document</td>
												<td>Mar 21, 2020</td>
												<td>500 kb</td>
												<td>Barb Ackue</td>
												<td>
													<div className="flex align-items-center list-user-action">
														<OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
															<Link href="#">
																<i className="ri-download-line"></i>
															</Link>
														</OverlayTrigger>
														<OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
															<Link href="#">
																<i className="ri-delete-bin-line"></i>
															</Link>
														</OverlayTrigger>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Card.Body>
						</Card>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};
const CreateEventMenu = () => {
	const [show, setShow] = useState(false);
	const handleSubmit = async (values: any) => {
		// //console.log(values);
		// const res = await RemoteApiCall({
		// 	method: "POST",
		// 	url: `/Sponsored/add`,
		// 	body: { ...values },
		// });
		// //console.log(res);
		// Router.push("/admin/sponsored");
	};
	const formTabs = [
		{
			id: 1,
			name: "Add Details",
			title: "Add New Sponsored",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "first_name",
					name: "first_name",
					labelText: "First Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "First Name",
				},
				{
					id: "evenet_time",
					name: "evenet_time",
					labelText: "Evenet time",
					elemetType: FormElementTypes.Datepicker,
					required: false,
					placeholder: "Evenet Time",
				},
			],
		},
		{
			id: 2,
			name: "Add New Sponsored",
			title: "Add New Sponsored",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "first_name",
					name: "first_name",
					labelText: "First Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "First Name",
				},
				{
					id: "middle_name",
					name: "middle_name",
					labelText: "Middle Name",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "Middle Name",
				},
				{
					id: "FatherName",
					name: "FatherName",
					labelText: "Father Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "First Name",
				},
				{
					id: "last_name",
					name: "last_name",
					labelText: "Last Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "Last Name",
				},
			],
		},
	];
	return (
		<Col sm={12}>
			<Card>
				<Card.Body className=" profile-page p-0">
					<div className="profile-header">
						<div className="position-relative">
							<img src={img1.src} alt="profile-bg" className="rounded img-fluid" />
						</div>
						<div className="user-detail text-center mb-3">
							<div className="profile-img">
								<img src={img2.src} alt="profile-img1" className="avatar-130 img-fluid" />
							</div>
							<div className="profile-detail">
								<div className="profile-detail">
									<h3>Bni Cyst</h3>
								</div>
							</div>
						</div>
						<div className="profile-info p-3 d-flex align-items-center justify-content-start position-relative">
							<div className="social-info">
								<button
									className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
									onClick={() => setShow(true)}>
									Create a new Post
								</button>
							</div>
						</div>
					</div>
				</Card.Body>

				<Modal size="lg" show={show}>
					<Modal.Header className="d-flex justify-content-between">
						<h5 className="modal-title" id="post-modalLabel">
							Create Post
						</h5>
						<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
							<i className="ri-close-fill"></i>
						</button>
					</Modal.Header>
					<Modal.Body>
						<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} />
					</Modal.Body>
				</Modal>
			</Card>
		</Col>
	);
};
const SponseredView = ({ sponsered }: any) => {
	if (sponsered && sponsered.length > 0)
		return (
			<Container>
				<Row>
					<CreateEventMenu />

					<SponsoredEvent />

					<Col>
						<div className="col-sm-12 text-center">
							<img src={loader.src} alt="loader" style={{ height: "100px" }} />
						</div>
					</Col>
				</Row>
			</Container>
		);
	return <h1>no data</h1>;
};
export default SponseredView;
