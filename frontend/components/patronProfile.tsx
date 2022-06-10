import { User } from "expecto-patronum-common";
import { RemoteApiCall } from "lib/remoteAPI";
import React from "react";
import { Col, Card } from "react-bootstrap";
import useSWR from "swr";

type PatronProfileProps = {
	patronId: string;
};
type PatronProfileState = {
	patronData: User | undefined;
};
class PatronProfile extends React.Component<PatronProfileProps> {
	constructor(props: PatronProfileProps) {
		super(props);
	}
	state: PatronProfileState = {
		patronData: undefined,
	};
	componentDidMount() {
		this.getPatronData();
	}
	getPatronData = async () => {
		const patron = await RemoteApiCall({
			method: "GET",
			url: `/users/${this.props.patronId}`,
		});
		this.setState({ patronData: patron.data });
	};
	render() {
		return (
			<Col sm={12}>
				<Card>
					<Card.Body className="profile-page p-0">
						<div className="profile-header">
							<div className="position-relative text-center pt-3  ">{}</div>
						</div>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}
export default PatronProfile;
