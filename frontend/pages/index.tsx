import Layout, { SecurityLevel } from "components/Layout";
import Image from "next/image";

export default function Home() {
	return (
		<Layout securityLevel={SecurityLevel.ANONYMOUS}>
			<p>Hi this is the front page for expexto parunum, a non profit helping orphned childrein to find a better life</p>
			<p>if you would like to help a chiled in need, please register and sponsor one</p>
		</Layout>
	);
}
