import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Tab, Nav } from "react-bootstrap";
import TableDatasource from "components/TableDatasource";
import { useRouter } from "next/router";

import { useRef } from "react";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function TimeFilteredTable({ baseurl, headers }: { baseurl: string; headers: any }) {
	const router = useRouter();
	const [tableUrl, setTableUrl] = useState(baseurl);

	const stratRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLInputElement>(null);

	const [errorMessage, setErrorMessage] = useState("");

	const handleReset = () => {
		setTableUrl(baseurl);
		if (stratRef.current) stratRef.current.value = "";
		if (endRef.current) endRef.current.value = "";
	};
	const handleFileter = () => {
		const startDate = stratRef.current?.value;
		const endDate = endRef.current?.value;

		if (startDate != "" && endDate != "") {
			if (new Date(startDate as string) <= new Date(endDate as string)) {
				setTableUrl(`${baseurl}?startDate=${startDate}&endDate=${endDate}`);
				setErrorMessage("");
			} else {
				setErrorMessage("star date cant be later then end date");
			}
		} else setErrorMessage("please fill dates first");
	};

	return (
		<>
			<Row className="row align-items-center">
				<Col md={4}>
					<Form.Group className={"form-group"} key="startDate">
						<Form.Label>Start Range</Form.Label>
						<Form.Control ref={stratRef} type="date" className="form-control" id="startDate" name="startDate" />
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group className={"form-group"} key="startDate">
						<Form.Label>End Range</Form.Label>
						<Form.Control ref={endRef} type="date" className="form-control" id="startDate" name="startDate" />
					</Form.Group>
				</Col>
				<Col md={4}>
					<Button type="button" className="btn btn-labeled btn-success m-2" onClick={() => handleFileter()}>
						Filter
					</Button>
					<Button type="button" className="btn btn-labeled btn-danger" onClick={() => handleReset()}>
						Reset
					</Button>
				</Col>
			</Row>
			<Row className="row align-items-center">{errorMessage && <p className="error">{errorMessage}</p>}</Row>
			<Row>
				<TableDatasource headers={headers} keyValue="id" dataSourceUrl={tableUrl} />
			</Row>
		</>
	);
}
