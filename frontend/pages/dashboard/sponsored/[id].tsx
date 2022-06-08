import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import SponseredView from "components/SponseredView";
import user09 from "../../../assets/images/user/09.jpg";
import { UserStatus, useUserState } from "context/user";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { user } = useUserState();
	const [sponsoredParams, setSponsoredParams] = useState({});

	return (
		<Layout securityLevel={SecurityLevel.USER}>
			<SponseredView />
		</Layout>
	);
}
