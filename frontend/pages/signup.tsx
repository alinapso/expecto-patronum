import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Image, Alert } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import { RemoteApiCall } from "lib/remoteAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
export default function SignUp() {
	const [errorMsg, setErrorMsg] = useState("");
	const [showErrorBox, setShowErrorBox] = useState(false);

	useEffect(() => {
		setShowErrorBox(errorMsg != "");
	}, [errorMsg]);
	return (
		<>
			<section className="sign-in-page">
				<div id="container-inside">
					<div id="circle-small"></div>
					<div id="circle-medium"></div>
					<div id="circle-large"></div>
					<div id="circle-xlarge"></div>
					<div id="circle-xxlarge"></div>
				</div>
				<Container className="p-0">
					<Row className="no-gutters">
						<Col md="6" className="text-center pt-5">
							<div className="sign-in-detail text-white">
								<div className="sign-slider overflow-hidden"></div>
							</div>
						</Col>
						<Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
							<div className="sign-in-from">
								<h1 className="mb-0">Sign Up</h1>
								<p>Enter your email address and password to access admin panel.</p>
								<Form
									className="mt-4"
									onSubmit={async function handleSubmit(event) {
										try {
											event.preventDefault();
											setErrorMsg("");
											const email = event.currentTarget.email.value;
											const password = event.currentTarget.password.value;
											const validatePassword = event.currentTarget.validatePassword.value;
											const agreeTerms = event.currentTarget.agreeTerms.value;

											if (password !== validatePassword) {
												setErrorMsg("Passwords must match");
												return;
											}
											let res = await RemoteApiCall({
												method: "POST",
												url: "/auth/signup",
												body: {
													email,
													password,
												},
											});
											if (res.status == 201) {
												localStorage.setItem("api_access_token", res.data.access_token);
												Router.push("/signin");
											} else {
												let error_msg = "";

												switch (res.data.message) {
													case "Credentials taken":
														error_msg = "That email is already taken";
													default:
														error_msg = res.data.message;
												}
												setErrorMsg(error_msg);
											}
										} catch (error) {
											console.error("An unexpected error happened:", error);
										}
									}}>
									<Alert
										variant="alert alert-solid alert-danger mb-3"
										show={showErrorBox}
										role="alert"
										onClose={() => setShowErrorBox(false)}
										dismissible>
										<span>
											<FontAwesomeIcon icon={faTriangleExclamation} />
										</span>
										<span> {errorMsg}</span>
									</Alert>
									<Form.Group className="form-group">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" className="mb-0" id="email" placeholder="Enter email" required />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" className="mb-0" id="password" placeholder="Password" required />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Validate Password</Form.Label>
										<Form.Control
											type="password"
											className="mb-0"
											id="validatePassword"
											placeholder="Validate Password"
											required
										/>
									</Form.Group>
									<Form.Group className="d-inline-block w-100">
										<Form.Check className="d-inline-block mt-2 pt-1">
											<Form.Check.Input type="checkbox" className="me-2" id="agreeTerms" required />
											<Form.Check.Label>
												I accept <Link href="#">Terms and Conditions</Link>
											</Form.Check.Label>
										</Form.Check>
										<Button type="submit" className="btn-primary float-end">
											Sign Up
										</Button>
									</Form.Group>
									<div className="sign-info">
										<span className="dark-color d-inline-block line-height-2">
											Already Have Account ? <Link href="/auth/sign-in">Log In</Link>
										</span>
										<ul className="iq-social-media">
											<li>
												<Link href="#">
													<i className="ri-facebook-box-line"></i>
												</Link>
											</li>
											<li>
												<Link href="#">
													<i className="ri-twitter-line"></i>
												</Link>
											</li>
											<li>
												<Link href="#">
													<i className="ri-instagram-line"></i>
												</Link>
											</li>
										</ul>
									</div>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
