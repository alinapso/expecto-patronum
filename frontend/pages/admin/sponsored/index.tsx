import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import { AdminNav } from "../consts";
import SponseredView from "components/SponseredView";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
  const { loading, loggedOut, user, mutate } = useUser();
  const [sponsoredParams, setSponsoredParams] = useState({});
  if (loading) return <h1>loading</h1>;
  else if (loggedOut) {
    Router.push("/");
  }

  return (
    <Layout items={AdminNav}>
      <SponseredView />
    </Layout>
  );
}
