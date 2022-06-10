import axios from "axios";
import { get_api_access_token } from "./auth";
export interface ApiProps {
	method: string;
	url: string;
	access_token?: string;
	body?: any;
	params?: any;
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
		if (access_token != null) headers = { Authorization: `Bearer ${access_token}`, ...headers };
		let conf: any = {
			method: props.method,
			url: `${ENDPOINT}${props.url}`,
			headers: headers,
		};

		if (props.params) conf["params"] = props.params;
		if (props.body) conf["data"] = props.body;

		const { data, status } = await axios(conf);
		return { status: status, data: data };
	} catch (e) {
		return { error: e, status: 500 };
	}
}
export async function ApiUploadFile(file: any, category: string) {
	try {
		const access_token = get_api_access_token();
		if (access_token == "") return { error: "you need to be logged in", status: 401 };
		let headers: any = {
			"Content-Type": "multipart/form-data",
			"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
			"Access-Control-Allow-Origin": "*",
			Accept: "*/*",
			Authorization: `Bearer ${access_token}`,
		};
		var formData = new FormData();
		formData.append("file", file);
		formData.append("category", category);
		let conf: any = {
			method: "post",
			url: `${ENDPOINT}/uploaded-file`,
			data: formData,
			headers: headers,
		};
		const { data, status } = await axios(conf);
		return { status: status, data: data };
	} catch (e) {
		return { error: e, status: 500 };
	}
}
