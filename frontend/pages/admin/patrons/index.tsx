import { RemoteApiCall } from "lib/remoteAPI";
import useSWR, { useSWRConfig } from "swr";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

import { AdminNav } from "../consts";
import Layout from "components/Layout";
import TableEditable from "components/TableEditable";
import Link from "next/link";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Patrons() {
  const { data: patronsList, error } = useSWR(
    {
      method: "GET",
      url: "/users/patrons",
    },

    RemoteApiCall
  );
  console.log(patronsList);
  const { mutate } = useSWRConfig();
  const patrnDecorator = (value: any, id: any) => {
    return `${value.firstName} ${value.lastName}`;
  };

  const patrnSort = (key: string, data: any, newDirection: number): any => {
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
  const dateDecorator = (value: any, id: any) => {
    const date = new Date(value);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  const deactivateSponsered = async (id: any) => {
    await RemoteApiCall({
      method: "PATCH",
      url: `/Sponsored/deactivate/${id}`,
    });
    mutate(
      {
        method: "GET",
        url: "/sponsored",
      },

      RemoteApiCall
    );
  };
  const activateSponsered = async (id: any) => {
    await RemoteApiCall({
      method: "PATCH",
      url: `/Sponsored/activate/${id}`,
    });
    mutate(
      {
        method: "GET",
        url: "/sponsored",
      },

      RemoteApiCall
    );

    console.log(patronsList);
  };
  const removeDecorator = (value: any, id: any) => {
    return (
      <span className="table-remove">
        {value ? (
          <Button
            onClick={async () => await deactivateSponsered(id)}
            className="btn btn-danger btn-rounded btn-sm my-0"
          >
            Deactivate
          </Button>
        ) : (
          <Button
            onClick={async () => await activateSponsered(id)}
            className="btn btn-success btn-rounded btn-sm my-0"
          >
            Activate
          </Button>
        )}
      </span>
    );
  };
  const headers = [
    { name: "First Name", mapKey: "firstName", sortable: true },
    { name: "Last Name", mapKey: "lastName", sortable: true },
    { name: "Email", mapKey: "email", sortable: true },
    { name: "Address", mapKey: "Address", sortable: true },
  ];
  if (!patronsList)
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="auto">
            <ClipLoader color={"#000000"} loading={!patronsList} size={150} />
          </Col>
        </Row>
      </Container>
    );
  if (patronsList && patronsList.status != 200)
    return (
      <Layout items={AdminNav}>
        {patronsList.status ? "Somthing went wrong" : ""}
      </Layout>
    );
  console.log(patronsList);
  return (
    <Layout items={AdminNav}>
      <Container>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body className="d-flex justify-content-between">
                <h4>Sponsered</h4>
                <div>
                  <Link href="/admin/sponsored/add">
                    <Button className="btn btn-primary btn-rounded btn-sm ms-1">
                      Add
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <TableEditable
          headers={headers}
          data={patronsList.data}
          keyValue="id"
        />
      </Container>
    </Layout>
  );
}
