import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import useSWR from "swr";
import { RemoteApiCall } from "lib/remoteAPI";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const { user } = useUser({
    redirectTo: "/login",
  });
  console.log(user);
  const [sponsoredList, setSponsoredList] = useState([]);
  useEffect(() => {
    if (user) {
      (async () => {
        RemoteApiCall("GET", "/sponsored", user.access_token).then(
          (resualts) => {
            console.log(resualts);
            setSponsoredList(resualts.data);
          }
        );
      })();
    }
  }, [user]);

  return (
    <Layout>
      <h1>Your profile</h1>
      <h2>
        This page uses{" "}
        <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </a>{" "}
        and the <a href="/api/user">/api/user</a> route (using{" "}
        <a href="https://github.com/vercel/swr">vercel/SWR</a>)
      </h2>
      {user && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre>{JSON.stringify(sponsoredList, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}
