import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser({ redirectTo = "" } = {}) {
  const { data, mutate, error } = useSWR({
    call: "Get",
    url: "/users/me",
  });
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  useEffect(() => {
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
