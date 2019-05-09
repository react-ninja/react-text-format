import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

function Accordion({ title, input, output }) {
  return (
    <Row className="mb-2">
      <Col>
        <Card>
          <CardHeader className="accordion-header">{title}</CardHeader>
          <CardBody>
            <Row>
              <Col>{input()}</Col>
              <Col>{output()}</Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Accordion;
