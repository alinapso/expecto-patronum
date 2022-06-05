import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import { AdminNav } from "../../../components/consts";
import SponseredView from "components/SponseredView";
import user09 from "../../../assets/images/user/09.jpg";
import { UserStatus, useUserState } from "context/user";
import PatronProfile from "components/patronProfile";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { user } = useUserState();
	const [sponsoredParams, setSponsoredParams] = useState({});

	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}
	const { id } = Router.query;
	return (
		<Layout items={AdminNav}>
			<PatronProfile patronId={id as string} />
		</Layout>
	);
}
