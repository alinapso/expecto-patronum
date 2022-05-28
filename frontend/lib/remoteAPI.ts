import { get_api_access_token } from "./auth";
export interface ApiProps {
  method: string;
  url: string;
  access_token?: string;
  body?: any;
}
const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function RemoteApiCall(props: ApiProps) {
  console.log("RemoteApiCall ---------");
  console.log(props);
  try {
    let headers: any = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
      Accept: "*/*",
    };
    const access_token = get_api_access_token();
    if (access_token != "")
      headers = { Authorization: `Bearer ${access_token}`, ...headers };

    const request: RequestInit = {
      method: props.method,
      headers,
      body: props.body ? JSON.stringify(props.body) : undefined,
    };
    const result = await fetch(`${ENDPOINT}${props.url}`, request);

    const json = await result.json();
    console.log(json);
    return { status: result.status, data: json };
  } catch (e) {
    return { error: e };
  }
}
