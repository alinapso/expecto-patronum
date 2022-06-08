import React from "react";
import Layout, { SecurityLevel } from "components/Layout";

import { Row, Col, Card, Button } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import { patronReportHeaders } from "pages/dashboard/reports";
import { useRouter } from "next/router";

export default function PatronProfile() {
	const headers = patronReportHeaders();
	const router = useRouter();

	const { id } = router.query;

	return (
		<Layout securityLevel={SecurityLevel.USER}>
			<Row>
				<Col sm="12">
					<Card>
						<Card.Body>
							<h4></h4>
						</Card.Body>
					</Card>
					<TableDatasource headers={headers} keyValue="id" dataSourceUrl={`/sponsored/patron/${id}`} />
				</Col>
			</Row>
		</Layout>
	);
}
