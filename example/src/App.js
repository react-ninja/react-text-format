import React, { Component, Fragment } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Accordion from "./components/Accordion";
import { config as basic } from "./components/Basic";
import { config as link } from "./components/Link";
import { config as email } from "./components/Email";
import { config as phone } from "./components/Phone";
import { config as image } from "./components/Image";
import { config as creditcard } from "./components/CreditCard";
import { config as term } from "./components/Term";

const examples = [basic, link, phone, email, image, creditcard, term];
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row className="text-light text-center mt-5">
            <Col>
              <h1 className="w-100">
                <a
                  href="https://www.npmjs.com/package/react-text-format"
                  target="_blank"
                  className="package-title"
                  rel="noopener noreferrer"
                >
                  React Text Format
                </a>
              </h1>
              <h4 className="font-italic font-weight-light">
                React Component to find and format links, emails, phone numbers,
                image's URL, credit cards and keywords to required format.
              </h4>
            </Col>
          </Row>
          <Row className="text-light text-center">
            <Col>
              <a
                href="https://www.npmjs.com/package/react-text-format"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <img
                  src="https://user-images.githubusercontent.com/1968160/57470661-cd87ac80-72a2-11e9-9ef0-b5f209b574d2.png"
                  alt="https://user-images.githubusercontent.com/1968160/57470661-cd87ac80-72a2-11e9-9ef0-b5f209b574d2.png"
                  height="50"
                />
              </a>
              <a
                href="https://www.npmjs.com/package/react-text-format"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://user-images.githubusercontent.com/1968160/57470662-cd87ac80-72a2-11e9-8ba4-2ee4ca1b0028.png"
                  alt="https://user-images.githubusercontent.com/1968160/57470662-cd87ac80-72a2-11e9-8ba4-2ee4ca1b0028.png"
                  height="50"
                />
              </a>
            </Col>
          </Row>

          {examples.map(({ title, description, input, output }) => (
            <Accordion
              title={title}
              description={description}
              input={input}
              output={output}
            />
          ))}
        </Container>
      </Fragment>
    );
  }
}
