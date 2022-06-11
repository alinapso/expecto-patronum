import Layout, { SecurityLevel } from "components/layout/Layout";
import Image from "next/image";
import { Card } from "react-bootstrap";

export default function Home() {
	return (
		<Layout securityLevel={SecurityLevel.ANONYMOUS}>
			<Card>
				<Card.Body>
					<p>
						Hi this is the front page for expexto parunum, a non profit helping orphned childrein to find a better life
					</p>
					<p>if you would like to help a chiled in need, please register and sponsor one</p>
					<p>if you already have an acoount, you can sign in using the link in the navbar</p>
				</Card.Body>
			</Card>
		</Layout>
	);
}
