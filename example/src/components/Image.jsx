import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Image Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["Image"]} imageDecorator={decorator}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedURL, key) => {
  return (
    <div>
      <img
        src={decoratedURL}
        key={key}
        rel="noopener"
        height="100px"
        className="customImage"
        alt={decoratedURL}
      />
    </div>
  );
};

const decoratorDemo = `const decorator = (decoratedURL, key) => {
  return (
    <div>
      <img
        src={decoratedURL}
        key={key}
        rel="noopener"
        width="100"
        className="customImage"
        alt={decoratedURL}
      />
    </div>
  );
};`;

const input = () => {
  return (
    <InputFormat
      decoratorDemo={decoratorDemo}
      prefix={prefix}
      content={content}
      suffix={suffix}
    />
  );
};

const output = () => {
  return (
    <div className="output">
      <ReactTextFormat allowedFormats={["Image"]} imageDecorator={decorator}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
