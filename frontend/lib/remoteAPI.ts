export async function RemoteApiCall(
  callType: string,
  url: string,
  access_token?: string,
  body?: any
) {
  const ENDPOINT = "http://localhost:3333";
  try {
    let headers: any = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    };

    console.log("starting fetch");
    if (access_token)
      headers = { Authorization: `Bearer ${access_token}`, ...headers };
    const request: RequestInit = {
      method: callType,
      headers,
    };

    if (body) request.body = JSON.stringify(body);
    console.log(`endpoint is ${ENDPOINT}${url} and body is ${request.body}`);
    console.log(request);
    const resualt = await fetch(`${ENDPOINT}${url}`, request);
    console.log(resualt);
    const json = await resualt.json();
    return { status: resualt.status, data: json };
  } catch (e) {
    return { error: e };
  }
}
