import Layout from "components/Layout";

import Router from "next/router";
import { UserStatus, useUserState } from "context/user";
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
