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
export const pageIsLoading = (
	<Container>
		<Row className="justify-content-center">
			<Col md="auto">
				<ClipLoader color={"#000000"} size={150} />
			</Col>
		</Row>
	</Container>
);
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

	if (user.status == UserStatus.Loading) return pageIsLoading;
	if (securityLevel != SecurityLevel.ANONYMOUS) {
		if (user.status == UserStatus.LoggedOut) {
			Router.push("/signin");
			return pageIsLoading;
		}
		if (user.data.firstName == "" || (user.data.firstName == undefined && router.asPath != "/profile/edit")) {
			Router.push("/profile/edit");
			return pageIsLoading;
		}
		if (securityLevel == SecurityLevel.ADMIN && user.data.role != "ADMIN") {
			Router.push("/dashboard");
			return pageIsLoading;
		}
	}
	const showNav = securityLevel != SecurityLevel.ANONYMOUS && !noNav && items && items.length > 0;

	return (
		<>
			<Head>
				<title>Expecto Patronom</title>
			</Head>
			<div className="wrapper">
				{showNav ? <Sidebar items={items} /> : <></>}
				<Header navbarEnabled={showNav} />

				<div id="content-page" className="content-page">
					<div className="container">{children}</div>
				</div>
			</div>
		</>
	);
}
