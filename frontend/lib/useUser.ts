import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import { get_api_access_token, logout } from "./auth";

export default function useUser({ redirectTo = "" } = {}) {
  const { data, mutate, error } = useSWR({
    call: "Get",
    url: "/users/me",
  });
  console.log("mutating");
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  useEffect(() => {
    console.log("user changed");
    console.log(return_data);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!return_data) {
      return;
    }

    if (return_data.status == 200) {
      Router.push(redirectTo);
    }
  }, [data, redirectTo]);
  const return_data = data && data.status == 200 ? data.data : undefined;
  return {
    loading,
    loggedOut,
    user: return_data,
    mutate,
  };
}
