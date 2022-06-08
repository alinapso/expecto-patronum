import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import SponseredView from "components/SponseredView";
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
