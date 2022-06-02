import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import { AdminNav } from "../consts";
import SponseredView from "components/SponseredView";
import user09 from "../../../assets/images/user/09.jpg";
import { UserStatus, useUserState } from "context/user";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { user } = useUserState();
	const [sponsoredParams, setSponsoredParams] = useState({});

	const patrnDecorator = (value: any, id: any) => {
		return `${value.firstName} ${value.lastName}`;
	};
	const sponsered = [
		{
			id: 1,
			name: "Yolo",
			age: "15",
			img: user09.src,
			description: "Let see if this works, it's seems it is",
		},
	];
	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}
	return (
		<Layout items={AdminNav}>
			<SponseredView sponsered={sponsered} />
		</Layout>
	);
}
