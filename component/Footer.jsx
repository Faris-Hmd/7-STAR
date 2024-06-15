import React from "react";
import { Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <>
      <Container className="p-1 flex-r bg-liner">
        <Col xs={12}>
          <small>
            <center>©2023 by Faris Hamad. created with Next.js</center>
          </small>
        </Col>
      </Container>
    </>
  );
}

export default Footer;
