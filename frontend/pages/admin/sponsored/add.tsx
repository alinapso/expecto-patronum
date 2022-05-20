import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { AdminNav } from "../consts";
import useUser from "lib/useUser";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import Link from "next/link";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  Nav,
  TabContent,
  TabPane,
  Button,
  Image,
} from "react-bootstrap";

import image1 from "../../../assets/images/pages/img-success.png";

export const FormNavButton = ({
  Tabid,
  buttonIcon,
  text,
  href = "#",
  Active = false,
}: any) => {
  return (
    <Link id={Tabid} data-toggle="tab" href={href}>
      <a className={` ${Active ? "active done" : ""} btn nav-link`}>
        <i className={buttonIcon}></i>
        <span>{text}</span>
      </a>
    </Link>
  );
};

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Sponsored() {
  const { loading, loggedOut, user, mutate } = useUser();
  const [show, AccountShow] = useState("A");
  if (loading) return <h1>loading</h1>;
  else if (loggedOut) {
    Router.push("/");
  }
  console.log(show);
  return (
    <Layout items={AdminNav}>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Validate Wizard</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form method="post" id="registration">
                  <Nav
                    fill
                    variant="pills"
                    className="stepwizard-row"
                    id="nav-tab"
                    role="tablist"
                  >
                    <Link
                      className={` ${show === "A" ? "active" : ""}  btn`}
                      id="user-tab"
                      data-toggle="tab"
                      href="#user-detail"
                    >
                      <a className="btn nav-link">
                        <i className="ri-lock-unlock-line bg-soft-primary text-primary"></i>
                        <span>User Detail</span>
                      </a>
                    </Link>

                    <Link
                      className={` ${
                        show === "Personal" ? "active done" : ""
                      }  btn`}
                      id="bank-tab"
                      data-toggle="tab"
                      href="#bank-detail"
                    >
                      <a className="btn nav-link">
                        <i className="ri-camera-fill bg-soft-success text-success"></i>
                        <span>Bank Detail</span>
                      </a>
                    </Link>
                    <Link
                      className={` ${
                        show === "Image" ? "active done" : ""
                      } btn`}
                      id="cpnfirm-tab"
                      data-toggle="tab"
                      href="#cpnfirm-data"
                    >
                      <a className="btn nav-link">
                        <i className="ri-check-fill bg-soft-warning text-warning"></i>
                        <span>Confirm</span>
                      </a>
                    </Link>
                    <FormNavButton
                      id="user-tab"
                      buttonIcon="ri-lock-unlock-line bg-soft-primary text-primary"
                      text="User Detail"
                      Active={show === "A"}
                      Tabid="user-tab"
                      href="#user-detail"
                    ></FormNavButton>
                  </Nav>
                  <TabContent className="pt-4 pb-2" id="nav-tabContent">
                    <TabPane
                      className={` ${
                        show === "A" ? "d-block" : "d-none"
                      } fade row show`}
                      id="user-detail"
                    >
                      <Col sm="12">
                        <Col md="12" className="p-0">
                          <h3 className="mb-4">User Information:</h3>
                          <Row>
                            <Form.Group className=" col-md-6 form-group">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                placeholder="Enter First Name"
                              />
                            </Form.Group>
                            <Form.Group className=" col-md-6 form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                placeholder="Enter Last Name"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>User Name: *</Form.Label>
                              <Form.Control
                                type="text"
                                id="uname"
                                required={true}
                                name="uname"
                                placeholder="Enter User Name"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>Email Id: *</Form.Label>
                              <Form.Control
                                type="email"
                                id="emailid"
                                required={true}
                                name="emailid"
                                placeholder="Email ID"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>Password: *</Form.Label>
                              <Form.Control
                                type="password"
                                required={true}
                                id="pwd"
                                name="pwd"
                                placeholder="Password"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>Confirm Password: *</Form.Label>
                              <Form.Control
                                type="password"
                                id="cpwd"
                                required={true}
                                name="cpwd"
                                placeholder="Confirm Password"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>Contact Number: *</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                id="cno"
                                name="cno"
                                placeholder="Contact Number"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group ">
                              <Form.Label>
                                Alternate Contact Number: *
                              </Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                id="acno"
                                name="acno"
                                placeholder="Alternate Contact Number"
                              />
                            </Form.Group>
                            <Form.Group className="col-md-12 form-group mb-3 ">
                              <Form.Label>Address: *</Form.Label>
                              <Form.Control
                                as="textarea"
                                name="address"
                                id="address"
                                rows={5}
                                required={true}
                              ></Form.Control>
                            </Form.Group>
                          </Row>
                          <Button
                            className="btn-primary float-end"
                            data-enchanter="next"
                            onClick={() => AccountShow("Account")}
                          >
                            Next
                          </Button>
                        </Col>
                      </Col>
                    </TabPane>
                    <TabPane
                      className={` ${
                        show === "Account" ? "d-block" : "d-none"
                      } row show fade`}
                      id="document-detail"
                    >
                      <Col sm="12">
                        <Col md="12" className="p-0">
                          <h3 className="mb-4">Document Details:</h3>
                          <Row>
                            <Form.Group className="form-group col-md-6">
                              <Form.Label>Company Name: *</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                id="fname"
                                name="fname"
                                placeholder="Company Name"
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-md-6">
                              <Form.Label>Contact Number: *</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                id="ccno"
                                name="ccno"
                                placeholder="Contact Number"
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-md-6">
                              <Form.Label>Company Url: *</Form.Label>
                              <Form.Control
                                type="text"
                                required={true}
                                id="url"
                                name="url"
                                placeholder="Company Url."
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-md-6">
                              <Form.Label>Company Mail Id: *</Form.Label>
                              <Form.Control
                                type="email"
                                required={true}
                                id="cemail"
                                name="cemail"
                                placeholder="Company Mail Id."
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-md-12">
                              <Form.Label>Company Address: *</Form.Label>
                              <Form.Control
                                as="textarea"
                                name="cadd"
                                required={true}
                                id="cadd"
                                rows={5}
                              ></Form.Control>
                            </Form.Group>
                          </Row>
                          <Button
                            variant="secondary"
                            className="float-start"
                            data-enchanter="previous"
                            onClick={() => AccountShow("A")}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="primary"
                            className="float-end"
                            data-enchanter="next"
                            onClick={() => AccountShow("Personal")}
                          >
                            Next
                          </Button>
                        </Col>
                      </Col>
                    </TabPane>
                    <TabPane
                      className={` ${
                        show === "Personal" ? "d-block" : "d-none"
                      } row show fade`}
                      id="bank-detail"
                    >
                      <Col sm="12">
                        <Col md="12" className="p-0">
                          <h3 className="mb-4">Bank Detail:</h3>
                          <Row>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>Pan No: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="panno"
                                name="panno"
                                placeholder="Pan No."
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>Account No: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="accno"
                                name="accno"
                                placeholder="Account No."
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>Account Holder Name: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="accname"
                                name="accname"
                                placeholder="Account Holder Name."
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>IFSC Code: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="ifsc"
                                name="ifsc"
                                placeholder="IFSC Code."
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>Bank Name: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="bankname"
                                name="bankname"
                                placeholder="Bank Name."
                              />
                            </Form.Group>
                            <Form.Group className="col-md-6 form-group">
                              <Form.Label>Bank Branch Name: *</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                required={true}
                                id="branch"
                                name="branch"
                                placeholder="Bank Branch Name."
                              />
                            </Form.Group>
                          </Row>
                          <Button
                            variant="secondary"
                            className="float-start"
                            data-enchanter="previous"
                            onClick={() => AccountShow("Account")}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="primary"
                            className="float-end"
                            data-enchanter="next"
                            onClick={() => AccountShow("Image")}
                          >
                            Next
                          </Button>
                        </Col>
                      </Col>
                    </TabPane>
                    <TabPane
                      className={` ${
                        show === "Image" ? "d-block" : "d-none"
                      } row show fade`}
                      id="cpnfirm-data"
                    >
                      <Col sm="12">
                        <Col md="12" className="p-0">
                          <h3 className="mb-4 text-left">Finish:</h3>
                          <Row className="justify-content-center">
                            <div className="col-3">
                              <Image
                                src={image1.src}
                                className="img-fluid"
                                alt="img-success"
                              />
                            </div>
                          </Row>
                        </Col>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
