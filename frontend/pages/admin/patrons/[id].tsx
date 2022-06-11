import React from "react";
import Layout, { pageIsLoading, SecurityLevel } from "components/layout/Layout";
import Router, { useRouter } from "next/router";

import { Row, Col, Card, Button } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import { patronReportHeaders } from "pages/dashboard/reports";
import useSWR from "swr";
import { useUserState, UserStatus } from "context/user";
import { RemoteApiCall } from "lib/remoteAPI";

export default function PatronProfile() {
	const headers = patronReportHeaders();
	const router = useRouter();

	const { id } = router.query;
	const { user } = useUserState();
	const {
		data: patronData,
		error,
		mutate,
	} = useSWR(
		{
			method: "GET",
			url: `/users/${id}`,
		},

		RemoteApiCall
	);
	if (patronData?.status == UserStatus.Loading) return pageIsLoading;
	if (patronData?.error) Router.push("/dashboard");
	if (patronData?.status == 200) {
		console.log(patronData.data);
		return (
			<Layout securityLevel={SecurityLevel.ADMIN}>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body>
								<h3>
									Name: {patronData.data.firstName} {patronData.data.lastName}
								</h3>
								<span>Address : {patronData.data.Address}</span>
							</Card.Body>
						</Card>
						<Card>
							<Card.Body>
								<TableDatasource headers={headers} keyValue="id" dataSourceUrl={`/sponsored/patron/${id}`} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Layout>
		);
	}
}
