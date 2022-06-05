import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/sidebar";
import { AdminNav, PatronNav } from "components/consts";
import { UserStatus, useUserState } from "context/user";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

export default function Dashboared() {
	const { user } = useUserState();

	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}

	return <Layout items={PatronNav}>reports</Layout>;
}
