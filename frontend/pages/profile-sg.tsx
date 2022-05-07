import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import { get_api_access_token } from "lib/auth";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const { user } = useUser();
  const [sponsoredParams, setSponsoredParams] = useState({});
  useEffect(() => {
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
