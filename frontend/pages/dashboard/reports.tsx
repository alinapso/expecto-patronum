import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/sidebar";
import { UserStatus, useUserState } from "context/user";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

export default function PatronReports() {
	const headers = patronReportHeaders();
	return (
		<Layout securityLevel={SecurityLevel.USER}>
			<Row>
				<Col sm="12">
					<Card>
						<Card.Body>
							<h4>Sponsered</h4>
						</Card.Body>
					</Card>
					<TableDatasource headers={headers} keyValue="id" dataSourceUrl="/sponsored/me/" />
				</Col>
			</Row>
		</Layout>
	);
}
export const patronReportHeaders = () => {
	const dateDecorator = (value: any, id: any) => {
		const date = new Date(value);

		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		}).format(date);
	};

	const gotoProfile = (value: any, id: any) => {
		return (
			<span className="table-remove">
				<Link href={`/dashboard/sponsored/${id}`}>
					<a>
						<Button className="btn btn-primary btn-rounded btn-sm ms-1">Profile</Button>
					</a>
				</Link>
				<Link href={`/dashboard/sponsored/expenses/${id}`}>
					<a>
						<Button className="btn btn-success btn-rounded btn-sm ms-1">Expenses</Button>
					</a>
				</Link>
			</span>
		);
	};

	const stopSponsership = (value: any, id: any) => {
		return (
			<span className="table-remove">
				<Button className="btn btn-danger btn-rounded btn-sm ms-1">stop</Button>
			</span>
		);
	};
	const headers = [
		{ name: "First Name", mapKey: "firstName" },
		{ name: "Middle Name", mapKey: "middleName" },
		{ name: "Last Name", mapKey: "lastName" },
		{ name: "Father Name", mapKey: "fatherName" },
		{ name: "Birth Date", mapKey: "birthDate", customDecorators: dateDecorator },

		{
			name: "Start Date",
			mapKey: "startDate",
			customDecorators: dateDecorator,
		},
		{
			name: "End Date",
			mapKey: "endDate",
			customDecorators: dateDecorator,
		},
		{
			name: "Monthly sum",
			mapKey: "monthlyDum",
		},
		{
			name: "_profile",
			mapKey: "isActive",
			customDecorators: gotoProfile,
		},
	];
	return headers;
};
