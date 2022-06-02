import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Image, Alert } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import { login } from "lib/auth";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserState, UserStatus } from "context/user";

export default function SignUp() {
	const [errorMsg, setErrorMsg] = useState("");
	const [showErrorBox, setShowErrorBox] = useState(false);
	const { user, loginUser } = useUserState();
	useEffect(() => {
		if (user.status == UserStatus.loggedIn) Router.push("/");
		console.log(user);
	}, [user]);
	return (
		<>
			<section className="sign-in-page">
				<div id="container-inside">
					<div id="circle-small" className="d-none d-sm-none d-md-block"></div>
					<div id="circle-medium" className="d-none d-sm-none d-md-block"></div>
					<div id="circle-large" className="d-none d-sm-none d-md-block"></div>
					<div id="circle-xlarge " className="d-none d-sm-none d-md-block"></div>
					<div id="circle-xxlarge" className="d-none d-sm-none d-md-block"></div>
				</div>
				<Container className="p-0 mx-auto">
					<Row className="no-gutters ">
						<Col md="6" className="text-center pt-5 d-none d-sm-none d-md-block">
							<div className="sign-in-detail text-white">
								<div className="sign-slider overflow-hidden"></div>
							</div>
						</Col>
						<Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5 mx-auto">
							<div className="sign-in-from">
								<h1 className="mb-0">Sign Up</h1>
								<p>Enter your email address and password to access admin panel.</p>
								<Form
									className="mt-4"
									onSubmit={async function handleSubmit(event) {
										event.preventDefault();
										setShowErrorBox(false);
										setErrorMsg("");
										try {
											await loginUser(event.currentTarget.email.value, event.currentTarget.password.value);
										} catch (error: any) {
											setErrorMsg(error.toString());
											setShowErrorBox(true);
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
										<Form.Control type="email" className="mb-0" id="email" placeholder="Enter email" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Password</Form.Label>
										<Link href="#" className="float-end">
											Forgot password?
										</Link>
										<Form.Control type="password" className="mb-0" id="password" placeholder="Password" />
									</Form.Group>
									<div className="d-inline-block w-100">
										<Form.Check className="d-inline-block mt-2 pt-1">
											<Form.Check.Input type="checkbox" className="me-2" id="customCheck11" />
											<Form.Check.Label>Remember Me</Form.Check.Label>{" "}
										</Form.Check>
										<Button variant="primary" type="submit" className="float-end">
											Sign in
										</Button>
									</div>
									<div className="sign-info">
										<span className="dark-color d-inline-block line-height-2">
											Don't have an account? <Link href="/auth/sign-up">Sign up</Link>
										</span>
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
