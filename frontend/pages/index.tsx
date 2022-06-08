import Layout, { SecurityLevel } from "components/Layout";
import Image from "next/image";

export default function Home() {
	return <Layout securityLevel={SecurityLevel.ANONYMOUS}>Hi</Layout>;
}
