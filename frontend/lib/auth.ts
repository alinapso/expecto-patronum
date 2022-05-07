import { RemoteApiCall } from "./remoteAPI";

// mock login and logout
export async function login(email: string, password: string) {
  console.log("logging IN");
  const res = await RemoteApiCall({
    method: "POST",
    url: "/auth/signin",
    body: {
      email,
      password,
    },
  });
  if (res.status == 200) {
    localStorage.setItem("api_access_token", res.data.access_token);
  }
}
export function logout() {
  console.log("loggingout");
  localStorage.removeItem("api_access_token");
}

export function get_api_access_token() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("api_access_token") as string;
  }
  return "";
}
