import { RemoteApiCall } from "lib/remoteAPI";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

import Layout, { SecurityLevel } from "components/layout/Layout";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
import { useState } from "react";
import { UserStatus, useUserState } from "../../../context/user";
import Router from "next/router";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { user } = useUserState();

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
	const gotoExpenses = (value: any, id: any) => {
		return (
			<span className="table-remove">
				<Link href={`/dashboard/sponsored/${id}`}>
					<Button className="btn btn-success btn-rounded btn-sm ms-1">Expenses</Button>
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
	const gotoProfile = (value: any, id: any) => {
		return (
			<>
				<Link href={`/dashboard/sponsored/${id}`}>
					<Button className="btn btn-primary btn-rounded btn-sm ms-1">Profile</Button>
				</Link>
				<Link href={`/dashboard/sponsored/expenses/${id}`}>
					<Button className="btn btn-success btn-rounded btn-sm ms-1">Expenses</Button>
				</Link>
				{/* <Button className="btn btn-danger btn-rounded btn-sm ms-1">stop</Button> */}
			</>
		);
	};
	const headers = [
		{ name: "First Name", mapKey: "firstName" },
		{ name: "Middle Name", mapKey: "middleName" },
		{ name: "Last Name", mapKey: "lastName" },
		{ name: "Father Name", mapKey: "fatherName" },
		{ name: "Birth Date", mapKey: "birthDate", customDecorators: dateDecorator },
		{
			name: "Patron",
			mapKey: "patron",
			customDecorators: patrnDecorator,
			customSort: patrnSort,
		},
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
		<Layout securityLevel={SecurityLevel.ADMIN}>
			<Container>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body>
								<div className="d-flex justify-content-between pb-3">
									<h4>Sponsered</h4>
									<div>
										<Link href="/admin/sponsored/add">
											<Button className="btn btn-primary btn-rounded btn-sm ms-1">Add</Button>
										</Link>
									</div>
								</div>
								<TableDatasource headers={headers} keyValue="id" dataSourceUrl="/sponsored/" />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
