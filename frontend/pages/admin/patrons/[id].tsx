import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";
import Router from "next/router";
import { UserStatus, useUserState } from "context/user";
import PatronProfile from "components/patronProfile";

export default function Sponsored() {
	const { user } = useUserState();

	const { id } = Router.query;
	return (
		<Layout securityLevel={SecurityLevel.ADMIN}>
			<PatronProfile patronId={id as string} />
		</Layout>
	);
}
