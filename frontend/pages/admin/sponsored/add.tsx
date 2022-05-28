import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { AdminNav } from "../consts";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import Link from "next/link";
import { Container, Col, Row, Card, Form, Nav, TabContent, TabPane, Button, Image } from "react-bootstrap";
import DynamicForm from "components/Form";
import FormSectionDto from "components/Form/types/FormSectionDto";
import { FormElementTypes } from "components/Form/types/FormElementDto";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { loading, loggedOut, user, mutate } = useUser();
	const [show, AccountShow] = useState("user-detail");
	if (loading) return <h1>loading</h1>;
	else if (loggedOut) {
		Router.push("/");
	}

	const formTabs = [
		{
			id: 1,
			name: "1-test",
			title: "Test",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "1-text",
					name: "string",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
			],
		},
		{
			id: 2,
			name: "2-test2",
			title: "Test2",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: false,
			elements: [
				{
					id: "2-text2",
					name: "string",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
			],
		},
		{
			id: 3,
			name: "astest3",
			title: "Test3",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: false,
			elements: [
				{
					id: "asdasdtext2",
					name: "sadasdstring",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
			],
		},
		{
			id: 4,
			name: "asdasdtest4",
			title: "asdasdTest4",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: false,
			elements: [
				{
					id: "asdasdtext1",
					name: "asdasasdasstring",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
				{
					id: "text2",
					name: "asdasdasxcstring",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
				{
					id: "asdasdtext3",
					name: "zxwasdstring",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
				},
			],
		},
	];
	return (
		<Layout items={AdminNav}>
			<Container>
				<Row>
					<Col sm="12" lg="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<div className="header-title">
									<h4 className="card-title">Validate Wizard</h4>
								</div>
							</Card.Header>
							<Card.Body>
								<DynamicForm tabs={formTabs} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
