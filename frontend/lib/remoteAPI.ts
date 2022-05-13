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
    };
    const access_token = get_api_access_token();
    if (access_token != "")
      headers = { Authorization: `Bearer ${access_token}`, ...headers };

    const request: RequestInit = {
      method: props.method,
      headers,
    };

    if (props.body) request.body = JSON.stringify(props.body);
    const resualt = await fetch(`${ENDPOINT}${props.url}`, request);
    const json = await resualt.json();
    return { status: resualt.status, data: json };
  } catch (e) {
    return { error: e };
  }
}
