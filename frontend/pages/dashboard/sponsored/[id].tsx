import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/layout/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import { UserStatus, useUserState } from "context/user";
import SponseredView from "components/SponseredView";

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
