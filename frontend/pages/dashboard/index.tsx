import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import { UserStatus, useUserState } from "context/user";
import { SponsoredEvents } from "expecto-patronum-common";
import { SponsoredEventView } from "components/SponseredView";
import { Col, Row } from "react-bootstrap";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

export default function Dashboared() {
	const { user } = useUserState();
	const [sponsoredEvents, setSponsoredEvents] = useState([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		getData();
	}, [user, refresh]);

	const refreshView = () => {
		setRefresh(!refresh);
	};
	const getData = async () => {
		if (user && user.status == UserStatus.loggedIn) {
			const res = await RemoteApiCall({
				method: "GET",
				url: "/sponsored-events/me",
			});
			setSponsoredEvents(res.data);
		}
	};

	const isAdmin = user && user.status == UserStatus.loggedIn && user.data.role === "ADMIN";
	const createSponsoredEventView = (sponsoredEvent: SponsoredEvents) => {
		return (
			<SponsoredEventView
				key={sponsoredEvent.id}
				sponsoredEvent={sponsoredEvent}
				sponsored={sponsoredEvent.sponsored}
				refresh={refreshView}
				isAdmin={isAdmin}
			/>
		);
	};
	const createTwoCoulumns = () => {
		let col1: any = [];
		let col2: any = [];
		sponsoredEvents.forEach((sponsoredEvent: SponsoredEvents, index) => {
			if (index % 2 == 0) col1.push(createSponsoredEventView(sponsoredEvent));
			else col2.push(createSponsoredEventView(sponsoredEvent));
		});
		return (
			<Row>
				<Col md={6} key="1">
					{col1}
				</Col>
				<Col md={6} key="2">
					{col2}
				</Col>
			</Row>
		);
	};
	return <Layout securityLevel={SecurityLevel.USER}>{createTwoCoulumns()}</Layout>;
}
