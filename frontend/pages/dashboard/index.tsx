import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/sidebar";
import { AdminNav, PatronNav } from "components/consts";
import { UserStatus, useUserState } from "context/user";
import SponsoredEvents from "expecto-patronum-common";
import SponsoredEventsView from "components/Dashboard/SponsoredEventsView";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

export default function Dashboared() {
	const { user } = useUserState();
	const [sponsoredEvents, setSponsoredEvents] = useState([]);
	useEffect(() => {
		const getData = async () => {
			if (user && user.status == UserStatus.loggedIn) {
				const res = await RemoteApiCall({
					method: "GET",
					url: "/sponsored-events/me",
				});
				setSponsoredEvents(res.data);
			}
		};
		getData();
	}, [user]);

	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}

	return (
		<Layout items={PatronNav}>
			{sponsoredEvents.map((sponsoredEvent) => (
				<SponsoredEventsView sponsoredEvent={sponsoredEvent} />
			))}
		</Layout>
	);
}
