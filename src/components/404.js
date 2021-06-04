import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import Four04 from "./404.png";

const Four0Four = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image height={500} src={Four04} />
        </Col>
      </Row>

      <Row>
        <Col>
          <h1>sorry this page not found.</h1>

          <p>this link broken.</p>
          <Button as={Link} to="/" animated="fade">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Four0Four;
