import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/sidebar";
import { AdminNav, PatronNav } from "components/consts";
import { UserStatus, useUserState } from "context/user";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts

export default function Dashboared() {
	const { user } = useUserState();

	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}
	const patrnDecorator = (value: any, id: any) => {
		return `${value.firstName} ${value.lastName}`;
	};

	const patrnSort = (key: string, data: any, newDirection: number): any => {
		return data.sort((a: any, b: any) => {
			if (a[key] && b[key]) {
				if (a[key].lastName < b[key].lastName) return newDirection * -1;
				else if (a[key].lastName > b[key].lastName) return newDirection;

				return a[key].firstName < b[key].firstName ? newDirection * -1 : newDirection;
			}
			if (a[key]) return newDirection * -1;
			return 1;
		});
	};
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
					<Button className="btn btn-primary btn-rounded btn-sm ms-1">Profile</Button>
				</Link>
			</span>
		);
	};
	const sponsoredHeaders = [
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

	return (
		<Layout items={PatronNav}>
			<Container>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body>
								<h4>Sponsered</h4>
							</Card.Body>
						</Card>
						<TableDatasource headers={sponsoredHeaders} keyValue="id" dataSourceUrl="/sponsored/me/" />
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
