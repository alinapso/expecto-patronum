import Head from "next/head";
import Header from "components/Header";
import Sidebar from "./sidebar";
import { AdminNav, PatronNav } from "../components/consts";
import { UserStatus, useUserState } from "context/user";
import Router from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

export enum SecurityLevel {
	ANONYMOUS,
	USER,
	ADMIN,
}

export default function LayoutUser({
	children,
	securityLevel,
}: {
	children: React.ReactNode;
	securityLevel: SecurityLevel;
}) {
	const { user } = useUserState();
	const isAdmin = user && user.status == UserStatus.loggedIn && user.data.role === "ADMIN";
	const items = isAdmin ? [...PatronNav, ...AdminNav] : PatronNav;

	if (user.status == UserStatus.Loading)
		return (
			<Container>
				<Row className="justify-content-center">
					<Col md="auto">
						<ClipLoader color={"#000000"} size={150} />
					</Col>
				</Row>
			</Container>
		);
	if (securityLevel != SecurityLevel.ANONYMOUS && user.status == UserStatus.LoggedOut) {
		Router.push("/signin");
		return <h1>Not Logged In</h1>;
	}
	if (securityLevel == SecurityLevel.ADMIN && user.data.role != "ADMIN") {
		Router.push("/dashboard");
		return <h1>You are not suppose to be here</h1>;
	}

	return (
		<>
			<Head>
				<title>Expecto Patronom</title>
			</Head>
			<div className="wrapper">
				{items && items.length > 0 ? <Sidebar items={items} /> : <></>}
				<Header navbarEnabled={items && items.length > 0} />

				<div id="content-page" className="content-page">
					<div className="container">{children}</div>
				</div>
			</div>
		</>
	);
}
