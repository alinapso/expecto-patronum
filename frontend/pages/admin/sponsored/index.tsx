import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import useSWR from "swr";
import Router from "next/router";
import Form from "components/Form";
import { AdminNav } from "../consts";
import user09 from "../../../assets/images/user/09.jpg";
import TableEditable from "components/TableEditable";
import { Button } from "react-bootstrap";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
  const { loading, loggedOut, user, mutate } = useUser();

  const { data: sponsoredList, error } = useSWR(
    {
      method: "GET",
      url: "/sponsored",
    },

    RemoteApiCall
  );

  if (!sponsoredList || loading) return <h1>loading</h1>;
  else if (loggedOut || sponsoredList.status === 401) {
    Router.push("/");
  }
  if (sponsoredList.status != 200) return <h1>Something went wrong</h1>;
  const patrnDecorator = (data: any) => {
    console.log(data);
    return `${data.firstName} ${data.lastName}`;
  };

  const patrnSort = (key: string, data: any, newDirection: number): any => {
    console.log(key, data, newDirection);
    return data.sort((a: any, b: any) => {
      if (a[key] && b[key]) {
        if (a[key].lastName < b[key].lastName) return newDirection * -1;
        else if (a[key].lastName > b[key].lastName) return newDirection;

        return a[key].firstName < b[key].firstName
          ? newDirection * -1
          : newDirection;
      }
      if (a[key]) return newDirection * -1;
      return 1;
    });
  };
  const dateDecorator = (data: any) => {
    console.log(data);
    const date = new Date(data);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  const deactivateSponsered = (id: any) => {
    console.log(id);
  };
  const removeDecorator = (id: any) => {
    return (
      <span className="table-remove">
        <Button
          onClick={() => deactivateSponsered(id)}
          className="btn btn-danger btn-rounded btn-sm my-0"
        >
          Deactivate
        </Button>
      </span>
    );
  };
  console.log(sponsoredList);
  if (error) return <div>failed to load</div>;
  if (!sponsoredList) return <div>loading...</div>;
  const headers = [
    { name: "First Name", mapKey: "first_name", sortable: true },
    { name: "Middle Name", mapKey: "middle_name", sortable: true },
    { name: "Last Name", mapKey: "last_name", sortable: true },
    { name: "Father Name", mapKey: "FatherName", sortable: true },
    {
      name: "Patron",
      mapKey: "patron",
      customDecorators: patrnDecorator,
      sortable: true,
      customSort: patrnSort,
    },
    {
      name: "Start Date",
      mapKey: "start_date",
      customDecorators: dateDecorator,
      sortable: true,
    },
    {
      name: "_remove",
      mapKey: "id",
      customDecorators: removeDecorator,
      sortable: false,
    },
  ];
  return (
    <Layout items={AdminNav}>
      <TableEditable
        TableTitle="Sponsored"
        headers={headers}
        data={sponsoredList.data}
      />
    </Layout>
  );
}
