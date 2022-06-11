import React, { useEffect, useRef, useState } from "react";
import Layout, { pageIsLoading, SecurityLevel } from "components/layout/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import { Container, Col, Row, Card } from "react-bootstrap";
import DynamicForm from "components/Form";
import { FormElementTypes } from "components/Form/types/FormElementDto";
import { UserStatus, useUserState } from "context/user";

export default function UserProfileEdit() {
	const { user, mutate } = useUserState();
	const [errorMessage, setErrorMessage] = useState("");
	const formTabs = [
		{
			id: 1,
			name: "complete-profile",
			title:
				user.status == UserStatus.loggedIn && (user.data.firstName == "" || user.data.firstName == undefined)
					? "Please Complete your profile"
					: "Edit Profile",
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
		mutate();
		if (res.status == 200) Router.push("/dashboard");
		else setErrorMessage("somthing is wrong, please contact admin");
	};
	console.log(user);
	if (user.status == UserStatus.loggedIn) {
		let initVal = {
			firstName: user.data.firstName,
			lastName: user.data.lastName,
			Address: user.data.Address,
		};
		return (
			<Layout securityLevel={SecurityLevel.USER} noNav={true}>
				<Container>
					<Row>
						<Col sm="12">
							<Card>
								<Card.Header className="d-flex justify-content-between">
									{errorMessage && <p className="error">{errorMessage}</p>}
								</Card.Header>
								<Card.Body>
									<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} initValue={initVal} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Layout>
		);
	}
	return pageIsLoading;
}
