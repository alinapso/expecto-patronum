import Layout, { SecurityLevel } from "components/Layout";

import Router from "next/router";
import { UserStatus, useUserState } from "context/user";
export default function SgProfile() {
	const { user } = useUserState();

	return (
		<Layout securityLevel={SecurityLevel.ANONYMOUS}>
			<h1>Hi </h1>
			{user && (
				<>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</>
			)}
		</Layout>
	);
}
