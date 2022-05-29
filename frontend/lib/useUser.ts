import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser({ redirectTo = "", isAdmin = false } = {}) {
	const { data, mutate, error } = useSWR({
		call: "Get",
		url: "/users/me",
	});

	useEffect(() => {
		if (!return_data) {
			return;
		}

		if (return_data.status == 200) {
			Router.push(redirectTo);
		} else if (return_data.status == 401) {
			Router.push("/login");
		}
	}, [data, redirectTo]);
	const loading = !data && !error;
	const loggedOut = !data || (data.status >= 400 && data.status < 500);
	const return_data = data && data.status == 200 ? data.data : undefined;
	return {
		loading,
		loggedOut,
		user: return_data,
		mutate,
	};
}
