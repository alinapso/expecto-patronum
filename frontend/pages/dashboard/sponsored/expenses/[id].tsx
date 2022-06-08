import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import { useRouter } from "next/router";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import { Expenses, Sponsored, SponsoredEvents, UploadedFile } from "expecto-patronum-common";
import loader from "../../../../assets/images/page-img/page-load-loader.gif";
import Link from "next/link";
import { useRef } from "react";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SponsoredExpenses() {
	const router = useRouter();
	const [tableUrl, setTableUrl] = useState("");
	const [id, setId] = useState("");
	useEffect(() => {
		if (router && router.query) {
			console.log(router.query);
			setTableUrl(`/expenses/${router.query.id}`);
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
	const stratRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLInputElement>(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [tableSum, setTableSum] = useState(0);
	const dateDecorator = (value: any, id: any) => {
		console.log(value, id);
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
	const handleReset = () => {
		setTableUrl(`/expenses/${id}`);
		if (stratRef.current) stratRef.current.value = "";
		if (endRef.current) endRef.current.value = "";
	};
	const handleFileter = () => {
		const startDate = stratRef.current?.value;
		const endDate = endRef.current?.value;

		if (startDate != "" && endDate != "") {
			if (new Date(startDate as string) <= new Date(endDate as string)) {
				setTableUrl(`/expenses/${id}?startDate=${startDate}&endDate=${endDate}`);
				setErrorMessage("");
			} else {
				setErrorMessage("star date cant be later then end date");
			}
		} else setErrorMessage("please fill dates first");
	};
	const sponsoredHeaders = [
		{ name: "date", mapKey: "eventDate", customDecorators: dateDecorator },
		{ name: "Title", mapKey: "title" },
		{ name: "Sum", mapKey: "sum", customDecorators: (value: any, id: any) => `${value}$` },
	];

	const sponsored: Sponsored = sponsoredApiCall?.data[0];
	console.log(tableUrl);
	if (sponsored && tableUrl)
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
								<Row className="row align-items-center">
									<Col md-4>
										<Form.Group className={"form-group"} key="startDate">
											<Form.Label>Start Range</Form.Label>
											<Form.Control
												ref={stratRef}
												type="date"
												className="form-control"
												id="startDate"
												name="startDate"
											/>
										</Form.Group>
									</Col>
									<Col md-4>
										<Form.Group className={"form-group"} key="startDate">
											<Form.Label>End Range</Form.Label>
											<Form.Control ref={endRef} type="date" className="form-control" id="startDate" name="startDate" />
										</Form.Group>
									</Col>
									<Col md-4>
										<Button type="button" className="btn btn-labeled btn-success m-2" onClick={() => handleFileter()}>
											Filter
										</Button>
										<Button type="button" className="btn btn-labeled btn-danger" onClick={() => handleReset()}>
											Reset
										</Button>
									</Col>
								</Row>
								<Row className="row align-items-center">{errorMessage && <p className="error">{errorMessage}</p>}</Row>
							</Card.Body>
						</Card>
						<TableDatasource
							headers={sponsoredHeaders}
							keyValue="id"
							dataSourceUrl={tableUrl ? tableUrl : `/expenses/${id}`}
						/>
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
