import Head from "next/head";
import Header from "components/Header";
import Sidebar from "./sidebar";
import { AdminNav, PatronNav } from "../components/consts";
import { UserStatus, useUserState } from "context/user";
import Router, { useRouter } from "next/router";
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
	noNav,
}: {
	children: React.ReactNode;
	securityLevel: SecurityLevel;
	noNav?: boolean;
}) {
	const { user } = useUserState();
	const isAdmin = user && user.status == UserStatus.loggedIn && user.data.role === "ADMIN";
	const items = isAdmin ? [...PatronNav, ...AdminNav] : PatronNav;
	const router = useRouter();
	const loader = (
		<Container>
			<Row className="justify-content-center">
				<Col md="auto">
					<ClipLoader color={"#000000"} size={150} />
				</Col>
			</Row>
		</Container>
	);
	if (user.status == UserStatus.Loading) return loader;
	if (securityLevel != SecurityLevel.ANONYMOUS) {
		if (user.status == UserStatus.LoggedOut) {
			Router.push("/signin");
			return loader;
		}
		if (user.data.firstName == "" || (user.data.firstName == undefined && router.asPath != "/profile/edit")) {
			Router.push("/profile/edit");
			return loader;
		}
		if (securityLevel == SecurityLevel.ADMIN && user.data.role != "ADMIN") {
			Router.push("/dashboard");
			return loader;
		}
	}

	return (
		<>
			<Head>
				<title>Expecto Patronom</title>
			</Head>
			<div className="wrapper">
				{!noNav && items && items.length > 0 ? <Sidebar items={items} /> : <></>}
				<Header navbarEnabled={!noNav && items && items.length > 0} />

				<div id="content-page" className="content-page">
					<div className="container">{children}</div>
				</div>
			</div>
		</>
	);
}
