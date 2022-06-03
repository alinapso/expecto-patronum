import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import SponsoredTable from "../components/sponsered_table";
import Form from "components/Form";
import { UserStatus, useUserState } from "context/user";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
	const { user } = useUserState();

	if (user.status == UserStatus.Loading)
		return (
			<Layout>
				<h1>Your profile</h1>
				Loading.....
			</Layout>
		);
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}

	return (
		<Layout>
			<h1>Hi </h1>
			{user && (
				<>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</>
			)}
		</Layout>
	);
}
