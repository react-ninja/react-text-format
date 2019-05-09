import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Email Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["Email"]} emailDecorator={decorator}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedHref, decoratedText, key) => {
  return (
    <a href={decoratedHref} key={key} className="customEmail">
      {decoratedText}
    </a>
  );
};

const decoratorDemo = `const decorator = (decoratedHref, decoratedText, key) => {
  return (
    <a href={decoratedHref} key={key} className="customEmail">
      {decoratedText}
    </a>
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
      <ReactTextFormat allowedFormats={["Email"]} phoneDecorator={decorator}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
