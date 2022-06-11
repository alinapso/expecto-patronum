import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Router from "next/router";

import { Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Button, Modal, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";

import Link from "next/link";
import img1 from "../assets/images/page-img/profile-bg1.jpg";

import loader from "../assets/images/page-img/page-load-loader.gif";

import DynamicForm from "../Form";
import { FormElementTypes } from "../Form/types/FormElementDto";
import { RemoteApiCall } from "lib/remoteAPI";
import { Sponsored, SponsoredEvents, UploadedFile } from "expecto-patronum-common";
import { partition } from "lodash";
import { RowImage, getFileType } from "../Form/components/DragAndDrop/common";
import moment from "moment";
import Expenses from "expecto-patronum-common/entities/expenses";
import { useUserState, UserStatus } from "context/user";
import { pageIsLoading } from "../layout/Layout";
import CreateEventMenuAndHeader from "./CreateEventMenuAndHeader";
import SponsoredEventView from "./SponsoredEventView";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const SponseredView = () => {
	const [showAdd, setShowAdd] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	const [refresh, setRefresh] = useState(false);
	const { user } = useUserState();
	const {
		data: result,
		error,
		mutate,
	} = useSWR(
		{
			method: "GET",
			url: `/sponsored/${id}`,
		},

		RemoteApiCall
	);
	const refreshView = () => {
		setRefresh(!refresh);
	};
	const sponsored: Sponsored = result?.data[0];
	useEffect(() => {
		if (showAdd == false) mutate();
	}, [showAdd]);
	useEffect(() => {
		mutate();
	}, [refresh]);

	const isAdmin = user && user.status == UserStatus.loggedIn && user.data.role === "ADMIN";

	if (!sponsored) return pageIsLoading;
	if (!(isAdmin || sponsored.patronId == user.data.id)) {
		Router.push("/dashboard/add");
		return pageIsLoading;
	}
	if (sponsored)
		return (
			<Container>
				<Row>
					<CreateEventMenuAndHeader sponsored={sponsored} show={showAdd} setShow={setShowAdd} isAdmin={isAdmin} />
					{sponsored.SponsoredEvents && sponsored.SponsoredEvents.length > 0 ? (
						sponsored.SponsoredEvents.map((se) => (
							<SponsoredEventView
								sponsored={sponsored}
								sponsoredEvent={se}
								refresh={refreshView}
								key={se.id}
								isAdmin={isAdmin}
							/>
						))
					) : (
						<Container className="text-center ">
							<Card className="py-5">
								<h3>No posts exist yet</h3>
							</Card>
						</Container>
					)}
				</Row>
			</Container>
		);
	return pageIsLoading;
};

export const TableRow = ({ data }: { data: Expenses }) => {
	const fileNameSnip = (name: string | undefined) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};
	return (
		<tr>
			<td></td>
			<td>{data.title}</td>
			<td>{data.sum}$</td>
			<td className="overflow-hidden pb-2">
				{data.UploadedFile ? (
					<div className="flex align-items-center list-user-action">
						<Link href={`${ENDPOINT}/${data.UploadedFile.id}.${data.UploadedFile.postfix}`}>
							<a>
								<RowImage fileType={getFileType(data.UploadedFile ? data.UploadedFile.postfix : "")} />
							</a>
						</Link>
					</div>
				) : (
					<></>
				)}
			</td>
		</tr>
	);
};

export default SponseredView;
