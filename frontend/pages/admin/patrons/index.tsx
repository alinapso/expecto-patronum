import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { AdminNav } from "../consts";
import Layout from "components/Layout";
import TableDatasource from "components/TableDatasource";
import Link from "next/link";
import SecureFile from "components/SecureImage";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Patrons() {
	const patrnDecorator = (value: any, id: any) => {
		return `${value.firstName} ${value.lastName}`;
	};

	const headers = [
		{ name: "First Name", mapKey: "firstName", sortable: true },
		{ name: "Last Name", mapKey: "lastName", sortable: true },
		{ name: "Email", mapKey: "email", sortable: true },
		{ name: "Address", mapKey: "Address", sortable: true },
	];
	return (
		<Layout items={AdminNav}>
			<Container>
				<Row>
					<Col sm="12">
						<Card>
							<Card.Body className="d-flex justify-content-between">
								<h4>Sponsered</h4>
								<div>
									<Link href="/admin/sponsored/add">
										<Button className="btn btn-primary btn-rounded btn-sm ms-1">Add</Button>
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				{/* <img src={img} alt="profile-img" className="profile-img img-fluid flex-fill  bd-highlight" /> */}
				<TableDatasource headers={headers} dataSourceUrl="/users/" keyValue="id" filterValue={{ role: "PATRON" }} />
			</Container>
		</Layout>
	);
}
