import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import { checkIfLoggedIn, get_api_access_token } from "lib/auth";
import Router from "next/router";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const { loading, loggedOut, user, mutate } = useUser();
  const [sponsoredParams, setSponsoredParams] = useState({});
  useEffect(() => {
    checkIfLoggedIn();
    if (user)
      setSponsoredParams({
        method: "GET",
        url: "/sponsored",
      });
  }, [user]);
  const { data: sponsoredList } = useSWR(
    [sponsoredParams],

    RemoteApiCall
  );
  if (loading)
    return (
      <Layout>
        <h1>Your profile</h1>
        Loading.....
      </Layout>
    );
  else if (loggedOut) {
    Router.push("/");
  }
  return (
    <Layout>
      <h1>Your profile</h1>

      {user && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre>{JSON.stringify(sponsoredList, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}
