import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/layout/Layout";
import { Col, Row, Card, Form, Button, Tab, Nav } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import { useRouter } from "next/router";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import { Expenses, Sponsored, SponsoredEvents, UploadedFile } from "expecto-patronum-common";
import loader from "../../../../assets/images/page-img/page-load-loader.gif";
import Link from "next/link";
import { useRef } from "react";
import TimeFilteredTable from "components/TimeFilteredTable";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SponsoredExpenses() {
	const router = useRouter();
	const [id, setId] = useState("");
	useEffect(() => {
		if (router && router.query) {
			// setExpenseTableUrl(`/expenses/${router.query.id}`);
			// setTransactionsTableUrl(`/transactions/sponsored/${router.query.id}`);
			setId(router.query.id as string);
		}
	}, [router]);

	const {
		data: sponsoredApiCall,
		error,
		mutate,
	} = useSWR(
		{
			method: "GET",
			url: `/sponsored/${id}`,
		},

		RemoteApiCall
	);

	const dateDecorator = (value: any, id: any) => {
		if (value) {
			const date = new Date(value);

			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
			}).format(date);
		}
		return "";
	};

	const sponsoredHeaders = [
		{ name: "date", mapKey: "eventDate", customDecorators: dateDecorator },
		{ name: "Title", mapKey: "title" },
		{ name: "Sum", mapKey: "sum", customDecorators: (value: any, id: any) => `${value}$` },
	];
	const transactionsHeaders = [
		{ name: "date", mapKey: "createdAt", customDecorators: dateDecorator },
		{ name: "Sum", mapKey: "sum", customDecorators: (value: any, id: any) => `${value}$` },
	];

	const sponsored: Sponsored = sponsoredApiCall?.data[0];
	if (sponsored)
		return (
			<Layout securityLevel={SecurityLevel.USER}>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body>
								<h5 className="mb-0 d-inline-block">
									<Link
										href={`/dashboard/sponsored/${sponsored.id}`}>{`${sponsored.firstName} ${sponsored.lastName}`}</Link>
									&ensp;Expenses
								</h5>
							</Card.Body>
						</Card>
						<Card>
							<Card.Body>
								<Tab.Container defaultActiveKey="first">
									<Nav>
										<Nav variant="tabs" className="mb-3" id="nav-tab" role="tablist">
											<Nav.Link
												eventKey="first"
												id="nav-home-tab"
												data-bs-toggle="tab"
												data-bs-target="#nav-home"
												type="button"
												role="tab"
												aria-controls="nav-home"
												aria-selected="true">
												Expenses
											</Nav.Link>
											<Nav.Link
												eventKey="second"
												id="nav-profile-tab"
												data-bs-toggle="tab"
												data-bs-target="#nav-profile"
												type="button"
												role="tab"
												aria-controls="nav-profile"
												aria-selected="true">
												Transactions
											</Nav.Link>
										</Nav>
									</Nav>
									<Tab.Content>
										<Tab.Pane
											className="fade show"
											eventKey="first"
											id="nav-home"
											role="tabpanel"
											aria-labelledby="nav-home-tab">
											<TimeFilteredTable baseurl={`/expenses/${router.query.id}`} headers={sponsoredHeaders} />
										</Tab.Pane>
										<Tab.Pane
											className="fade show"
											id="nav-profile"
											eventKey="second"
											role="tabpanel"
											aria-labelledby="nav-profile-tab">
											<TimeFilteredTable
												baseurl={`/transactions/sponsored/${router.query.id}`}
												headers={transactionsHeaders}
											/>
										</Tab.Pane>
									</Tab.Content>
								</Tab.Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Layout>
		);
	return (
		<Col>
			<div className="col-sm-12 text-center">
				<img src={loader.src} alt="loader" style={{ height: "100px" }} />
			</div>
		</Col>
	);
}
