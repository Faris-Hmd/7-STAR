import React, { useContext } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/authContext";

export default function PageLayout({
  children,
  title,
  role,
  loading,
  error,
  navComp,
  pageName,
}) {
  const { user } = useContext(AuthContext);

  if (loading) {
    return (
      <Container
        fluid
        className="h-100 p-0 d-flex justify-content-center align-items-center"
      >
        <Spinner />
      </Container>
    );
  }
  // if (user?.role === role || role === "ALL" || user?.role === "ADMIN") {
  return (
    <Container className="p-1">
      <Row className="bg-sec flex-r  shadow-sm border">
        <Col xs={5}>
          <div className="p-2 fs-4">{pageName}</div>
        </Col>
        <Col xs={7} className="flex-r">
          {navComp}
        </Col>
      </Row>
      <Row> {children}</Row>
    </Container>
  );
  // } else {
  //   return <h1>No access</h1>;
  // }
}
