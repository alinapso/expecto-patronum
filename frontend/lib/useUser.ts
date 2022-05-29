import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { RemoteApiCall } from "./remoteAPI";

export default function useUser({ redirectTo = "", isAdmin = false } = {}) {
	const { data, mutate, error } = useSWR(
		{
			method: "Get",
			url: "/users/me",
		},
		RemoteApiCall
	);

	useEffect(() => {
		console.log(return_data);
		if (!return_data) {
			return;
		}

		if (return_data.status == 200) {
			Router.push(redirectTo);
		} else if (return_data.status == 401) {
			Router.push("/login");
		}
	}, [data, redirectTo]);
	console.log(data, error);
	const loading = !data && !error;
	const loggedOut = !data || data.error || (data.status >= 400 && data.status < 500);
	const return_data = data && data.status == 200 ? data.data : undefined;
	return {
		loading,
		loggedOut,
		user: return_data,
		mutate,
	};
}
