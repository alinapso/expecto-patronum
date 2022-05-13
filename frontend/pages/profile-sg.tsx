import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import { checkIfLoggedIn, get_api_access_token } from "lib/auth";
import Router from "next/router";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import SponsoredTable from "../components/sponsered_table";
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
  console.log(sponsoredList);

  return (
    <Layout>
      <SponsoredTable tableData={sponsoredList ? sponsoredList.data : []} />
    </Layout>
  );
}
