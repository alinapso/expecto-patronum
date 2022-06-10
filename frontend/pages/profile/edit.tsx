import React, { useEffect, useRef, useState } from "react";
import Layout, { SecurityLevel } from "components/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import Link from "next/link";
import { Container, Col, Row, Card, Form, Nav, TabContent, TabPane, Button, Image } from "react-bootstrap";
import DynamicForm from "components/Form";
import { FormElementTypes } from "components/Form/types/FormElementDto";
import { UserStatus, useUserState } from "context/user";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function UserProfileEdit() {
	const { user } = useUserState();

	const formTabs = [
		{
			id: 1,
			name: "complete-profile",
			title: "Please Complete your profile",
			icon: "ri-lock-unlock-line bg-soft-primary text-primary",
			active: true,
			elements: [
				{
					id: "firstName",
					name: "firstName",
					labelText: "First Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "First Name",
				},

				{
					id: "lastName",
					name: "lastName",
					labelText: "Last Name",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "Last Name",
				},
				{
					id: "Address",
					name: "Address",
					labelText: "Address",
					elemetType: FormElementTypes.Textarea,
					required: true,
					placeholder: "Address",
				},
			],
		},
	];

	const handleSubmit = async (values: any) => {
		console.log(values);
		const res = await RemoteApiCall({
			method: "PATCH",
			url: `/users/me`,
			body: { ...values },
		});
		console.log(res);
		if (res.status == 201) Router.push("/dashboard");
	};
	if (user)
		return (
			<Layout securityLevel={SecurityLevel.USER} noNav={true}>
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
	return <>Hi</>;
}
