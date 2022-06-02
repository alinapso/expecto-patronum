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
	return (
		<Col sm={12}>
			<Card id="post-modal-data">
				<div className="card-header d-flex justify-content-between">
					<div className="header-title">
						<h4 className="card-title">Create Post</h4>
					</div>
				</div>
				<Card.Body>
					<ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
						<li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
							<img src={small07.src} alt="icon" className="img-fluid me-2" /> Photo/Video
						</li>
						<li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
							<img src={small08.src} alt="icon" className="img-fluid me-2" /> Tag Friend
						</li>
						<li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3">
							<img src={small09.src} alt="icon" className="img-fluid me-2" /> Feeling/Activity
						</li>
					</ul>
				</Card.Body>
				<Modal size="lg">
					<Modal.Header className="d-flex justify-content-between">
						<h5 className="modal-title" id="post-modalLabel">
							Create Post
						</h5>
						<button type="button" className="btn btn-secondary">
							<i className="ri-close-fill"></i>
						</button>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex align-items-center">
							<div className="user-img">
								<img src={img5.src} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
							</div>
							<form className="post-text ms-3 w-100" action="">
								<input
									type="text"
									className="form-control rounded"
									placeholder="Write something here..."
									style={{ border: "none" }}
								/>
							</form>
						</div>
						<hr />
						<ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
							<li className="col-md-6 mb-3">
								<div className="bg-soft-primary rounded p-2 pointer me-3">
									<Link href="#18">
										<>
											<img src={small1.src} alt="icon" className="img-fluid" /> Play with Friends
										</>
									</Link>
								</div>
							</li>
							<li className="col-md-6 mb-3">
								<div className="bg-soft-primary rounded p-2 pointer me-3">
									<Link href="#2">
										<>
											<img src={small8.src} alt="icon" className="img-fluid" /> Play with Friends
										</>
									</Link>
								</div>
							</li>
							<li className="col-md-6 mb-3">
								<div className="bg-soft-primary rounded p-2 pointer me-3">
									<Link href="#3">
										<>
											<img src={small8.src} alt="icon" className="img-fluid" /> Play with Friends
										</>
									</Link>
								</div>
							</li>
							<li className="col-md-6 mb-3">
								<div className="bg-soft-primary rounded p-2 pointer me-3">
									<Link href="#4">
										<>
											<img src={small8.src} alt="icon" className="img-fluid" /> Play with Friends
										</>
									</Link>
								</div>
							</li>
							<li className="col-md-6 mb-3">
								<div className="bg-soft-primary rounded p-2 pointer me-3">
									<Link href="#8">
										<>
											<img src={small8.src} alt="icon" className="img-fluid" /> Play with Friends
										</>
									</Link>
								</div>
							</li>
						</ul>
						<hr />
						<div className="other-option">
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="user-img me-3">
										<img src={user9.src} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
									</div>
									<h6>Your Story</h6>
								</div>
								<div className="card-post-toolbar">
									<Dropdown>
										<Dropdown.Toggle
											className="dropdown-toggle"
											data-bs-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
											role="button">
											<span className="btn btn-primary">Friend</span>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu m-0 p-0">
											<Dropdown.Item className="dropdown-item p-3" href="#">
												<div className="d-flex align-items-top">
													<i className="ri-save-line h4"></i>
													<div className="data ms-2">
														<h6>Public</h6>
														<p className="mb-0">Anyone on or off Facebook</p>
													</div>
												</div>
											</Dropdown.Item>
											<Dropdown.Item className="dropdown-item p-3" href="#">
												<div className="d-flex align-items-top">
													<i className="ri-close-circle-line h4"></i>
													<div className="data ms-2">
														<h6>Friends</h6>
														<p className="mb-0">Your Friend on facebook</p>
													</div>
												</div>
											</Dropdown.Item>
											<Dropdown.Item className="dropdown-item p-3" href="#">
												<div className="d-flex align-items-top">
													<i className="ri-user-unfollow-line h4"></i>
													<div className="data ms-2">
														<h6>Friends except</h6>
														<p className="mb-0">Don't show to some friends</p>
													</div>
												</div>
											</Dropdown.Item>
											<Dropdown.Item className="dropdown-item p-3" href="#">
												<div className="d-flex align-items-top">
													<i className="ri-notification-line h4"></i>
													<div className="data ms-2">
														<h6>Only Me</h6>
														<p className="mb-0">Only me</p>
													</div>
												</div>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</div>
						</div>
						<Button variant="primary" className="d-block w-100 mt-3">
							Post
						</Button>
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
					<Col sm={12}>
						<Card>
							<Card.Body className=" profile-page p-0">
								<div className="profile-header">
									<div className="position-relative">
										<img src={img1.src} alt="profile-bg" className="rounded img-fluid" />
									</div>
									<div className="user-detail text-center">
										<div className="profile-img">
											<img src={img2.src} alt="profile-img1" className="avatar-130 img-fluid" />
										</div>
										<div className="profile-detail">
											<div className="profile-detail">
												<h3>Bni Cyst</h3>
											</div>
										</div>
									</div>
									<div className="profile-info p-3 d-flex align-items-center justify-content-center position-relative">
										<div className="social-info"></div>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>

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
