import React, { useEffect, useState } from "react";
import Layout, { SecurityLevel } from "components/layout/Layout";

import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import Sidebar from "components/layout/sidebar";
import { AdminNav, PatronNav } from "components/consts";
import { UserStatus, useUserState } from "context/user";
import { Card, Col, Row, Image, Button, Container } from "react-bootstrap";
import Link from "next/link";
// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
import blog6 from "../../assets/images/blog/01.jpg";
import blog2 from "../../assets/images/blog/02.jpg";
import { Sponsored } from "expecto-patronum-common";
import CreateOrEditModel from "components/SponserDialog";
import { FormElementTypes } from "components/Form/types/FormElementDto";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function Dashboared() {
	const { user } = useUserState();
	const [sponsoredList, setSponsoredList] = useState([]);
	const [selected, setSelected] = useState<Sponsored>();
	const [showModel, setShowModel] = useState(false);
	useEffect(() => {
		const getData = async () => {
			if (user && user.status == UserStatus.loggedIn && showModel == false) {
				const res = await RemoteApiCall({
					method: "GET",
					url: "/sponsored/not",
				});
				setSponsoredList(res.data);
			}
		};
		getData();
	}, [user, showModel]);

	const calcAge = (birthDate: Date) => {
		const today = new Date(Date.now());
		birthDate = new Date(birthDate);
		const age = today.getFullYear() - birthDate.getFullYear();
		return age;
	};
	const handleSubmit = async (values: any, sponsored: Sponsored | undefined) => {
		if (sponsored == undefined) return;
		const { startDate, endDate } = calcDureation(values.duration, sponsored);
		const res = await RemoteApiCall({
			method: "PATCH",
			url: "/sponsored/adopt",
			body: {
				id: sponsored.id,
				sum: values.sum,
				startDate: startDate,
				endDate: endDate,
			},
		});
		setShowModel(false);
	};
	const calcDureation = (duration: string, sponsored: Sponsored) => {
		const today = new Date(Date.now());
		switch (duration) {
			case "one time":
				return { startDate: today, endDate: today };

			case "6 month":
				return { startDate: today, endDate: new Date(new Date(Date.now()).setMonth(today.getMonth() + 6)) };
			case "1 year":
				return { startDate: today, endDate: new Date(new Date(Date.now()).setFullYear(today.getFullYear() + 1)) };
			case "until graduation":
				return {
					startDate: today,
					endDate: new Date(new Date(Date.now()).setFullYear(today.getFullYear() + 18 - calcAge(sponsored.birthDate))),
				};
			default:
				return { startDate: today, endDate: today };
		}
	};

	const getFormTabs = (sponsored: Sponsored | undefined) => {
		if (sponsored == undefined) return [];
		const sponsOptions = ["one time", "6 month", "1 year"];
		if (calcAge(sponsored.birthDate) < 18) sponsOptions.push("until graduation");
		const formTabs = [
			{
				id: 1,
				name: "sponsorship duration",
				title: "How Long would you like to Sponsor ",
				icon: "ri-lock-unlock-line bg-soft-primary text-primary",
				active: true,
				elements: [
					{
						id: "duration",
						name: "duration",
						labelText: "Event Description",
						elemetType: FormElementTypes.DropDownList,
						required: true,
						placeholder: "duration",
						options: sponsOptions,
					},
					{
						id: "sum",
						name: "sum",
						labelText: "Total donatiom",
						elemetType: FormElementTypes.Text,
						required: true,
						placeholder: "Total donatiom",
					},
				],
			},
			{
				id: 2,
				name: "payment",
				title: "Insert payment details",
				icon: "ri-lock-unlock-line bg-soft-primary text-primary",
				active: true,
				elements: [
					{
						id: "visa card",
						name: "visa card",
						labelText: "visa card",
						elemetType: FormElementTypes.Text,
						required: true,
						placeholder: "visa card",
					},
					{
						id: "experationDate",
						name: "experationDate",
						labelText: "Experation Date",
						elemetType: FormElementTypes.Datepicker,
						required: true,
						placeholder: "Experation Date",
					},
					{
						id: "ccv",
						name: "ccv",
						labelText: "ccv",
						elemetType: FormElementTypes.Text,
						required: true,
						placeholder: "ccv",
					},
				],
			},
		];
		return formTabs;
	};
	const sponsoredCard = (sponsored: Sponsored) => {
		return (
			<Card className=" pt-2 d-inline-block w-100" key={sponsored.id}>
				<Card.Body className="align-items-center  overflow-auto ">
					<div>
						<Image
							src={`${ENDPOINT}/${sponsored.profilePic?.id}.${sponsored.profilePic?.postfix}`}
							className="img-fluid rounded w-100 "
							alt="blog-img"
						/>
					</div>

					<div className="blog-description p-2 ">
						<h5 className="mb-2">{`${sponsored.firstName} ${sponsored.lastName}`}</h5>
						<p>{sponsored.description}</p>{" "}
						<div className="d-flex flex-wrap align-items-center justify-content-between">
							<span>Age : {calcAge(sponsored.birthDate)}</span>
							<span>Country of origin : {sponsored.placeOfBirth}</span>
						</div>
						<div className="group-smile mt-4 d-flex flex-wrap align-items-center justify-content-center position-right-side">
							<div className="iq-media-group">
								<Button
									variant="success"
									className="rounded-pill mb-1"
									onClick={() => {
										setSelected(sponsored);
										setShowModel(true);
									}}>
									Sponsor
								</Button>{" "}
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	};
	const createTwoCoulumns = () => {
		let col1: any = [];
		let col2: any = [];
		sponsoredList.forEach((sponsored: Sponsored, index) => {
			if (index % 2 == 0) col1.push(sponsoredCard(sponsored));
			else col2.push(sponsoredCard(sponsored));
		});
		return (
			<Row>
				<Col md={6}>{col1}</Col>
				<Col md={6}>{col2}</Col>
			</Row>
		);
	};
	if (sponsoredList && sponsoredList.length > 0)
		return (
			<Layout securityLevel={SecurityLevel.USER}>
				<div>{createTwoCoulumns()}</div>
				<CreateOrEditModel
					show={showModel}
					setShow={setShowModel}
					sponsored={selected}
					formTabs={getFormTabs(selected)}
					handleSubmit={(values: any) => handleSubmit(values, selected)}
				/>
			</Layout>
		);
}
