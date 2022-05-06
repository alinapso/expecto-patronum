const ENDPOINT = process.env.ENDPOINT;

export async function RemoteApiCall(
  callType: string,
  url: string,
  jwt?: string,
  body?: any
) {
  try {
    const headers: HeadersInit = new Headers();

    headers.set("Content-Type", "application/json");
    if (jwt) headers.set("Authorization", `Bearer ${jwt}`);

    const request: RequestInit = { method: callType, headers };

    if (body) request.body = JSON.stringify(body);

    const resualt = await fetch(`${ENDPOINT}${url}`, request);
    const json = await resualt.json();
    return { status: resualt.status, data: json };
  } catch (e) {
    return { error: e };
  }
}
