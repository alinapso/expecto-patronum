import { RemoteApiCall } from "lib/remoteAPI";
import React from "react";

interface AppContextInterface {
	user: any;
	loginUser: any;
	logoutUser: any;
}
const UserStateContext = React.createContext<AppContextInterface | undefined>(undefined);
export enum UserStatus {
	Init,
	loggedIn,
	LoggedOut,
	Loading,
}
export const UserProvider = ({ children }: any) => {
	const [user, setUser] = React.useState({
		data: undefined,
		status: UserStatus.Init,
	});

	const logoutUser = () => {
		setUser({ data: undefined, status: UserStatus.LoggedOut });
		localStorage.removeItem("api_access_token");
	};
	async function loginUser(email: string, password: string) {
		setUser({ data: undefined, status: UserStatus.Loading });
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
			setUser({ data: res.data, status: UserStatus.loggedIn });
		} else {
			setUser({ data: undefined, status: UserStatus.LoggedOut });
			throw new Error("Login faild");
		}
	}
	async function getUser() {
		if (typeof window === "undefined") {
			setUser({ data: undefined, status: UserStatus.Loading });
			return;
		}
		const api_access_token = localStorage.getItem("api_access_token") as string;
		if (!api_access_token || api_access_token == null || api_access_token == "") logoutUser();
		setUser({ ...user, status: UserStatus.Loading });
		const res = await RemoteApiCall({
			method: "GET",
			url: "/users/me",
		});

		if (res.status == 200) {
			setUser({
				data: res.data,
				status: UserStatus.loggedIn,
			});
		} else {
			logoutUser();
		}
	}
	if (user.status === UserStatus.Init) {
		getUser();
	}
	const state = {
		user,
		loginUser,
		logoutUser,
	};
	return <UserStateContext.Provider value={state}>{children}</UserStateContext.Provider>;
};

export function useUserState() {
	const state = React.useContext(UserStateContext);

	if (state === undefined) {
		throw new Error("useUserState must be used within a UserProvider");
	}

	return state;
}
