import { Button, Card, Col, Container, Row } from "react-bootstrap";

import Layout, { SecurityLevel } from "components/Layout";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
import SecureFile from "components/SecureImage";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Patrons() {
	const patrnDecorator = (value: any, id: any) => {
		return `${value.firstName} ${value.lastName}`;
	};
	const gotoProfile = (value: any, id: any) => {
		return (
			<span className="table-remove">
				<Link href={`/admin/patrons/${id}`}>
					<Button className="btn btn-primary btn-rounded btn-sm ms-1">Profile</Button>
				</Link>
			</span>
		);
	};
	const headers = [
		{ name: "First Name", mapKey: "firstName" },
		{ name: "Last Name", mapKey: "lastName" },
		{ name: "Email", mapKey: "email" },
		{ name: "Address", mapKey: "Address" },
		{
			name: "Active",
			mapKey: "isActive",
			customDecorators: (status: any, id: any) => {
				return status ? "Yes" : "No";
			},
		},
		{
			name: "_profile",
			mapKey: "isActive",
			customDecorators: gotoProfile,
		},
	];
	return (
		<Layout securityLevel={SecurityLevel.ADMIN}>
			<Container>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body>
								<h4>Patrons</h4>
								<TableDatasource
									headers={headers}
									dataSourceUrl="/users/"
									keyValue="id"
									filterValue={{ role: "PATRON" }}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				{/* <img src={img} alt="profile-img" className="profile-img img-fluid flex-fill  bd-highlight" /> */}
			</Container>
		</Layout>
	);
}
