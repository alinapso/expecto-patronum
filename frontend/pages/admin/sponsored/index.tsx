import { RemoteApiCall } from "lib/remoteAPI";
import useSWR, { useSWRConfig } from "swr";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

import { AdminNav } from "../consts";
import Layout from "components/Layout";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
import { useState } from "react";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const [refresh, setRefresh] = useState(false);

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
	// const deactivateSponsered = async (id: any) => {
	// 	await RemoteApiCall({
	// 		method: "PATCH",
	// 		url: `/Sponsored/deactivate/${id}`,
	// 	});
	// 	setRefresh(!refresh);
	// };
	// const activateSponsered = async (id: any) => {
	// 	await RemoteApiCall({
	// 		method: "PATCH",
	// 		url: `/Sponsored/activate/${id}`,
	// 	});
	// 	setRefresh(!refresh);
	// };
	const gotoProfile = (value: any, id: any) => {
		return (
			<span className="table-remove">
				<Link href={`/admin/sponsored/${id}`}>
					<Button className="btn btn-primary btn-rounded btn-sm ms-1">Profile</Button>
				</Link>
			</span>
		);
	};
	const headers = [
		{ name: "First Name", mapKey: "first_name", sortable: true },
		{ name: "Middle Name", mapKey: "middle_name", sortable: true },
		{ name: "Last Name", mapKey: "last_name", sortable: true },
		{ name: "Father Name", mapKey: "FatherName", sortable: true },
		{
			name: "Patron",
			mapKey: "patron",
			customDecorators: patrnDecorator,
			customSort: patrnSort,
		},
		{
			name: "Start Date",
			mapKey: "start_date",
			customDecorators: dateDecorator,
		},
		{
			name: "End Date",
			mapKey: "end_date",
			customDecorators: dateDecorator,
		},
		{
			name: "Monthly sum",
			mapKey: "monthly_sum",
		},
		{
			name: "_remove",
			mapKey: "is_active",
			customDecorators: gotoProfile,
		},
	];

	return (
		<Layout items={AdminNav}>
			<Container>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body className="d-flex justify-content-between">
								<h4>Sponsered</h4>
								<div>
									<Link href="/admin/sponsored/add">
										<Button className="btn btn-primary btn-rounded btn-sm ms-1">Add</Button>
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<TableDatasource headers={headers} keyValue="id" dataSourceUrl="/sponsored/" />
			</Container>
		</Layout>
	);
}
