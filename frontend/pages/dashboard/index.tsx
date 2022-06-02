import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/sidebar";
import { AdminNav } from "pages/admin/consts";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

const items = [
	{ href: "/", icon: "las la-newspaper", title: "Newsfeed" },
	{ href: "/", icon: "las la-newspaper", title: "Newsfeed" },
	{ href: "/", icon: "las la-newspaper", title: "Newsfeed" },
];
export default function SgProfile() {
	const { loading, loggedOut, user, mutate } = //useUser();
	const [sponsoredParams, setSponsoredParams] = useState({});
	if (loading) return <h1>loading</h1>;
	else if (loggedOut) {
		Router.push("/");
	}

	return <Layout items={AdminNav}>lol</Layout>;
}
