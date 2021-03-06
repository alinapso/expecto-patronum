import React, { useEffect, useRef, useState } from "react";
import Layout, { SecurityLevel } from "components/layout/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import Link from "next/link";
import { Container, Col, Row, Card, Form, Nav, TabContent, TabPane, Button, Image } from "react-bootstrap";
import DynamicForm from "components/Form";
import { FormElementTypes } from "components/Form/types/FormElementDto";
import { UserStatus, useUserState } from "context/user";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
	const { user } = useUserState();

	const formTabs = [
		{
			id: 1,
			name: "Add New Sponsored",
			title: "Add New Sponsored",
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
					id: "middleName",
					name: "middleName",
					labelText: "Middle Name",
					elemetType: FormElementTypes.Text,
					required: false,
					placeholder: "Middle Name",
				},
				{
					id: "fatherName",
					name: "fatherName",
					labelText: "Father Name",
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
					id: "description",
					name: "description",
					labelText: "Description",
					elemetType: FormElementTypes.Textarea,
					required: true,
					placeholder: "Description",
				},
				{
					id: "birthDate",
					name: "birthDate",
					labelText: "Birth Date",
					elemetType: FormElementTypes.Datepicker,
					required: true,
					placeholder: "Birth Date",
				},
				{
					id: "placeOfBirth",
					name: "placeOfBirth",
					labelText: "Place Of Birth",
					elemetType: FormElementTypes.Text,
					required: true,
					placeholder: "Place Of Birth",
				},
				{
					id: "uploadedFileId",
					name: "uploadedFileId",
					labelText: "Profile Image",
					elemetType: FormElementTypes.Profile,
					required: true,
					placeholder: "Profile Image",
				},
			],
		},
	];

	const handleSubmit = async (values: any) => {
		const res = await RemoteApiCall({
			method: "POST",
			url: `/sponsored`,
			body: { ...values },
		});
		Router.push("/admin/sponsored");
	};

	return (
		<Layout securityLevel={SecurityLevel.ADMIN}>
			<Container>
				<Row>
					<Col sm="12" lg="12">
						<Card>
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
