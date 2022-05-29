import axios from "axios";
import { get_api_access_token } from "./auth";
export interface ApiProps {
	method: string;
	url: string;
	access_token?: string;
	body?: any;
}
const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function RemoteApiCall(props: ApiProps) {
	try {
		let headers: any = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
			Accept: "*/*",
		};
		const access_token = get_api_access_token();
		if (access_token != "") headers = { Authorization: `Bearer ${access_token}`, ...headers };
		// axios.interceptors.request.use((request) => {
		// 	console.log("Starting Request", JSON.stringify(request, null, 2));
		// 	return request;
		// });
		let conf: any = {
			method: props.method,
			url: `${ENDPOINT}${props.url}`,
			headers: headers,
		};
		if (props.method.toUpperCase() === "GET") conf["params"] = props.body;
		else conf["data"] = props.body;
		const { data, status } = await axios(conf);
		return { status: status, data: data };
	} catch (e) {
		return { error: e };
	}
}
