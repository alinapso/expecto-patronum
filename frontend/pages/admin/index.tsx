import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Router from "next/router";
import { AdminNav } from "../../components/consts";
import LineChart from "components/indexCharts/totalDonationsByMonth";
import { Col, Card, Row } from "react-bootstrap";
import { useUserState, UserStatus } from "context/user";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
	const { user } = useUserState();
	console.log(user);
	useEffect(() => {
		console.log(user);
	}, [user]);
	if (user.status == UserStatus.Loading) return <h1>loading</h1>;
	else if (user.status == UserStatus.LoggedOut) {
		Router.push("/");
	}
	return (
		<Layout items={AdminNav}>
			<Row>
				<Col md={4}>
					<Card bg="primary" className=" text-white mb-3 h-100">
						<Card.Body>
							<Card.Title as="h4" className="text-white text-center">
								New Patrons Registered
							</Card.Title>
							<div className="d-flex justify-content-center">
								<h1 className=" text-white">60</h1>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card bg="warning" className=" text-white mb-3 h-100">
						<Card.Body>
							<Card.Title as="h4" className="text-white text-center ">
								New kids Sponsored
							</Card.Title>
							<div className="d-flex justify-content-center">
								<h1 className=" text-white">60</h1>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="text-white bg-success  mb-3 h-100">
						<Card.Body>
							<Card.Title as="h4" className="text-white text-center">
								total donations this month
							</Card.Title>
							<div className="d-flex justify-content-center">
								<h1 className=" text-white">600,152</h1>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={6}>
					<LineChart></LineChart>
				</Col>
			</Row>
		</Layout>
	);
}
