import React, { useEffect, useRef, useState } from "react";
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

	const formTabs = [
		{
			id: 1,
			name: "1-test",
			title: "Test",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "test1",
					name: "test1",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "string",
				},
				{
					id: "test-file",
					name: "test-file",
					labelText: "string",
					elemetType: FormElementTypes.File,
					required: true,
					placeholder: "string",
				},
				{
					id: "test-date",
					name: "test-date",
					labelText: "date",
					elemetType: FormElementTypes.Datepicker,
					required: true,
					placeholder: "string",
				},
			],
		},

		{
			id: 2,
			name: "asdasdtest4",
			title: "asdasdTest4",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: false,
			elements: [
				{
					id: "test2",
					name: "test2",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
					style: "col-md-6",
				},
				{
					id: "text3",
					name: "test3",
					labelText: "string",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "string",
					style: "col-md-6",
				},
				{
					id: "test4",
					name: "test4",
					labelText: "string",
					elemetType: FormElementTypes.Textarea,
					required: false,
					placeholder: "string",
				},
			],
		},
	];

	if (loading) return <h1>loading</h1>;
	else if (loggedOut) {
		Router.push("/");
	}
	const handleSubmit = (values: any) => {
		console.log(values);
	};
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
								<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
